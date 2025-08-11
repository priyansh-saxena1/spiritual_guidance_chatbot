import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { Layout } from '@/components/Layout';
import { Wind, Sparkles, Eye, Heart, Mountain, Flower } from 'lucide-react';

export const DhyanaTechniques = () => {
  const techniques = [
    {
      id: 'breathing',
      name: 'Pranayama',
      Sanskrit: 'प्राणायाम',
      description: 'Control of life force through breathing techniques',
      duration: '15-30 min',
      level: 'Beginner',
      benefits: ['Calms mind', 'Reduces stress', 'Increases focus'],
      icon: Wind
    },
    {
      id: 'mantra',
      name: 'Mantra Dhyana',
      Sanskrit: 'मन्त्र ध्यान',
      description: 'Meditation using sacred sounds and vibrations',
      duration: '20-45 min',
      level: 'Intermediate',
      benefits: ['Purifies mind', 'Connects to divine', 'Deep peace'],
      icon: Sparkles
    },
    {
      id: 'trataka',
      name: 'Trataka',
      Sanskrit: 'त्राटक',
      description: 'Candle gazing meditation for concentration',
      duration: '10-20 min',
      level: 'Beginner',
      benefits: ['Improves focus', 'Strengthens eyes', 'Mental clarity'],
      icon: Eye
    },
    {
      id: 'chakra',
      name: 'Chakra Dhyana',
      Sanskrit: 'चक्र ध्यान',
      description: 'Energy center meditation for spiritual awakening',
      duration: '30-60 min',
      level: 'Advanced',
      benefits: ['Balances energy', 'Spiritual growth', 'Inner awareness'],
      icon: Heart
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sacred-maroon/10 flex items-center justify-center">
            <Mountain className="w-10 h-10 text-sacred-maroon" />
          </div>
          <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Dhyana Techniques</h1>
          <p className="text-lg text-muted-foreground">Traditional meditation practices for inner peace</p>
        </div>

      {/* Techniques Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {techniques.map((technique) => {
          const IconComponent = technique.icon;
          return (
            <Card key={technique.id} className="card-sacred hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-sacred-maroon/10 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-sacred-maroon" />
                  </div>
                <Badge variant={technique.level === 'Beginner' ? 'default' : technique.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                  {technique.level}
                </Badge>
              </div>
              <CardTitle className="text-sacred-maroon">{technique.name}</CardTitle>
              <p className="text-lg font-sanskrit text-sacred-orange">{technique.Sanskrit}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{technique.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Duration:</span>
                <span className="font-semibold">{technique.duration}</span>
              </div>

              <div>
                <p className="text-sm font-semibold text-sacred-orange mb-2">Benefits:</p>
                <div className="flex flex-wrap gap-1">
                  {technique.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Link to="/app/dhyana/timer" className="flex-1">
                  <Button className="btn-lotus w-full">
                    Start Practice
                  </Button>
                </Link>
                <Link to="/app/dhyana/guided">
                  <Button variant="outline">
                    Guided Session
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        );
      })}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/app/dhyana/timer">
          <Card className="card-sacred hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="text-center p-6">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-sacred-maroon/10 flex items-center justify-center">
                <Wind className="w-5 h-5 text-sacred-maroon" />
              </div>
              <h3 className="font-semibold text-sacred-maroon">Meditation Timer</h3>
              <p className="text-sm text-muted-foreground">Self-guided practice</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/app/dhyana/guided">
          <Card className="card-sacred hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="text-center p-6">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-sacred-maroon/10 flex items-center justify-center">
                <Flower className="w-5 h-5 text-sacred-maroon" />
              </div>
              <h3 className="font-semibold text-sacred-maroon">Guided Sessions</h3>
              <p className="text-sm text-muted-foreground">Audio guidance</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/app/dhyana/progress">
          <Card className="card-sacred hover:shadow-lg transition-all cursor-pointer">
            <CardContent className="text-center p-6">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-sacred-maroon/10 flex items-center justify-center">
                <Mountain className="w-5 h-5 text-sacred-maroon" />
              </div>
              <h3 className="font-semibold text-sacred-maroon">Track Progress</h3>
              <p className="text-sm text-muted-foreground">View statistics</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      </div>
    </Layout>
  );
};