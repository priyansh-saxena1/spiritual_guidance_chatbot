import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Activity Heatmap Component
const ActivityHeatmap: React.FC = () => {
  // Generate activity data for the past 12 weeks
  const generateActivityData = () => {
    const data = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (12 * 7)); // 12 weeks ago

    for (let week = 0; week < 12; week++) {
      const weekData = [];
      for (let day = 0; day < 7; day++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + (week * 7) + day);
        
        // Generate random activity level (0-4)
        const activity = Math.floor(Math.random() * 5);
        weekData.push({
          date: currentDate,
          activity,
          practices: activity > 0 ? Math.floor(Math.random() * 3) + 1 : 0
        });
      }
      data.push(weekData);
    }
    return data;
  };

  const getActivityColor = (level: number) => {
    const colors = {
      0: 'bg-gray-100',
      1: 'bg-orange-200',
      2: 'bg-orange-300', 
      3: 'bg-orange-400',
      4: 'bg-orange-500'
    };
    return colors[level as keyof typeof colors];
  };

  const getActivityTooltip = (date: Date, activity: number, practices: number) => {
    const dateStr = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
    
    if (activity === 0) return `${dateStr}: No practice`;
    return `${dateStr}: ${practices} practice${practices > 1 ? 's' : ''} completed`;
  };

  const activityData = generateActivityData();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔥 Activity Heatmap
          <Badge variant="secondary" className="ml-auto">Past 12 weeks</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Month labels */}
          <div className="flex justify-between text-xs text-muted-foreground px-4">
            {months.slice(-4).map(month => (
              <span key={month}>{month}</span>
            ))}
          </div>
          
          {/* Heatmap grid */}
          <div className="flex gap-1">
            {/* Weekday labels */}
            <div className="flex flex-col gap-1 pr-2">
              <div className="h-3"></div> {/* Spacer for month labels */}
              {weekdays.map((day, index) => (
                <div key={day} className="h-3 text-xs text-muted-foreground flex items-center">
                  {index % 2 === 1 ? day.slice(0, 3) : ''}
                </div>
              ))}
            </div>
            
            {/* Activity squares */}
            {activityData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex}-${dayIndex}`}
                    className={`h-3 w-3 rounded-sm ${getActivityColor(day.activity)} 
                              hover:ring-2 hover:ring-primary cursor-pointer transition-all`}
                    title={getActivityTooltip(day.date, day.activity, day.practices)}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Less</span>
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`h-3 w-3 rounded-sm ${getActivityColor(level)}`}
                />
              ))}
              <span className="text-sm text-muted-foreground">More</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-primary">
                {activityData.flat().filter(d => d.activity > 0).length}
              </span> days of practice
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Progress: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sacred-maroon mb-2">
            📈 Spiritual Progress
          </h1>
          <p className="text-muted-foreground">
            Track your spiritual journey and celebrate your growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">7</div>
                <p className="text-sm text-muted-foreground">days of practice</p>
                <Badge className="mt-2">On Fire! 🔥</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Programs Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">3</div>
                <p className="text-sm text-muted-foreground">spiritual programs</p>
                <Badge variant="secondary" className="mt-2">Growing! 🌱</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Meditation Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">2.5</div>
                <p className="text-sm text-muted-foreground">hours this week</p>
                <Badge variant="outline" className="mt-2">Peaceful 🧘‍♀️</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Satsang (Daily Study)</span>
                <span>6/7 days</span>
              </div>
              <ProgressBar value={86} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Japa (Mantra Practice)</span>
                <span>5/7 days</span>
              </div>
              <ProgressBar value={71} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Dhyana (Meditation)</span>
                <span>4/7 days</span>
              </div>
              <ProgressBar value={57} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Activity Heatmap */}
        <ActivityHeatmap />

        {/* Achievement Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🏆 Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-200">
                <div className="text-3xl mb-2">🔥</div>
                <div className="font-semibold text-sm">7-Day Streak</div>
                <div className="text-xs text-muted-foreground">Earned 3 days ago</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200">
                <div className="text-3xl mb-2">📿</div>
                <div className="font-semibold text-sm">Japa Master</div>
                <div className="text-xs text-muted-foreground">1000 mantras chanted</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-100 to-green-200">
                <div className="text-3xl mb-2">🧘‍♀️</div>
                <div className="font-semibold text-sm">Meditation Novice</div>
                <div className="text-xs text-muted-foreground">10 hours completed</div>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 opacity-50">
                <div className="text-3xl mb-2">🕉️</div>
                <div className="font-semibold text-sm">Wisdom Seeker</div>
                <div className="text-xs text-muted-foreground">Read 50 scriptures</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📊 This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Days Practiced</span>
                <Badge>18/31</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Longest Streak</span>
                <Badge variant="secondary">7 days</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Favorite Practice</span>
                <Badge variant="outline">Satsang 📖</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Total Time</span>
                <Badge>8.5 hours</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🎯 Goals & Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>30-Day Consistency Goal</span>
                  <span>18/30 days</span>
                </div>
                <ProgressBar value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Monthly Meditation Goal</span>
                  <span>8.5/15 hours</span>
                </div>
                <ProgressBar value={57} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Scripture Reading Goal</span>
                  <span>12/20 passages</span>
                </div>
                <ProgressBar value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
