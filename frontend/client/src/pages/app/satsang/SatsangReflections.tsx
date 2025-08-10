import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Heart, Lightbulb, PenTool } from 'lucide-react';

const reflections = [
  {
    date: '2024-01-05',
    day: 3,
    topic: 'Right to Action',
    verse: 'Bhagavad Gita 2.47',
    reflection: 'Today I realized how much anxiety I create by constantly worrying about outcomes at work. This verse reminds me to focus on doing my best and trusting the process.',
    insights: ['Focus on effort, not results', 'Anxiety comes from attachment'],
    mood: 'Peaceful'
  },
  {
    date: '2024-01-04',
    day: 2,
    topic: 'Self-Knowledge',
    verse: 'Bhagavad Gita 2.20',
    reflection: 'The teaching about the eternal soul separate from the body was profound. It helps me understand that my worth isnt tied to my physical appearance or temporary circumstances.',
    insights: ['I am more than my body', 'True self is eternal'],
    mood: 'Inspired'
  },
  {
    date: '2024-01-03',
    day: 1,
    topic: 'Duty and Dharma',
    verse: 'Bhagavad Gita 2.31',
    reflection: 'Understanding my dharma as a parent and professional. Sometimes these roles conflict, but the key is to approach both with righteousness and love.',
    insights: ['Dharma guides all actions', 'Balance is key'],
    mood: 'Contemplative'
  }
];

const moodEmojis: { [key: string]: string } = {
  'Peaceful': '🕊️',
  'Inspired': '✨',
  'Contemplative': '🤔',
  'Joyful': '😊',
  'Grateful': '🙏'
};

export const SatsangReflections: React.FC = () => {
  const [newReflection, setNewReflection] = useState('');
  const [selectedMood, setSelectedMood] = useState('');

  return (
    <div className="min-h-screen bg-sacred-cream">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-4xl font-bold text-sacred-maroon mb-4">Reflection Journal</h1>
          <p className="text-lg text-muted-foreground">
            Your personal space for insights, thoughts, and spiritual growth
          </p>
        </div>

        {/* New Reflection Entry */}
        <Card className="card-sacred mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-sacred-maroon">
              <PenTool size={20} />
              <span>New Reflection</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold text-sacred-orange mb-2">Today's Topic</p>
                <p className="text-muted-foreground">Right to Action, Not Results</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-sacred-orange mb-2">Scripture</p>
                <p className="text-muted-foreground">Bhagavad Gita 2.47</p>
              </div>
            </div>
            
            <Textarea
              placeholder="Share your thoughts, insights, or how today's teaching relates to your life..."
              value={newReflection}
              onChange={(e) => setNewReflection(e.target.value)}
              className="min-h-[120px]"
            />
            
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm font-semibold text-sacred-orange mb-2">Mood</p>
                <div className="flex space-x-2">
                  {Object.entries(moodEmojis).map(([mood, emoji]) => (
                    <Button
                      key={mood}
                      variant={selectedMood === mood ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMood(mood)}
                      className="h-auto p-2"
                    >
                      <span className="mr-1">{emoji}</span>
                      <span className="text-xs">{mood}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <Button className="btn-lotus">
              Save Reflection
            </Button>
          </CardContent>
        </Card>

        {/* Past Reflections */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-sacred-maroon">Past Reflections</h2>
          
          {reflections.map((reflection, index) => (
            <Card key={index} className="card-lotus">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-sacred-orange" />
                      <span className="text-sm text-muted-foreground">
                        {new Date(reflection.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <Badge className="bg-gradient-lotus text-sacred-maroon">
                      Day {reflection.day}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{moodEmojis[reflection.mood]}</span>
                    <span className="text-sm text-muted-foreground">{reflection.mood}</span>
                  </div>
                </div>
                <CardTitle className="text-sacred-maroon">{reflection.topic}</CardTitle>
                <p className="text-sm text-sacred-orange">{reflection.verse}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {reflection.reflection}
                </p>
                
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Lightbulb size={16} className="text-sacred-orange" />
                    <span className="font-semibold text-sacred-orange">Key Insights</span>
                  </div>
                  <ul className="space-y-1">
                    {reflection.insights.map((insight, insightIndex) => (
                      <li key={insightIndex} className="flex items-start space-x-2">
                        <span className="text-sacred-orange mt-1">•</span>
                        <span className="text-muted-foreground text-sm">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};