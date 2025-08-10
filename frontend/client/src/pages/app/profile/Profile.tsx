import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, Bell, Shield, Palette, Languages } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Demo Devotee',
    email: user?.email || 'demo@dscpl.com',
    spiritual_path: user?.spiritual_path || 'bhakti',
    ishta_devata: user?.ishta_devata || 'krishna',
    daily_goal_meditation: 20,
    daily_goal_mantras: 108,
    daily_goal_study: 30,
    bio: 'A sincere seeker on the path of self-realization, dedicated to daily spiritual practice and service.',
    location: 'India',
    spiritual_anniversary: '2023-01-01'
  });

  const [notifications, setNotifications] = useState({
    daily_reminders: true,
    achievement_alerts: true,
    community_updates: false,
    mentor_sessions: true,
    weekly_progress: true
  });

  const [privacy, setPrivacy] = useState({
    profile_visibility: 'public',
    progress_sharing: true,
    activity_status: true
  });

  const spiritualPaths = [
    { value: 'bhakti', label: 'Bhakti Yoga (Devotion)' },
    { value: 'jnana', label: 'Jnana Yoga (Knowledge)' },
    { value: 'karma', label: 'Karma Yoga (Action)' },
    { value: 'raja', label: 'Raja Yoga (Meditation)' }
  ];

  const deities = [
    { value: 'krishna', label: 'Krishna' },
    { value: 'shiva', label: 'Shiva' },
    { value: 'devi', label: 'Divine Mother (Devi)' },
    { value: 'rama', label: 'Rama' },
    { value: 'ganesha', label: 'Ganesha' },
    { value: 'hanuman', label: 'Hanuman' }
  ];

  const handleProfileUpdate = () => {
    console.log('Profile updated:', profileData);
    // In a real app, this would save to backend
  };

  const handleNotificationUpdate = () => {
    console.log('Notifications updated:', notifications);
  };

  const handlePrivacyUpdate = () => {
    console.log('Privacy updated:', privacy);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
            {profileData.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold text-sacred-maroon mb-2">{profileData.name}</h1>
        <p className="text-muted-foreground">Spiritual Seeker • {profileData.spiritual_path} Path</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User size={16} />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center space-x-2">
            <Settings size={16} />
            <span>Settings</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center space-x-2">
            <Shield size={16} />
            <span>Privacy</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anniversary">Spiritual Journey Started</Label>
                  <Input
                    id="anniversary"
                    type="date"
                    value={profileData.spiritual_anniversary}
                    onChange={(e) => setProfileData(prev => ({ ...prev, spiritual_anniversary: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="w-full p-2 border border-border rounded-md bg-background text-foreground"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-sacred">
            <CardHeader>
              <CardTitle>Spiritual Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Spiritual Path</Label>
                  <Select
                    value={profileData.spiritual_path}
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, spiritual_path: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {spiritualPaths.map((path) => (
                        <SelectItem key={path.value} value={path.value}>
                          {path.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Ishta Devata (Chosen Deity)</Label>
                  <Select
                    value={profileData.ishta_devata}
                    onValueChange={(value) => setProfileData(prev => ({ ...prev, ishta_devata: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {deities.map((deity) => (
                        <SelectItem key={deity.value} value={deity.value}>
                          {deity.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-sacred">
            <CardHeader>
              <CardTitle>Daily Practice Goals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="meditation-goal">Meditation (minutes)</Label>
                  <Input
                    id="meditation-goal"
                    type="number"
                    value={profileData.daily_goal_meditation}
                    onChange={(e) => setProfileData(prev => ({ ...prev, daily_goal_meditation: parseInt(e.target.value) }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mantras-goal">Mantras (count)</Label>
                  <Input
                    id="mantras-goal"
                    type="number"
                    value={profileData.daily_goal_mantras}
                    onChange={(e) => setProfileData(prev => ({ ...prev, daily_goal_mantras: parseInt(e.target.value) }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="study-goal">Study (minutes)</Label>
                  <Input
                    id="study-goal"
                    type="number"
                    value={profileData.daily_goal_study}
                    onChange={(e) => setProfileData(prev => ({ ...prev, daily_goal_study: parseInt(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleProfileUpdate} className="btn-sacred w-full">
            Save Profile Changes
          </Button>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="text-primary" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="flex-1 cursor-pointer">
                    {key.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => 
                      setNotifications(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="text-primary" />
                <span>Theme & Display</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select defaultValue="english">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                    <SelectItem value="sanskrit">संस्कृत (Sanskrit)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Theme</Label>
                <Select defaultValue="sacred">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sacred">Sacred (Default)</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleNotificationUpdate} className="btn-sacred w-full">
            Save Settings
          </Button>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="text-primary" />
                <span>Privacy Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Profile Visibility</Label>
                <Select
                  value={privacy.profile_visibility}
                  onValueChange={(value) => setPrivacy(prev => ({ ...prev, profile_visibility: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="community">Community Only</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="progress-sharing" className="flex-1 cursor-pointer">
                  Share Progress with Community
                </Label>
                <Switch
                  id="progress-sharing"
                  checked={privacy.progress_sharing}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, progress_sharing: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="activity-status" className="flex-1 cursor-pointer">
                  Show Activity Status
                </Label>
                <Switch
                  id="activity-status"
                  checked={privacy.activity_status}
                  onCheckedChange={(checked) => 
                    setPrivacy(prev => ({ ...prev, activity_status: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="card-sacred">
            <CardHeader>
              <CardTitle>Data & Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Download My Data
              </Button>
              <Button variant="outline" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>

          <Button onClick={handlePrivacyUpdate} className="btn-sacred w-full">
            Save Privacy Settings
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;