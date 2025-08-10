import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  Sparkles, 
  Brain, 
  Target, 
  MessageCircle, 
  TrendingUp, 
  User,
  Users,
  LogOut
} from 'lucide-react';

const navigationItems = [
  { to: '/app/dashboard', icon: Home, label: 'Dashboard' },
  { to: '/app/satsang', icon: BookOpen, label: 'Satsang' },
  { to: '/app/japa', icon: Sparkles, label: 'Japa' },
  { to: '/app/dhyana', icon: Brain, label: 'Dhyana' },
  { to: '/app/accountability', icon: Target, label: 'Accountability' },
  { to: '/app/chat', icon: MessageCircle, label: 'Chat' },
  { to: '/app/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/app/community', icon: Users, label: 'Community' },
  { to: '/app/profile', icon: User, label: 'Profile' },
];

export const Navigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const [location, setLocation] = useLocation();

  const handleSignOut = async () => {
    await signOut();
    setLocation('/');
  };

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-accent/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🕉️</span>
              <span className="font-bold text-sacred-maroon text-xl">DSCPL</span>
            </div>
            
            <div className="hidden md:flex space-x-1">
              {navigationItems.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  href={to}
                  className={`
                    flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                    ${location === to 
                      ? 'bg-gradient-lotus text-sacred-maroon' 
                      : 'text-muted-foreground hover:bg-accent/10 hover:text-sacred-maroon'
                    }
                  `}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              🙏 {user.name}
            </span>
            <Button variant="outline" size="sm" onClick={handleSignOut} className="ml-4">
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-accent/20">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigationItems.slice(0, 8).map(({ to, icon: Icon, label }) => (
            <Link
              key={to}
              href={to}
              className={`
                flex flex-col items-center space-y-1 p-2 rounded-lg text-xs transition-colors
                ${location === to 
                  ? 'bg-gradient-lotus text-sacred-maroon' 
                  : 'text-muted-foreground hover:bg-accent/10'
                }
              `}
            >
              <Icon size={18} />
              <span className="truncate w-full text-center">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};