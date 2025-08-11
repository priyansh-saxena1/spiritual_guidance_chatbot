import { useState } from 'react';
import { Link } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Sparkles, Brain, Flower2, Music, MessageCircle, Timer, Flame } from 'lucide-react';

const Index = () => {
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);

  const spiritualPractices = [
    {
      id: 'satsang',
      title: 'Satsang',
      subtitle: 'Divine Teachings',
      description: 'Sacred scriptures, divine wisdom, and spiritual guidance for your journey',
      icon: BookOpen,
      color: 'from-primary to-secondary'
    },
    {
      id: 'japa',
      title: 'Japa',
      subtitle: 'Sacred Mantras',
      description: 'Mantra meditation with counter, pronunciation guides, and divine vibrations',
      icon: Sparkles,
      color: 'from-secondary to-accent'
    },
    {
      id: 'dhyana',
      title: 'Dhyana',
      subtitle: 'Meditation',
      description: 'Guided meditation with breathing techniques and mindfulness practices',
      icon: Brain,
      color: 'from-accent to-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle lotus-bg">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          {/* Floating Sacred Symbol */}
          <div className="mb-8 animate-float">
            <div className="flex items-center justify-center w-24 h-24 bg-gradient-lotus rounded-full mx-auto shadow-glow">
              <Flower2 size={48} className="text-sacred-maroon" />
            </div>
          </div>
          
          <h1 className="heading-sacred text-6xl md:text-7xl mb-6">
            DSCPL
          </h1>
          <h2 className="font-devanagari text-2xl md:text-3xl text-secondary mb-4">
            Hindu Spiritual Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Your personal companion for daily spiritual practices. Experience the divine through 
            Satsang, Japa, and Dhyana with personalized guidance.
          </p>
        </div>

        {/* What do you need today? */}
        <div className="text-center mb-12">
          <h3 className="heading-sacred text-3xl mb-2">What do you need today?</h3>
          <p className="text-muted-foreground">Choose your spiritual practice</p>
        </div>

        {/* Practice Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {spiritualPractices.map((practice, index) => (
            <Card 
              key={practice.id}
              className={`card-lotus group cursor-pointer transition-all duration-sacred ${
                selectedPractice === practice.id ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
              onClick={() => setSelectedPractice(practice.id)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-lotus rounded-full mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <practice.icon size={32} className="text-sacred-maroon" />
                </div>
                <h3 className="heading-sacred text-2xl mb-2">{practice.title}</h3>
                <p className="text-primary font-medium mb-4">{practice.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {practice.description}
                </p>
              </div>
              
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${practice.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
            </Card>
          ))}
        </div>

        {/* Authentication CTAs */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <Link to="/auth/signup">
              <Button 
                variant="lotus"
                size="lg"
                className="text-xl px-12 py-6 rounded-2xl w-full md:w-auto"
              >
                Begin Your Spiritual Journey
              </Button>
            </Link>
            <div className="text-center">
              <Link to="/auth/login">
                <Button 
                  variant="sacred" 
                  className="px-8 py-3"
                >
                  Continue Practice (Login)
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Quick Access Links */}
          <div className="pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Quick Access</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auth/login" className="text-primary hover:text-primary/80 text-sm flex items-center gap-2">
                <Flower2 size={16} /> Daily Satsang
              </Link>
              <Link to="/auth/login" className="text-primary hover:text-primary/80 text-sm flex items-center gap-2">
                <Music size={16} /> Mantra Japa
              </Link>
              <Link to="/auth/login" className="text-primary hover:text-primary/80 text-sm flex items-center gap-2">
                <Timer size={16} /> Meditation Timer
              </Link>
              <Link to="/auth/login" className="text-primary hover:text-primary/80 text-sm flex items-center gap-2">
                <MessageCircle size={16} /> Spiritual Chat
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="fixed top-20 left-10 animate-float opacity-20 text-primary" style={{ animationDelay: '1s' }}>
          <Flower2 size={24} />
        </div>
        <div className="fixed top-40 right-16 animate-float opacity-20 text-secondary" style={{ animationDelay: '2s' }}>
          <Sparkles size={20} />
        </div>
        <div className="fixed bottom-32 left-20 animate-float opacity-20 text-accent" style={{ animationDelay: '3s' }}>
          <Flame size={24} />
        </div>
      </div>

      {/* Daily Practice Preview */}
      {selectedPractice && (
        <div className="bg-gradient-dawn py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="heading-sacred text-4xl text-white mb-4">
                  Today's {spiritualPractices.find(p => p.id === selectedPractice)?.title}
                </h3>
                <p className="text-white/90 text-lg">
                  Experience divine guidance tailored for your spiritual journey
                </p>
              </div>

              {selectedPractice === 'satsang' && (
                <Card className="card-sacred backdrop-blur-lg bg-white/90">
                  <div className="text-center space-y-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sacred-maroon/10 mx-auto">
                      <BookOpen className="w-6 h-6 text-sacred-maroon" />
                    </div>
                    <div className="sanskrit-text">
                      कर्मण्येवाधिकारस्ते मा फलेषु कदाचन
                    </div>
                    <div className="transliteration">
                      karmaṇy-evādhikāras te mā phaleṣu kadācana
                    </div>
                    <div className="text-lg text-foreground font-medium border-t border-border/50 pt-6">
                      "You have the right to perform your duties, but not to the fruits of action."
                    </div>
                    <div className="text-sm text-muted-foreground">
                      — Bhagavad Gita 2.47
                    </div>
                    <Link to="/auth/signup">
                      <Button variant="temple" className="mt-4">
                        Start Your Journey
                      </Button>
                    </Link>
                  </div>
                </Card>
              )}

              {selectedPractice === 'japa' && (
                <Card className="card-sacred backdrop-blur-lg bg-white/90">
                  <div className="text-center space-y-6">
                    <div className="relative w-48 h-48 mx-auto">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-sacred-maroon/10 mx-auto mb-2">
                            <Sparkles className="w-5 h-5 text-sacred-maroon" />
                          </div>
                          <div className="text-2xl font-bold text-primary">108</div>
                          <div className="text-sm text-muted-foreground">Repetitions</div>
                        </div>
                      </div>
                    </div>
                    <div className="sanskrit-text">
                      ॐ नमः शिवाय
                    </div>
                    <div className="transliteration">
                      Om Namah Shivaya
                    </div>
                    <Link to="/auth/signup">
                      <Button variant="temple" className="mt-4">
                        Start Your Journey
                      </Button>
                    </Link>
                  </div>
                </Card>
              )}

              {selectedPractice === 'dhyana' && (
                <Card className="card-sacred backdrop-blur-lg bg-white/90">
                  <div className="text-center space-y-8">
                    <div className="relative w-64 h-64 mx-auto">
                      <div className="absolute inset-0 rounded-full bg-gradient-sacred-fire opacity-30 animate-breathe"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🪷</div>
                          <div className="text-lg font-medium text-sacred-maroon">Breathe mindfully</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-lg text-foreground">
                      15-minute guided meditation session
                    </div>
                    <Link to="/auth/signup">
                      <Button variant="temple">
                        Start Your Journey
                      </Button>
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;