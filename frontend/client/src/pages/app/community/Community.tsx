import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Heart, MessageSquare, Share2, Calendar, MapPin, Star } from 'lucide-react';

const Community = () => {
  const [liked, setLiked] = useState<{[key: string]: boolean}>({});

  const forumPosts = [
    {
      id: '1',
      title: 'How to maintain consistency in daily sadhana?',
      author: 'Bhakti_Seeker_123',
      time: '2 hours ago',
      replies: 12,
      likes: 24,
      category: 'Practice',
      excerpt: 'I struggle to maintain my morning routine. Any tips from experienced practitioners?'
    },
    {
      id: '2',
      title: 'Beautiful experience during today\'s meditation',
      author: 'PeacefulSoul',
      time: '4 hours ago',
      replies: 8,
      likes: 18,
      category: 'Experience',
      excerpt: 'Wanted to share a profound moment I had during dhyana today...'
    },
    {
      id: '3',
      title: 'Understanding Karma Yoga in modern life',
      author: 'ModernYogi',
      time: '1 day ago',
      replies: 15,
      likes: 32,
      category: 'Philosophy',
      excerpt: 'How do we apply Krishna\'s teachings on selfless action in our daily work?'
    }
  ];

  const events = [
    {
      id: '1',
      title: 'Weekly Satsang Circle',
      date: 'Every Sunday',
      time: '6:00 PM - 8:00 PM',
      location: 'Online',
      participants: 45,
      type: 'recurring',
      description: 'Join our weekly discussion on spiritual topics and share experiences.'
    },
    {
      id: '2',
      title: 'Group Meditation Session',
      date: 'Jan 15, 2024',
      time: '7:00 AM - 8:00 AM',
      location: 'Central Park, NYC',
      participants: 23,
      type: 'one-time',
      description: 'Early morning meditation in nature. All levels welcome.'
    },
    {
      id: '3',
      title: 'Bhagavad Gita Study Group',
      date: 'Every Tuesday',
      time: '7:30 PM - 9:00 PM',
      location: 'Online',
      participants: 67,
      type: 'recurring',
      description: 'Chapter-by-chapter study with discussions and practical applications.'
    }
  ];

  const spiritualMentors = [
    {
      id: '1',
      name: 'Swami Anandananda',
      expertise: 'Vedanta & Meditation',
      experience: '25 years',
      rating: 4.9,
      sessions: 156,
      bio: 'Traditional Vedanta teacher with deep knowledge of Upanishads and practical meditation guidance.'
    },
    {
      id: '2',
      name: 'Sister Prema',
      expertise: 'Bhakti Yoga & Devotion',
      experience: '18 years',
      rating: 4.8,
      sessions: 203,
      bio: 'Devoted practitioner specializing in the path of love and surrender to the Divine.'
    },
    {
      id: '3',
      name: 'Pandit Rajesh Sharma',
      expertise: 'Sanskrit & Scriptures',
      experience: '30 years',
      rating: 4.9,
      sessions: 89,
      bio: 'Sanskrit scholar helping students understand ancient texts in their original language.'
    }
  ];

  const handleLike = (postId: string) => {
    setLiked(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">👥</div>
        <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Spiritual Community</h1>
        <p className="text-muted-foreground">Connect with fellow seekers on the path</p>
      </div>

      <Tabs defaultValue="forum" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="forum">Discussion Forum</TabsTrigger>
          <TabsTrigger value="events">Events & Groups</TabsTrigger>
          <TabsTrigger value="mentors">Spiritual Mentors</TabsTrigger>
        </TabsList>

        {/* Forum Tab */}
        <TabsContent value="forum" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Latest Discussions</h2>
            <Button className="btn-sacred">Start New Discussion</Button>
          </div>

          <div className="space-y-4">
            {forumPosts.map((post) => (
              <Card key={post.id} className="card-sacred">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground">{post.time}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>by {post.author}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1"
                        onClick={() => handleLike(post.id)}
                      >
                        <Heart
                          size={16}
                          className={liked[post.id] ? 'fill-red-500 text-red-500' : ''}
                        />
                        <span>{post.likes + (liked[post.id] ? 1 : 0)}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                        <MessageSquare size={16} />
                        <span>{post.replies}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm">
                        <Share2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Upcoming Events</h2>
            <Button className="btn-sacred">Create Event</Button>
          </div>

          <div className="grid gap-6">
            {events.map((event) => (
              <Card key={event.id} className="card-sacred">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant={event.type === 'recurring' ? 'default' : 'secondary'}>
                          {event.type === 'recurring' ? 'Recurring' : 'One-time'}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-primary" />
                      <span>{event.participants} joined</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button className="btn-sacred w-full md:w-auto">Join Event</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Mentors Tab */}
        <TabsContent value="mentors" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Spiritual Mentors</h2>
            <Button className="btn-sacred">Become a Mentor</Button>
          </div>

          <div className="grid gap-6">
            {spiritualMentors.map((mentor) => (
              <Card key={mentor.id} className="card-sacred">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{mentor.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star size={16} className="fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{mentor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground mb-3">
                        <span>📚 {mentor.expertise}</span>
                        <span>⏱️ {mentor.experience}</span>
                        <span>👥 {mentor.sessions} sessions</span>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{mentor.bio}</p>
                      
                      <div className="flex space-x-2">
                        <Button className="btn-sacred">Book Session</Button>
                        <Button variant="outline">View Profile</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;