import React from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Sparkles, Brain, Target, MessageCircle, TrendingUp } from 'lucide-react';

const practiceCards = [
  {
    title: 'Today\'s Satsang',
    subtitle: 'Scripture Study',
    description: 'Bhagavad Gita 2.47 - Right to Action',
    icon: BookOpen,
    link: '/app/satsang/daily',
    progress: 0,
    emoji: '📿',
    gradient: 'bg-gradient-to-br from-amber-50 to-orange-100'
  },
  {
    title: 'Japa Practice',
    subtitle: 'Mantra Meditation',
    description: 'Om Namah Shivaya - 108 repetitions',
    icon: Sparkles,
    link: '/app/japa/counter',
    progress: 34,
    emoji: '🔮',
    gradient: 'bg-gradient-to-br from-purple-50 to-pink-100'
  },
  {
    title: 'Dhyana Session',
    subtitle: 'Meditation',
    description: '15-minute breathing meditation',
    icon: Brain,
    link: '/app/dhyana/timer',
    progress: 0,
    emoji: '🧘‍♀️',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-100'
  },
  {
    title: 'Daily Check-in',
    subtitle: 'Accountability',
    description: 'Reflect on spiritual progress',
    icon: Target,
    link: '/app/accountability/habits',
    progress: 0,
    emoji: '🎯',
    gradient: 'bg-gradient-to-br from-green-50 to-emerald-100'
  }
];

const quickStats = [
  { label: 'Current Streak', value: '7 days', emoji: '🔥' },
  { label: 'Programs Completed', value: '3', emoji: '🏆' },
  { label: 'Minutes Meditated', value: '245', emoji: '⏰' },
  { label: 'Mantras Chanted', value: '1,296', emoji: '📿' },
];

const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 20) return 'Good Evening';
  return 'Om Shanti';
};

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-sacred-cream">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-sacred-maroon mb-2">
                {getTimeBasedGreeting()}, {user?.name} 🙏
              </h1>
              <p className="text-muted-foreground">{today}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl mb-2">🕉️</div>
              <p className="text-sm text-sacred-orange font-semibold">Day 7 of your journey</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="card-sacred hover:shadow-glow transition-all duration-300">
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{stat.emoji}</div>
                <div className="text-2xl font-bold text-sacred-maroon mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Today's Practices */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-sacred-maroon mb-6">Today's Spiritual Practices</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {practiceCards.map((practice, index) => (
              <Card key={index} className={`card-lotus hover:scale-[1.02] transition-all duration-300 ${practice.gradient}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{practice.emoji}</div>
                      <div>
                        <CardTitle className="text-sacred-maroon">{practice.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{practice.subtitle}</p>
                      </div>
                    </div>
                    <practice.icon className="text-sacred-orange" size={24} />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{practice.description}</p>
                  
                  {practice.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{practice.progress}%</span>
                      </div>
                      <Progress value={practice.progress} className="h-2" />
                    </div>
                  )}
                  
                  <Button asChild className="w-full btn-lotus">
                    <Link to={practice.link}>
                      {practice.progress > 0 ? 'Continue' : 'Start'} Practice
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="card-sacred">
            <CardContent className="p-6 text-center">
              <MessageCircle className="mx-auto text-sacred-orange mb-4" size={32} />
              <h3 className="font-semibold text-sacred-maroon mb-2">Spiritual Guidance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get personalized spiritual advice from AI
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/app/chat">Start Chat</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-sacred">
            <CardContent className="p-6 text-center">
              <TrendingUp className="mx-auto text-sacred-orange mb-4" size={32} />
              <h3 className="font-semibold text-sacred-maroon mb-2">View Progress</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Track your spiritual journey and achievements
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/app/progress">View Stats</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="card-sacred">
            <CardContent className="p-6 text-center">
              <BookOpen className="mx-auto text-sacred-orange mb-4" size={32} />
              <h3 className="font-semibold text-sacred-maroon mb-2">New Program</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start a new spiritual learning program
              </p>
              <Button asChild variant="outline" className="w-full">
                <Link to="/app/satsang/topics">Browse Topics</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};