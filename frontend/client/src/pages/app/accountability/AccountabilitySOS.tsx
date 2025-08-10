import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Phone, MessageCircle, Heart, Shield, Users } from 'lucide-react';

export const AccountabilitySOS = () => {
  const emergencyContacts = [
    { name: 'Spiritual Mentor', phone: '+1-800-DHARMA', available: '24/7', type: 'mentor' },
    { name: 'Community Support', phone: '+1-800-SANGHA', available: 'Daily 6AM-10PM', type: 'community' },
    { name: 'Crisis Helpline', phone: '+1-800-HELP', available: '24/7', type: 'crisis' }
  ];

  const quickActions = [
    {
      title: 'Instant Meditation',
      description: '5-minute guided breathing to center yourself',
      action: 'Start Now',
      icon: '🧘‍♀️',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: 'Mantra Chanting',
      description: 'Recite Om Namah Shivaya for inner peace',
      action: 'Begin Chanting',
      icon: '📿',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Scripture Reading',
      description: 'Read inspirational verses from Bhagavad Gita',
      action: 'Read Now',
      icon: '📖',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      title: 'Connect with Sangha',
      description: 'Reach out to your spiritual community',
      action: 'Connect',
      icon: '👥',
      color: 'bg-green-50 border-green-200'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🆘</div>
        <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Spiritual SOS Support</h1>
        <p className="text-lg text-muted-foreground">Immediate help when you need spiritual guidance</p>
      </div>

      {/* Emergency Alert */}
      <Alert className="mb-8 border-red-200 bg-red-50">
        <Shield className="h-4 w-4" />
        <AlertDescription className="text-red-800">
          <strong>Need immediate help?</strong> Don't hesitate to reach out. Your spiritual well-being matters, and support is always available.
        </AlertDescription>
      </Alert>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sacred-maroon mb-6 text-center">
          Immediate Spiritual Support
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className={`card-sacred hover:shadow-lg transition-all ${action.color}`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{action.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sacred-maroon mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                    <Button className="btn-lotus w-full">
                      {action.action}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Emergency Contacts */}
      <Card className="card-sacred mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-sacred-maroon">
            <Phone className="mr-2" size={20} />
            Emergency Spiritual Support
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gradient-lotus rounded-lg">
              <div>
                <h3 className="font-semibold text-sacred-maroon">{contact.name}</h3>
                <p className="text-sm text-muted-foreground">Available: {contact.available}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" className="btn-lotus">
                  <Phone size={16} className="mr-1" />
                  Call
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle size={16} className="mr-1" />
                  Chat
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Breathing Exercise */}
      <Card className="card-sacred mb-8">
        <CardHeader>
          <CardTitle className="flex items-center text-sacred-maroon">
            <Heart className="mr-2" size={20} />
            Emergency Breathing Exercise
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="text-6xl animate-breathe">🫁</div>
            <div className="max-w-2xl mx-auto">
              <h3 className="font-semibold text-sacred-maroon mb-4">4-7-8 Breathing Technique</h3>
              <ol className="text-left space-y-2 text-muted-foreground">
                <li>1. Breathe in quietly through your nose for 4 counts</li>
                <li>2. Hold your breath for 7 counts</li>
                <li>3. Exhale completely through your mouth for 8 counts</li>
                <li>4. Repeat 3-4 times</li>
              </ol>
            </div>
            <Button className="btn-lotus">
              Start Guided Breathing
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Community Support */}
      <Card className="card-sacred bg-gradient-lotus">
        <CardContent className="text-center p-8">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-2xl font-bold text-sacred-maroon mb-4">
            You Are Not Alone
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            The DSCPL community is here to support you. Whether you're facing spiritual challenges, 
            emotional difficulties, or just need someone to listen, our sangha is always ready to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="btn-lotus">
              <Users size={16} className="mr-2" />
              Join Support Group
            </Button>
            <Button variant="outline">
              Share Your Story
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};