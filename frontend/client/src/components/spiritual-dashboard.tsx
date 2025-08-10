import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import spiritualBg from '@/assets/spiritual-bg.jpg';

interface DashboardProps {
  user?: {
    name: string;
    currentStreak: number;
    completedDays: number;
  };
}

export const SpiritualDashboard = ({ user }: DashboardProps) => {
  const todaysPractices = [
    {
      id: 'satsang',
      title: 'Today\'s Satsang',
      subtitle: 'Bhagavad Gita Chapter 2',
      icon: '🕉️',
      progress: 0,
      description: 'Divine wisdom on the nature of the soul',
      timeEstimate: '15 mins',
      status: 'pending'
    },
    {
      id: 'japa',
      title: 'Japa Meditation',
      subtitle: 'Om Namah Shivaya',
      icon: '📿',
      progress: 65,
      description: '70 of 108 repetitions completed',
      timeEstimate: '20 mins',
      status: 'in-progress'
    },
    {
      id: 'dhyana',
      title: 'Dhyana Practice',
      subtitle: 'Mindful Breathing',
      icon: '🪷',
      progress: 100,
      description: 'Today\'s meditation completed',
      timeEstimate: '15 mins',
      status: 'completed'
    }
  ];

  const achievements = [
    { icon: '🔥', label: '7-day streak', achieved: true },
    { icon: '🌟', label: '30 days', achieved: true },
    { icon: '💎', label: '100 days', achieved: false },
    { icon: '🏆', label: '365 days', achieved: false },
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${spiritualBg})` }}
    >
      <div className="min-h-screen bg-gradient-subtle/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="om-symbol mb-4">🕉️</div>
            <h1 className="heading-sacred text-4xl mb-2">
              Welcome, {user?.name || 'Devotee'}
            </h1>
            <p className="text-muted-foreground text-lg">
              Continue your spiritual journey today
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="card-sacred text-center">
              <div className="text-3xl mb-2">🔥</div>
              <div className="text-2xl font-bold text-primary">{user?.currentStreak || 7}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </Card>
            <Card className="card-sacred text-center">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-2xl font-bold text-secondary">{user?.completedDays || 23}</div>
              <div className="text-sm text-muted-foreground">Days Completed</div>
            </Card>
            <Card className="card-sacred text-center">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-accent">85%</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </Card>
          </div>

          {/* Today's Practices */}
          <div className="mb-12">
            <h2 className="heading-sacred text-3xl text-center mb-8">
              Today's Spiritual Practices
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {todaysPractices.map((practice, index) => (
                <Card 
                  key={practice.id} 
                  className={`
                    card-lotus group cursor-pointer relative overflow-hidden
                    ${practice.status === 'completed' ? 'ring-2 ring-accent' : ''}
                    ${practice.status === 'in-progress' ? 'ring-2 ring-primary' : ''}
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Status Indicator */}
                  <div className={`absolute top-4 right-4 w-3 h-3 rounded-full ${
                    practice.status === 'completed' ? 'bg-accent' :
                    practice.status === 'in-progress' ? 'bg-primary animate-pulse' :
                    'bg-muted'
                  }`} />

                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {practice.icon}
                      </div>
                      <h3 className="heading-sacred text-xl mb-2">{practice.title}</h3>
                      <p className="text-primary font-medium">{practice.subtitle}</p>
                    </div>

                    <div className="space-y-3">
                      <Progress value={practice.progress} className="h-2" />
                      <p className="text-sm text-muted-foreground">{practice.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{practice.timeEstimate}</span>
                        <span>{practice.progress}% complete</span>
                      </div>
                    </div>

                    <Button 
                      variant={
                        practice.status === 'completed' ? 'secondary' :
                        practice.status === 'in-progress' ? 'lotus' : 'sacred'
                      }
                      className="w-full"
                      disabled={practice.status === 'completed'}
                    >
                      {practice.status === 'completed' ? 'Completed ✓' :
                       practice.status === 'in-progress' ? 'Continue' : 'Begin'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-temple rounded-3xl p-8 text-center">
            <h3 className="heading-sacred text-2xl text-white mb-6">
              Spiritual Milestones
            </h3>
            <div className="flex justify-center space-x-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-300 ${
                    achievement.achieved ? 'scale-110' : 'opacity-50'
                  }`}
                >
                  <div className={`text-4xl mb-2 ${
                    achievement.achieved ? 'animate-glow' : ''
                  }`}>
                    {achievement.icon}
                  </div>
                  <div className="text-white text-sm">{achievement.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating Sacred Elements */}
          <div className="fixed top-32 left-8 animate-float opacity-20 text-3xl" style={{ animationDelay: '1s' }}>
            🪷
          </div>
          <div className="fixed bottom-20 right-12 animate-float opacity-20 text-2xl" style={{ animationDelay: '2s' }}>
            ✨
          </div>
        </div>
      </div>
    </div>
  );
};