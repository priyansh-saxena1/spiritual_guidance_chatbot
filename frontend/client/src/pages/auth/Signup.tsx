import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Flower2 } from 'lucide-react';

const spiritualPaths = [
  { value: 'bhakti', label: 'Bhakti Yoga (Devotion)' },
  { value: 'jnana', label: 'Jnana Yoga (Knowledge)' },
  { value: 'karma', label: 'Karma Yoga (Action)' },
  { value: 'raja', label: 'Raja Yoga (Meditation)' },
];

const deities = [
  { value: 'krishna', label: 'Krishna' },
  { value: 'shiva', label: 'Shiva' },
  { value: 'devi', label: 'Divine Mother (Devi)' },
  { value: 'rama', label: 'Rama' },
  { value: 'ganesha', label: 'Ganesha' },
  { value: 'hanuman', label: 'Hanuman' },
];

export const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    spiritual_path: '',
    ishta_devata: '',
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      await signUp(formData.email, formData.password, formData.name);
      
      toast({
        title: "Welcome to DSCPL!",
        description: "Your spiritual journey begins now"
      });
      setLocation('/app/dashboard');
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sacred-dawn flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-24 h-24 bg-gradient-lotus rounded-full mx-auto mb-4 animate-fade-in">
            <Flower2 size={48} className="text-sacred-maroon" />
          </div>
          <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Begin Your Journey</h1>
          <p className="text-muted-foreground">Join the spiritual path with DSCPL</p>
        </div>

        <Card className="card-sacred">
          <CardHeader>
            <CardTitle className="text-center text-sacred-maroon">Create Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Spiritual Path</Label>
                <Select
                  value={formData.spiritual_path}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, spiritual_path: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your path" />
                  </SelectTrigger>
                  <SelectContent>
                    {spiritualPaths.map(path => (
                      <SelectItem key={path.value} value={path.value}>
                        {path.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Ishta Devata (Preferred Deity)</Label>
                <Select
                  value={formData.ishta_devata}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, ishta_devata: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your deity" />
                  </SelectTrigger>
                  <SelectContent>
                    {deities.map(deity => (
                      <SelectItem key={deity.value} value={deity.value}>
                        {deity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-lotus" 
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Begin Journey'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </p>
              <Link to="/" className="text-sm text-muted-foreground hover:underline">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};