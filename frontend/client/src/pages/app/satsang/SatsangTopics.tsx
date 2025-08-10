import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Star } from 'lucide-react';

const topics = [
  {
    id: 1,
    title: 'Dealing with Stress',
    description: 'Ancient wisdom for modern stress management through Krishna\'s teachings',
    duration: '7 days',
    difficulty: 'Beginner',
    participants: 1247,
    rating: 4.8,
    scripture: 'Bhagavad Gita',
    emoji: '🌊'
  },
  {
    id: 2,
    title: 'Overcoming Fear',
    description: 'Find courage and inner strength through Hanuman\'s example',
    duration: '10 days',
    difficulty: 'Intermediate',
    participants: 892,
    rating: 4.9,
    scripture: 'Hanuman Chalisa',
    emoji: '💪'
  },
  {
    id: 3,
    title: 'Understanding Karma',
    description: 'Deep dive into the law of karma and righteous action',
    duration: '14 days',
    difficulty: 'Advanced',
    participants: 654,
    rating: 4.7,
    scripture: 'Upanishads',
    emoji: '⚖️'
  },
  {
    id: 4,
    title: 'Finding Purpose (Svadharma)',
    description: 'Discover your life\'s purpose through dharmic principles',
    duration: '21 days',
    difficulty: 'Intermediate',
    participants: 1056,
    rating: 4.8,
    scripture: 'Bhagavad Gita',
    emoji: '🎯'
  },
  {
    id: 5,
    title: 'Relationships & Dharma',
    description: 'Building meaningful relationships based on dharmic values',
    duration: '14 days',
    difficulty: 'Beginner',
    participants: 743,
    rating: 4.6,
    scripture: 'Ramayana',
    emoji: '💝'
  },
  {
    id: 6,
    title: 'Healing & Recovery',
    description: 'Spiritual practices for physical and emotional healing',
    duration: '30 days',
    difficulty: 'Beginner',
    participants: 2156,
    rating: 4.9,
    scripture: 'Ayurveda & Vedas',
    emoji: '🌿'
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const SatsangTopics: React.FC = () => {
  return (
    <div className="min-h-screen bg-sacred-cream">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📿</div>
          <h1 className="text-4xl font-bold text-sacred-maroon mb-4">Satsang Topics</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a spiritual topic to begin your 7-day journey of scripture study, 
            reflection, and practical application of ancient wisdom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {topics.map((topic) => (
            <Card key={topic.id} className="card-lotus hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl">{topic.emoji}</div>
                  <Badge className={getDifficultyColor(topic.difficulty)}>
                    {topic.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-sacred-maroon text-xl mb-2">
                  {topic.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {topic.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{topic.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users size={14} />
                    <span>{topic.participants.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span>{topic.rating}</span>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="font-semibold text-sacred-orange">Scripture: </span>
                  <span className="text-muted-foreground">{topic.scripture}</span>
                </div>

                <Button className="w-full btn-lotus" asChild>
                  <Link to="/app/satsang/daily">
                    Begin Journey
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="card-sacred">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-sacred-maroon mb-2">
              Custom Topic Request
            </h3>
            <p className="text-muted-foreground mb-4">
              Have a specific spiritual question or topic you'd like to explore? 
              Our AI can create a personalized program just for you.
            </p>
            <Button variant="outline" className="btn-lotus">
              Request Custom Topic
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};