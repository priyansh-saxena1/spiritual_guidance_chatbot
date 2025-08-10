from fastapi import APIRouter, HTTPException, status, Depends
import os
import json
import re
import logging
from typing import Dict, Any, Tuple
try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    logging.warning("Google GenerativeAI not available, falling back to sample responses")

from app.models import (
    ContentGenerateRequest, DailyContent, APIResponse, User,
    ProgramType, SpiritualPath, IshtaDevata, ChatRequest, ChatResponse
)
from app.auth import get_current_user
from app.redis_client import get_redis_client

# Initialize Gemini AI if available
if GEMINI_AVAILABLE and os.getenv("GOOGLE_GEMINI_API_KEY"):
    try:
        genai.configure(api_key=os.getenv("GOOGLE_GEMINI_API_KEY"))
        gemini_model = genai.GenerativeModel('gemini-pro')
    except Exception as e:
        GEMINI_AVAILABLE = False
        logging.error(f"Error initializing Gemini AI: {str(e)}")
else:
    logging.warning("Gemini API key not found, using sample responses")

ai_router = APIRouter()

def get_sample_content_by_type(
    program_type: ProgramType,
    spiritual_path: SpiritualPath,
    ishta_devata: IshtaDevata,
    day: int
) -> Dict[str, Any]:
    """Generate sample spiritual content based on the program type and user preferences"""
    
    deities = {
        IshtaDevata.KRISHNA: {
            "mantra": "ॐ नमो भगवते वासुदेवाय",
            "translation": "Om, I bow to Lord Krishna, son of Vasudeva",
            "scripture": "Bhagavad Gita"
        },
        IshtaDevata.SHIVA: {
            "mantra": "ॐ नमः शिवाय",
            "translation": "Om, I bow to Lord Shiva",
            "scripture": "Shiva Purana"
        },
        IshtaDevata.DEVI: {
            "mantra": "ॐ ह्रीं श्रीं क्लीं महालक्ष्म्यै नमः",
            "translation": "Om, I bow to the Great Divine Mother",
            "scripture": "Devi Mahatmya"
        },
        IshtaDevata.RAMA: {
            "mantra": "ॐ श्री राम जय राम जय जय राम",
            "translation": "Om, Victory to Lord Rama, Victory, Victory to Lord Rama",
            "scripture": "Ramayana"
        },
        IshtaDevata.GANESHA: {
            "mantra": "ॐ गं गणपतये नमः",
            "translation": "Om, I bow to Lord Ganesha",
            "scripture": "Ganapati Upanishad"
        },
        IshtaDevata.HANUMAN: {
            "mantra": "ॐ हनुमते नमः",
            "translation": "Om, I bow to Lord Hanuman",
            "scripture": "Hanuman Chalisa"
        }
    }
    
    deity_info = deities.get(ishta_devata, deities[IshtaDevata.KRISHNA])
    
    sample_content = {}
    
    # Add Satsang content if requested
    if program_type in [ProgramType.SATSANG, ProgramType.COMBINED]:
        sample_content["satsang"] = {
            "scripture": {
                "text": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।",
                "translation": "You have the right to perform your prescribed duties, but not to the fruits of your actions.",
                "source": f"{deity_info['scripture']} 2.47"
            },
            "explanation": f"This verse from {deity_info['scripture']} teaches us that we should perform our duties without attachment to results. When we focus solely on the outcome, we become anxious and lose peace of mind. Instead, by offering our actions to the Divine with devotion, we find inner freedom.",
            "practical_application": "Apply this teaching today by performing one task with complete attention and devotion, without worrying about success or failure.",
            "reflection_questions": [
                "In what areas of your life are you most attached to outcomes?",
                "How would your actions change if you focused only on the quality of your effort?"
            ]
        }
    
    # Add Japa content if requested
    if program_type in [ProgramType.JAPA, ProgramType.COMBINED]:
        sample_content["japa"] = {
            "mantra": deity_info["mantra"],
            "translation": deity_info["translation"],
            "pronunciation": deity_info["mantra"].replace("ॐ", "Om").replace("श्री", "Shri").replace("नमः", "Namaha"),
            "repetitions": 108,
            "duration": "15 minutes"
        }
    
    # Add Dhyana content if requested
    if program_type in [ProgramType.DHYANA, ProgramType.COMBINED]:
        sample_content["dhyana"] = {
            "technique": "Breath-centered meditation with divine awareness",
            "instructions": [
                "Sit comfortably with spine straight",
                "Close eyes and take three deep breaths",
                "Focus on natural breathing rhythm",
                "With each breath, silently repeat your chosen mantra",
                "If mind wanders, gently return to breath and mantra"
            ],
            "duration": "15 minutes",
            "focus_point": "Breath coordinated with mantra repetition"
        }
    
    return sample_content

def get_spiritual_prompt(request: ContentGenerateRequest) -> str:
    """Generate context-aware prompt for spiritual content"""
    
    base_prompt = f"""
    You are a knowledgeable Hindu spiritual teacher. Generate authentic spiritual content for a {request.program_type.value} practice program.

    Context:
    - Spiritual Path: {request.spiritual_path.value.title()} Yoga
    - Ishta Devata (Chosen Deity): {request.ishta_devata.value.title()}
    - Topic: {request.topic}
    - Day: {request.day} of the program
    
    Please generate content in the following JSON format:
    """
    
    if request.program_type == ProgramType.SATSANG or request.program_type == ProgramType.COMBINED:
        base_prompt += """
    {
        "satsang": {
            "scripture": {
                "text": "Sanskrit verse related to the topic",
                "translation": "English translation",
                "source": "Scripture name and verse number"
            },
            "explanation": "2-3 paragraph explanation connecting to daily life",
            "practical_application": "Specific daily practice guidance",
            "reflection_questions": ["Question 1", "Question 2"]
        }"""
    
    if request.program_type == ProgramType.JAPA or request.program_type == ProgramType.COMBINED:
        if request.program_type == ProgramType.COMBINED:
            base_prompt += ","
        base_prompt += """
        "japa": {
            "mantra": "Sanskrit mantra appropriate for the deity and topic",
            "translation": "English meaning",
            "pronunciation": "Phonetic pronunciation guide",
            "repetitions": 108,
            "duration": "15 minutes"
        }"""
    
    if request.program_type == ProgramType.DHYANA or request.program_type == ProgramType.COMBINED:
        if request.program_type in [ProgramType.JAPA, ProgramType.COMBINED]:
            base_prompt += ","
        base_prompt += """
        "dhyana": {
            "technique": "Meditation technique name",
            "instructions": ["Step 1", "Step 2", "Step 3"],
            "duration": "10-20 minutes",
            "focus_point": "What to focus on during meditation"
        }"""
    
    base_prompt += """
    }
    
    Guidelines:
    - Use authentic Sanskrit terms with proper translations
    - Include traditional Hindu spiritual concepts
    - Make content appropriate for modern practitioners
    - Ensure respectful and devotional tone
    - Connect content to the specified deity when relevant
    - Progress content appropriately for day {day}
    
    Return only the JSON object, no additional text.
    """.format(day=request.day)
    
    return base_prompt

@ai_router.post("/generate-content", response_model=APIResponse)
async def generate_spiritual_content(
    request: ContentGenerateRequest,
    current_user: User = Depends(get_current_user)
):
    try:
        # Check cache first
        redis_client = await get_redis_client()
        cache_key = f"content:{request.program_type}:{request.topic}:{request.day}:{request.ishta_devata}"
        
        if redis_client:
            cached_content = await redis_client.get(cache_key)
            if cached_content:
                content_data = json.loads(cached_content)
                return APIResponse(
                    success=True,
                    data=content_data,
                    message="Content retrieved from cache"
                )
        
        # Generate new content using Gemini if available
        content_data = None
        
        if GEMINI_AVAILABLE:
            try:
                prompt = get_spiritual_prompt(request)
                response = gemini_model.generate_content(prompt)
                
                content_text = response.text.strip()
                # Remove any markdown formatting if present
                if content_text.startswith("```json"):
                    content_text = content_text[7:-3]
                elif content_text.startswith("```"):
                    content_text = content_text[3:-3]
                
                content_data = json.loads(content_text)
                
                # Validate content structure based on program type
                daily_content = DailyContent(day=request.day, **content_data)
            except Exception as gemini_error:
                logging.error(f"Gemini AI error: {str(gemini_error)}")
                content_data = None
        
        # Fall back to sample content if Gemini failed or not available
        if not content_data:
            content_data = get_sample_content_by_type(
                request.program_type,
                request.spiritual_path,
                request.ishta_devata,
                request.day
            )
        
        # Cache the content for 24 hours
        if redis_client:
            await redis_client.setex(
                cache_key, 
                86400,  # 24 hours
                json.dumps(content_data)
            )
        
        return APIResponse(
            success=True,
            data=content_data,
            message="Spiritual content generated successfully"
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate content: {str(e)}"
        )

@ai_router.get("/sample-content/{program_type}", response_model=APIResponse)
async def get_sample_content(
    program_type: ProgramType,
    current_user: User = Depends(get_current_user)
):
    """Get sample content for demonstration purposes"""
    
    sample_content = {
        "satsang": {
            "scripture": {
                "text": "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
                "translation": "You have the right to perform your actions, but never to the fruits of action.",
                "source": "Bhagavad Gita 2.47"
            },
            "explanation": "This verse teaches us about karma yoga - the path of selfless action. When we act without attachment to results, we transform ordinary activities into spiritual practice. This principle helps us find peace in uncertainty and maintains our inner equilibrium regardless of external outcomes.",
            "practical_application": "Today, choose one routine activity (like cooking, walking, or working) and perform it with complete attention, offering the results to the Divine. Notice how this changes your experience of the task.",
            "reflection_questions": [
                "How does attachment to outcomes affect my peace of mind?",
                "What would change in my daily life if I truly practiced selfless action?"
            ]
        },
        "japa": {
            "mantra": "ॐ नमो भगवते वासुदेवाय",
            "translation": "Om, I bow to the Divine Lord Vasudeva (Krishna)",
            "pronunciation": "Om Na-mo Bha-ga-va-te Vaa-su-de-vaa-ya",
            "repetitions": 108,
            "duration": "15 minutes"
        },
        "dhyana": {
            "technique": "Breath-centered meditation with divine awareness",
            "instructions": [
                "Sit comfortably with spine straight",
                "Close eyes and take three deep breaths",
                "Focus on natural breathing rhythm",
                "With each breath, silently repeat your chosen mantra",
                "If mind wanders, gently return to breath and mantra"
            ],
            "duration": "15 minutes",
            "focus_point": "Breath coordinated with mantra repetition"
        }
    }
    
    # Filter content based on program type
    if program_type == ProgramType.SATSANG:
        filtered_content = {"satsang": sample_content["satsang"]}
    elif program_type == ProgramType.JAPA:
        filtered_content = {"japa": sample_content["japa"]}
    elif program_type == ProgramType.DHYANA:
        filtered_content = {"dhyana": sample_content["dhyana"]}
    else:  # COMBINED
        filtered_content = sample_content
    
    return APIResponse(
        success=True,
        data=filtered_content,
        message="Sample content retrieved successfully"
    )

# AI Safety Functions
def contains_harmful_content(text: str) -> Tuple[bool, str]:
    """Check for harmful or inappropriate content"""
    harmful_patterns = [
        r'(?i)(backend|database|api|server|code|password|token|key|secret)',
        r'(?i)(gemini|model|training|data|prompt|system)',
        r'(?i)(hack|exploit|vulnerability|injection|attack)',
        r'(?i)(personal|private|confidential|sensitive)',
        r'(?i)(violent|harmful|dangerous|illegal|suicide)',
        r'(?i)(sexual|explicit|inappropriate|offensive)',
        r'(?i)(political|controversial|discriminatory)'
    ]
    
    for pattern in harmful_patterns:
        match = re.search(pattern, text)
        if match:
            matched_term = match.group(0)
            category = ""
            
            if re.search(r'(?i)(backend|database|api|server|code)', matched_term):
                category = "technical information"
            elif re.search(r'(?i)(password|token|key|secret)', matched_term):
                category = "sensitive data"
            elif re.search(r'(?i)(gemini|model|training|data|prompt|system)', matched_term):
                category = "AI system information"
            elif re.search(r'(?i)(hack|exploit|vulnerability|injection|attack)', matched_term):
                category = "security-related content"
            elif re.search(r'(?i)(violent|harmful|dangerous|illegal|suicide)', matched_term):
                category = "potentially harmful content"
            elif re.search(r'(?i)(sexual|explicit|inappropriate|offensive)', matched_term):
                category = "inappropriate content"
            elif re.search(r'(?i)(political|controversial|discriminatory)', matched_term):
                category = "controversial topics"
            
            warning = f"Your message contains {category} that cannot be processed for safety reasons. Please focus on spiritual topics only."
            return True, warning
    
    return False, ""

def is_spiritual_context(text: str) -> bool:
    """Check if the message is related to spiritual topics"""
    spiritual_keywords = [
        'spiritual', 'dharma', 'karma', 'yoga', 'meditation', 'mantra', 'prayer',
        'devotion', 'bhakti', 'jnana', 'raja', 'krishna', 'shiva', 'rama', 'devi',
        'ganesha', 'hanuman', 'scripture', 'vedas', 'gita', 'upanishad', 'temple',
        'guru', 'ashram', 'satsang', 'japa', 'dhyana', 'moksha', 'enlightenment',
        'consciousness', 'divine', 'sacred', 'holy', 'blessing', 'peace', 'love',
        'compassion', 'wisdom', 'truth', 'surrender', 'faith', 'devotee', 'hindu',
        'hinduism', 'vedanta', 'advaita', 'dvaita', 'tantra', 'puja', 'ritual',
        'philosophy', 'soul', 'atman', 'brahman', 'self', 'practice', 'mindfulness'
    ]
    
    # Check for questions about common spiritual topics
    spiritual_question_patterns = [
        r'(?i)how (to|do I|can I) (meditate|pray|chant|worship)',
        r'(?i)what (is|are) (the meaning|the purpose|dharma|karma|yoga)',
        r'(?i)can you (explain|tell me about) (mantra|scripture|deity|practice)',
        r'(?i)(recommended|suggest) (spiritual|practice|meditation|mantra)'
    ]
    
    text_lower = text.lower()
    
    # Check for spiritual keywords
    if any(keyword in text_lower for keyword in spiritual_keywords):
        return True
    
    # Check for spiritual question patterns
    for pattern in spiritual_question_patterns:
        if re.search(pattern, text):
            return True
    
    # If message is very short, give it the benefit of the doubt
    if len(text.split()) < 5:
        return True
    
    return False

def filter_ai_response(response: str) -> str:
    """Filter AI response to ensure it stays spiritual and appropriate"""
    # Remove any technical references that might have slipped through
    technical_terms = [
        'backend', 'database', 'API', 'server', 'code', 'model', 'training',
        'system', 'password', 'token', 'key', 'secret', 'hack', 'exploit'
    ]
    
    filtered_response = response
    for term in technical_terms:
        filtered_response = re.sub(rf'\b{term}\b', '[filtered]', filtered_response, flags=re.IGNORECASE)
    
    # If too much is filtered, restore original but add disclaimer
    if filtered_response.count('[filtered]') > 5:
        return "I should focus on spiritual guidance only. " + response
    
    return filtered_response

@ai_router.post("/chat", response_model=ChatResponse)
async def spiritual_chat(
    request: ChatRequest,
    current_user: User = Depends(get_current_user)
):
    """AI-powered spiritual chat with safety filtering"""
    try:
        # Check for harmful content
        is_harmful, warning = contains_harmful_content(request.message)
        if is_harmful:
            return ChatResponse(
                response="I can only help with spiritual topics. Please ask about meditation, prayers, scriptures, or spiritual practices.",
                filtered=True,
                warning=warning
            )
        
        # Check if message is spiritual context
        if not is_spiritual_context(request.message):
            return ChatResponse(
                response="I'm here to help with your spiritual journey. Please ask about Hindu philosophy, meditation practices, mantras, or spiritual guidance.",
                filtered=True,
                warning="Please keep our conversation focused on spiritual topics."
            )
        
        # Create safe spiritual prompt
        safe_prompt = f"""
        You are a wise Hindu spiritual teacher. A devotee asks: "{request.message}"
        
        Respond with:
        - Authentic spiritual guidance based on Hindu traditions
        - References to scriptures when appropriate
        - Practical advice for spiritual growth
        - Compassionate and devotional tone
        
        Keep your response focused on spiritual matters only. Do not discuss:
        - Technical topics, programming, or systems
        - Political or controversial subjects  
        - Personal information or private matters
        - Non-spiritual topics
        
        Limit response to 200 words maximum.
        """
        
        # Try to use Gemini model if available
        spiritual_response = ""
        if GEMINI_AVAILABLE:
            try:
                response = gemini_model.generate_content(safe_prompt)
                spiritual_response = response.text.strip()
            except Exception as gemini_error:
                logging.error(f"Gemini chat error: {str(gemini_error)}")
                spiritual_response = ""
        
        # Fall back to sample response if Gemini failed or not available
        if not spiritual_response:
            spiritual_response = get_sample_spiritual_response(request.message)
        
        # Filter the response
        filtered_response = filter_ai_response(spiritual_response)
        
        return ChatResponse(
            response=filtered_response,
            filtered=False,
            warning=None
        )
        
    except Exception as e:
        logging.error(f"Chat error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Unable to process your spiritual inquiry at this time"
        )

def get_sample_spiritual_response(message: str) -> str:
    """Generate contextual spiritual response based on message keywords"""
    message_lower = message.lower()
    
    # Meditation related questions
    if any(word in message_lower for word in ['meditation', 'dhyana', 'concentrate', 'focus', 'mind']):
        return """Meditation is the path to inner peace and divine connection. Begin with simple breath awareness - sit quietly, focus on your natural breathing, and when thoughts arise, gently return to the breath. Lord Krishna teaches in the Gita (6.35): "Undoubtedly the mind is restless and difficult to control, but by practice and detachment, it can be restrained." Start with just 5-10 minutes daily and gradually increase. Remember that consistency is more important than duration. Before each session, set a clear intention, and after meditating, observe the increased clarity and peace in your mind."""
    
    # Mantra and chanting questions
    elif any(word in message_lower for word in ['mantra', 'japa', 'chanting', 'repeat', 'sound']):
        return """Mantra repetition (japa) purifies the mind and brings divine grace. Choose a mantra that resonates with your heart - Om Namah Shivaya, Hare Krishna, or Om Gam Ganapataye Namah are powerful choices. The sacred sound vibrations cleanse subtle impressions and lead to self-realization. Traditionally, use a mala of 108 beads, chanting with devotion and concentration. The Padma Purana declares, "The names of God are as powerful as God Himself." You may practice japa silently in the mind (manasik), whispered (upamshu), or spoken aloud (vaikhari), with each method bringing unique benefits to your consciousness."""
    
    # Devotion and bhakti yoga questions
    elif any(word in message_lower for word in ['devotion', 'bhakti', 'love', 'heart', 'surrender', 'krishna', 'god']):
        return """Bhakti is the sweetest path to the Divine. Cultivate love and surrender in your heart through prayer, singing devotional songs (kirtan), and seeing the Divine in all beings. The Bhagavata Purana teaches that pure devotion melts the heart and brings tears of joy. Offer your daily actions as service (seva) to your chosen deity, practice gratitude, and maintain constant remembrance. Lord Chaitanya taught that in this age, chanting the divine names with sincerity is the most direct path to spiritual awakening. Begin by setting up a small altar in your home and spending a few minutes each day in heartfelt prayer."""
    
    # Knowledge and wisdom questions
    elif any(word in message_lower for word in ['knowledge', 'jnana', 'wisdom', 'truth', 'understanding', 'vedanta']):
        return """Jnana yoga, the path of spiritual knowledge, leads to liberation through discernment between the real and unreal. The Upanishads teach "Tat Tvam Asi" (That Thou Art), revealing your true identity with the Absolute. Begin by studying foundational texts like the Bhagavad Gita or Upanishads with a good translation and commentary. Practice self-inquiry (vichara) daily by asking "Who am I?" and observing your thoughts with detachment. Regular contemplation on teachings helps transcend the limited ego-self. As Adi Shankaracharya taught, knowledge is not just intellectual understanding but direct realization of your eternal nature beyond body and mind."""
    
    # Questions about purpose or dharma
    elif any(word in message_lower for word in ['purpose', 'dharma', 'duty', 'life', 'path', 'meaning']):
        return """Your dharma (righteous path) is unique to you and unfolds through sincere spiritual practice. The Bhagavad Gita (3.35) teaches: "Better is one's own dharma imperfectly performed than the dharma of another done perfectly." Reflect on your natural talents, what brings you joy, and how you can serve others. Your dharma lies at the intersection of these elements. Each morning, set an intention to live in alignment with eternal principles of truth, compassion, and service. Through regular meditation and self-study, your specific purpose will reveal itself organically. Remember that dharma brings inner peace and contributes to universal harmony."""
    
    # General spiritual guidance
    else:
        return """On the spiritual path, the most important practice is sincere seeking with a pure heart. Create a balanced sadhana (spiritual practice) including meditation, study of sacred texts, selfless service, and devotional practices. The four yogas—Karma (action), Bhakti (devotion), Raja (meditation), and Jnana (knowledge)—offer complementary approaches to self-realization. Start with just 15-30 minutes daily of concentrated practice. Find a genuine teacher (guru) when ready, join spiritual community (satsang), and remember that the Divine dwells within you. As the Chandogya Upanishad teaches: "That which is the finest essence—this whole world has that as its soul. That is Reality. That is the Self. That thou art." Your sincere effort will surely bear fruit."""
