import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { MessageCircle, Video, Phone, Users, Heart, Star } from 'lucide-react';

export const AccountabilityPartner = () => {
  const currentPartner = {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    spiritualPath: 'Bhakti Yoga',
    joinedDate: '2023-06-15',
    streak: 45,
    practices: ['Satsang', 'Japa', 'Seva'],
    avatar: '🙏',
    status: 'online'
  };

  const potentialPartners = [
    {
      name: 'Rahul Krishnan',
      location: 'Bangalore, India',
      spiritualPath: 'Raja Yoga',
      compatibility: 92,
      practices: ['Meditation', 'Pranayama', 'Study'],
      avatar: '🧘‍♂️'
    },
    {
      name: 'Sarah Williams',
      location: 'California, USA',
      spiritualPath: 'Jnana Yoga',
      compatibility: 88,
      practices: ['Scripture Study', 'Contemplation', 'Satsang'],
      avatar: '📖'
    },
    {
      name: 'Dev Patel',
      location: 'London, UK',
      spiritualPath: 'Karma Yoga',
      compatibility: 85,
      practices: ['Seva', 'Meditation', 'Community Service'],
      avatar: '🤝'
    }
  ];

  const weeklyGoals = [
    { goal: 'Daily Satsang Reading', yourProgress: 6, partnerProgress: 5, target: 7 },
    { goal: 'Meditation Practice', yourProgress: 4, partnerProgress: 6, target: 5 },
    { goal: 'Japa Sessions', yourProgress: 7, partnerProgress: 7, target: 7 },
    { goal: 'Weekly Check-in', yourProgress: 1, partnerProgress: 1, target: 1 }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🤝</div>
        <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Accountability Partner</h1>
        <p className="text-lg text-muted-foreground">Grow together on your spiritual journey</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Partner */}
        <div className="lg:col-span-2 space-y-6">
          {currentPartner ? (
            <>
              <Card className="card-sacred">
                <CardHeader>
                  <CardTitle className="flex items-center text-sacred-maroon">
                    <Heart className="mr-2" size={20} />
                    Your Spiritual Partner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative">
                      <div className="text-4xl">{currentPartner.avatar}</div>
                      {currentPartner.status === 'online' && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-sacred-maroon">{currentPartner.name}</h3>
                      <p className="text-muted-foreground">{currentPartner.location}</p>
                      <Badge className="bg-gradient-lotus text-sacred-maroon">
                        {currentPartner.spiritualPath}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-sacred-orange">{currentPartner.streak}</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </div>
                  </div>

                  <div className="flex space-x-2 mb-6">
                    <Button size="sm" className="btn-lotus">
                      <MessageCircle size={16} className="mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video size={16} className="mr-1" />
                      Video Call
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone size={16} className="mr-1" />
                      Voice Call
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-sacred-orange mb-2">Shared Practices:</p>
                    <div className="flex flex-wrap gap-1">
                      {currentPartner.practices.map((practice, index) => (
                        <Badge key={index} variant="outline">
                          {practice}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Goals Progress */}
              <Card className="card-sacred">
                <CardHeader>
                  <CardTitle className="text-sacred-maroon">Weekly Goals Together</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-sacred-maroon">{goal.goal}</span>
                        <span className="text-sm text-muted-foreground">
                          Target: {goal.target}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>You</span>
                            <span>{goal.yourProgress}/{goal.target}</span>
                          </div>
                          <div className="w-full bg-border rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${(goal.yourProgress / goal.target) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{currentPartner.name}</span>
                            <span>{goal.partnerProgress}/{goal.target}</span>
                          </div>
                          <div className="w-full bg-border rounded-full h-2">
                            <div 
                              className="bg-sacred-orange h-2 rounded-full transition-all" 
                              style={{ width: `${(goal.partnerProgress / goal.target) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="card-sacred text-center p-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-sacred-maroon mb-4">
                Find Your Spiritual Partner
              </h3>
              <p className="text-muted-foreground mb-6">
                Connect with like-minded souls on the spiritual path for mutual support and growth.
              </p>
              <Button className="btn-lotus">
                <Users size={16} className="mr-2" />
                Browse Partners
              </Button>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Potential Partners */}
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="flex items-center text-sacred-maroon">
                <Users className="mr-2" size={20} />
                Suggested Partners
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {potentialPartners.map((partner, index) => (
                <div key={index} className="p-3 bg-gradient-lotus rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="text-2xl">{partner.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sacred-maroon">{partner.name}</h4>
                      <p className="text-xs text-muted-foreground">{partner.location}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center text-xs text-sacred-orange">
                        <Star size={12} className="mr-1 fill-current" />
                        {partner.compatibility}%
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs mb-2">
                    {partner.spiritualPath}
                  </Badge>
                  <Button size="sm" variant="outline" className="w-full">
                    Connect
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Partnership Benefits */}
          <Card className="card-sacred bg-gradient-lotus">
            <CardContent className="text-center p-6">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold text-sacred-maroon mb-2">
                Partnership Benefits
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Consistent motivation</li>
                <li>• Shared accountability</li>
                <li>• Deeper spiritual insights</li>
                <li>• Regular check-ins</li>
                <li>• Growth tracking</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};