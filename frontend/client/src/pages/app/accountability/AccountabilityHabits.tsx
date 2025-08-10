import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, Plus, Target } from 'lucide-react';

export const AccountabilityHabits = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Morning Prayer', target: 7, completed: 5, streak: 5, emoji: '🙏' },
    { id: 2, name: 'Satsang Reading', target: 7, completed: 6, streak: 3, emoji: '📖' },
    { id: 3, name: 'Japa Practice', target: 7, completed: 4, streak: 4, emoji: '📿' },
    { id: 4, name: 'Meditation', target: 5, completed: 3, streak: 2, emoji: '🧘‍♀️' },
    { id: 5, name: 'Seva (Service)', target: 3, completed: 2, streak: 1, emoji: '🤝' },
    { id: 6, name: 'Gratitude Practice', target: 7, completed: 7, streak: 7, emoji: '🌟' }
  ]);

  const toggleHabit = (habitId: number) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: Math.min(habit.completed + 1, habit.target) }
        : habit
    ));
  };

  const weekProgress = Math.round((habits.reduce((sum, h) => sum + h.completed, 0) / habits.reduce((sum, h) => sum + h.target, 0)) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Spiritual Habits</h1>
        <p className="text-lg text-muted-foreground">Build consistent spiritual practices for growth</p>
      </div>

      {/* Weekly Overview */}
      <Card className="card-sacred mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-sacred-maroon">
            <Target className="mr-2" size={20} />
            This Week's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Overall Completion</span>
              <span className="text-2xl font-bold text-primary">{weekProgress}%</span>
            </div>
            <Progress value={weekProgress} className="h-3" />
            <div className="grid grid-cols-7 gap-2 mt-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">{day}</div>
                  <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-bold ${
                    index < 5 ? 'bg-primary text-primary-foreground' : 'bg-border text-muted-foreground'
                  }`}>
                    {index < 4 ? '✓' : index === 4 ? '○' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Habits List */}
      <div className="space-y-4 mb-8">
        {habits.map((habit) => (
          <Card key={habit.id} className="card-sacred hover:shadow-lg transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{habit.emoji}</div>
                  <div>
                    <h3 className="font-semibold text-sacred-maroon">{habit.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{habit.completed}/{habit.target} this week</span>
                      <span className="flex items-center">
                        🔥 {habit.streak} day streak
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Progress</div>
                    <div className="w-24">
                      <Progress value={(habit.completed / habit.target) * 100} className="h-2" />
                    </div>
                  </div>
                  <Button
                    onClick={() => toggleHabit(habit.id)}
                    variant={habit.completed >= habit.target ? "default" : "outline"}
                    size="sm"
                    disabled={habit.completed >= habit.target}
                  >
                    {habit.completed >= habit.target ? (
                      <CheckCircle size={16} />
                    ) : (
                      <Circle size={16} />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Habit */}
      <Card className="card-sacred border-dashed border-2 hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <Button variant="outline" className="w-full flex items-center justify-center space-x-2 text-muted-foreground hover:text-primary">
            <Plus size={20} />
            <span>Add New Spiritual Habit</span>
          </Button>
        </CardContent>
      </Card>

      {/* Motivational Quote */}
      <Card className="card-sacred mt-8 bg-gradient-lotus">
        <CardContent className="text-center p-8">
          <div className="text-4xl mb-4">🌱</div>
          <blockquote className="text-lg font-medium text-sacred-maroon mb-2">
            "We are what we repeatedly do. Excellence, then, is not an act, but a habit."
          </blockquote>
          <cite className="text-sm text-muted-foreground">— Aristotle</cite>
        </CardContent>
      </Card>
    </div>
  );
};