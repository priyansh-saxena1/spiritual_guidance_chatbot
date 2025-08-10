import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Clock, User } from 'lucide-react';

export const DhyanaGuided = () => {
  const guidedSessions = [
    {
      id: 'morning-peace',
      title: 'Morning Peace Meditation',
      instructor: 'Swami Dharmananda',
      duration: '15 min',
      level: 'Beginner',
      description: 'Start your day with inner peace and divine connection',
      techniques: ['Pranayama', 'Mantra Chanting', 'Mindfulness'],
      emoji: '🌅'
    },
    {
      id: 'chakra-balancing',
      title: 'Chakra Balancing Journey',
      instructor: 'Mata Anandamayi',
      duration: '30 min',
      level: 'Intermediate',
      description: 'Activate and balance your seven energy centers',
      techniques: ['Chakra Visualization', 'Sacred Sounds', 'Energy Work'],
      emoji: '🌈'
    },
    {
      id: 'om-meditation',
      title: 'Sacred Om Meditation',
      instructor: 'Pandit Krishnamurthy',
      duration: '20 min',
      level: 'Beginner',
      description: 'Connect with the primordial sound of creation',
      techniques: ['Om Chanting', 'Sound Meditation', 'Breath Awareness'],
      emoji: '🕉️'
    },
    {
      id: 'kundalini-awakening',
      title: 'Kundalini Awakening Practice',
      instructor: 'Yogi Bharadwaj',
      duration: '45 min',
      level: 'Advanced',
      description: 'Awaken the dormant spiritual energy within',
      techniques: ['Kundalini Yoga', 'Bandhas', 'Advanced Pranayama'],
      emoji: '⚡'
    },
    {
      id: 'devotional-meditation',
      title: 'Bhakti Meditation',
      instructor: 'Sant Tulsi Das',
      duration: '25 min',
      level: 'Beginner',
      description: 'Surrender to the divine through pure devotion',
      techniques: ['Devotional Chanting', 'Heart Opening', 'Surrender Practice'],
      emoji: '❤️'
    },
    {
      id: 'trataka-candle',
      title: 'Trataka - Candle Gazing',
      instructor: 'Acharya Vishnu',
      duration: '18 min',
      level: 'Intermediate',
      description: 'Develop concentration through candle flame meditation',
      techniques: ['Trataka', 'Concentration', 'Third Eye Activation'],
      emoji: '🕯️'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎧</div>
        <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Guided Meditation Sessions</h1>
        <p className="text-lg text-muted-foreground">Experience meditation with expert spiritual teachers</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <Button variant="default" size="sm">All Sessions</Button>
        <Button variant="outline" size="sm">Beginner</Button>
        <Button variant="outline" size="sm">Intermediate</Button>
        <Button variant="outline" size="sm">Advanced</Button>
        <Button variant="outline" size="sm">Morning</Button>
        <Button variant="outline" size="sm">Evening</Button>
      </div>

      {/* Sessions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guidedSessions.map((session) => (
          <Card key={session.id} className="card-sacred hover:shadow-glow transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <div className="text-4xl">{session.emoji}</div>
                <Badge variant={session.level === 'Beginner' ? 'default' : session.level === 'Intermediate' ? 'secondary' : 'destructive'}>
                  {session.level}
                </Badge>
              </div>
              <CardTitle className="text-sacred-maroon text-lg">{session.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">{session.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <User size={16} className="mr-2 text-sacred-orange" />
                  <span className="font-medium">{session.instructor}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock size={16} className="mr-2 text-sacred-orange" />
                  <span>{session.duration}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-sacred-orange mb-2">Techniques:</p>
                <div className="flex flex-wrap gap-1">
                  {session.techniques.map((technique, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {technique}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="btn-lotus w-full mt-4">
                <Play size={16} className="mr-2" />
                Start Session
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Teacher */}
      <div className="mt-12">
        <Card className="card-sacred bg-gradient-lotus">
          <CardContent className="p-8">
            <div className="text-center max-w-3xl mx-auto">
              <div className="text-6xl mb-4">🙏</div>
              <h3 className="text-2xl font-bold text-sacred-maroon mb-4">
                Featured Teacher: Swami Dharmananda
              </h3>
              <p className="text-muted-foreground mb-6">
                "Meditation is not about stopping thoughts, but recognizing that they are just thoughts and that you are the observer of them. 
                Through guided practice, we learn to rest in our true nature - pure awareness and bliss."
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline">View All Sessions</Button>
                <Button className="btn-lotus">Featured Meditation</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};