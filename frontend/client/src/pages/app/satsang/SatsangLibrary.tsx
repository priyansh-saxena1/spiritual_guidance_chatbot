import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Users } from 'lucide-react';

const scriptures = [
  {
    title: 'Bhagavad Gita',
    description: 'The timeless dialogue between Krishna and Arjuna about dharma, duty, and devotion',
    chapters: 18,
    verses: 700,
    difficulty: 'Intermediate',
    topics: ['Karma Yoga', 'Bhakti Yoga', 'Jnana Yoga'],
    emoji: '📖'
  },
  {
    title: 'Upanishads',
    description: 'Philosophical texts exploring the nature of reality and the self',
    chapters: 108,
    verses: 1200,
    difficulty: 'Advanced',
    topics: ['Self-realization', 'Meditation', 'Truth'],
    emoji: '🕉️'
  },
  {
    title: 'Ramayana',
    description: 'The epic story of Rama, dharma, devotion, and righteous living',
    chapters: 7,
    verses: 24000,
    difficulty: 'Beginner',
    topics: ['Dharma', 'Devotion', 'Relationships'],
    emoji: '🏹'
  },
  {
    title: 'Hanuman Chalisa',
    description: 'Forty verses praising Hanuman, the embodiment of devotion and strength',
    chapters: 1,
    verses: 40,
    difficulty: 'Beginner',
    topics: ['Devotion', 'Courage', 'Service'],
    emoji: '💪'
  }
];

export const SatsangLibrary: React.FC = () => {
  return (
    <div className="min-h-screen bg-sacred-cream">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold text-sacred-maroon mb-4">Scripture Library</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the sacred texts that form the foundation of Hindu spiritual wisdom
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {scriptures.map((scripture, index) => (
            <Card key={index} className="card-lotus hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-4xl">{scripture.emoji}</div>
                  <Badge variant="outline" className="text-sacred-orange">
                    {scripture.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-sacred-maroon text-xl">
                  {scripture.title}
                </CardTitle>
                <p className="text-muted-foreground">
                  {scripture.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <BookOpen size={14} />
                    <span>{scripture.chapters} chapters</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{scripture.verses} verses</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-sacred-orange mb-2">Topics covered:</p>
                  <div className="flex flex-wrap gap-1">
                    {scripture.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full btn-lotus">
                  Explore Scripture
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};