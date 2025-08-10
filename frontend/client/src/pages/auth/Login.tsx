import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast({
        title: "Welcome back! 🙏",
        description: "Continue your spiritual journey"
      });
      setLocation('/app/dashboard');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials",
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
          <div className="text-6xl mb-4 animate-fade-in">🕉️</div>
          <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Continue your spiritual journey</p>
        </div>

        <Card className="card-sacred">
          <CardHeader>
            <CardTitle className="text-center text-sacred-maroon">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Test Credentials */}
            <div className="mb-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm font-medium text-primary mb-1">Test Credentials</p>
              <p className="text-xs text-muted-foreground">
                Email: <code className="bg-background px-1 rounded">demo@dscpl.com</code><br/>
                Password: <code className="bg-background px-1 rounded">password123</code>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all focus:shadow-glow"
                  placeholder="demo@dscpl.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all focus:shadow-glow"
                  placeholder="password123"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full btn-lotus" 
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                New to DSCPL?{' '}
                <Link to="/auth/signup" className="text-primary hover:underline">
                  Begin your journey
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