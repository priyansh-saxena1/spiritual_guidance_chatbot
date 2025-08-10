import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Clock, Target, TrendingUp } from 'lucide-react';

export const DhyanaProgress = () => {
  const stats = {
    totalSessions: 45,
    totalMinutes: 720,
    currentStreak: 12,
    longestStreak: 28,
    weeklyGoal: 5,
    completedThisWeek: 4
  };

  const recentSessions = [
    { date: '2024-01-07', duration: 20, type: 'Pranayama', completed: true },
    { date: '2024-01-06', duration: 15, type: 'Om Meditation', completed: true },
    { date: '2024-01-05', duration: 30, type: 'Chakra Balancing', completed: true },
    { date: '2024-01-04', duration: 25, type: 'Mindfulness', completed: true },
    { date: '2024-01-03', duration: 15, type: 'Morning Peace', completed: true }
  ];

  const achievements = [
    { name: 'First Steps', description: 'Complete your first meditation', earned: true, icon: '👶' },
    { name: 'Week Warrior', description: '7-day meditation streak', earned: true, icon: '⚡' },
    { name: 'Inner Peace', description: '100 minutes meditated', earned: true, icon: '🕉️' },
    { name: 'Dedication', description: '30-day meditation streak', earned: false, icon: '🏆' },
    { name: 'Master Meditator', description: '1000 minutes meditated', earned: false, icon: '🎯' },
    { name: 'Enlightened', description: '365-day meditation streak', earned: false, icon: '✨' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📈</div>
        <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Meditation Progress</h1>
        <p className="text-lg text-muted-foreground">Track your spiritual journey and growth</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="card-sacred">
          <CardContent className="text-center p-6">
            <div className="text-3xl mb-2">🧘‍♀️</div>
            <div className="text-2xl font-bold text-primary">{stats.totalSessions}</div>
            <div className="text-sm text-muted-foreground">Total Sessions</div>
          </CardContent>
        </Card>

        <Card className="card-sacred">
          <CardContent className="text-center p-6">
            <div className="text-3xl mb-2">⏰</div>
            <div className="text-2xl font-bold text-primary">{stats.totalMinutes}</div>
            <div className="text-sm text-muted-foreground">Minutes Meditated</div>
          </CardContent>
        </Card>

        <Card className="card-sacred">
          <CardContent className="text-center p-6">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-sacred-orange">{stats.currentStreak}</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </CardContent>
        </Card>

        <Card className="card-sacred">
          <CardContent className="text-center p-6">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-2xl font-bold text-sacred-orange">{stats.longestStreak}</div>
            <div className="text-sm text-muted-foreground">Longest Streak</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Goal Progress */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="flex items-center text-sacred-maroon">
                <Target className="mr-2" size={20} />
                Weekly Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {stats.completedThisWeek} of {stats.weeklyGoal} sessions completed
                  </span>
                  <span className="text-sm font-semibold">
                    {Math.round((stats.completedThisWeek / stats.weeklyGoal) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(stats.completedThisWeek / stats.weeklyGoal) * 100} 
                  className="h-3"
                />
                <p className="text-xs text-muted-foreground">
                  {stats.weeklyGoal - stats.completedThisWeek} more session{stats.weeklyGoal - stats.completedThisWeek !== 1 ? 's' : ''} to reach your weekly goal
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sessions */}
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="flex items-center text-sacred-maroon">
                <Calendar className="mr-2" size={20} />
                Recent Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-lotus rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-green-500">✓</div>
                      <div>
                        <div className="font-medium text-sacred-maroon">{session.type}</div>
                        <div className="text-sm text-muted-foreground">{session.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-sacred-orange" />
                      <span className="text-sm font-medium">{session.duration} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <div>
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="flex items-center text-sacred-maroon">
                <TrendingUp className="mr-2" size={20} />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-gradient-lotus border-sacred-orange/30' 
                        : 'bg-muted/50 border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${achievement.earned ? 'text-sacred-maroon' : 'text-muted-foreground'}`}>
                          {achievement.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.earned && (
                        <Badge className="bg-sacred-orange text-white">
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Meditation Insights */}
          <Card className="card-sacred mt-6">
            <CardHeader>
              <CardTitle className="text-sacred-maroon">This Week's Insight</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="text-4xl">🌟</div>
                <p className="text-sm text-muted-foreground italic">
                  "Your consistency is remarkable! You've maintained a 12-day streak. 
                  Regular practice is leading to deeper states of peace and awareness."
                </p>
                <Badge variant="outline" className="text-xs">
                  AI Spiritual Insight
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};