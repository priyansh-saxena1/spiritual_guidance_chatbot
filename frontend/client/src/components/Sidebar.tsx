import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
  LogOut,
  Flower2,
  Menu,
  X
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

export const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [location, setLocation] = useLocation();
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    setLocation('/');
  };

  if (!user) return null;

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </Button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-white border-r border-accent/20 shadow-lg z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        "translate-x-0" // Always visible
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-accent/20">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <Flower2 size={28} className="text-sacred-maroon" />
                <span className="font-bold text-sacred-maroon text-xl">DSCPL</span>
              </div>
            )}
            {collapsed && (
              <div className="mx-auto">
                <Flower2 size={28} className="text-sacred-maroon" />
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex p-1"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Menu size={16} />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                href={to}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors group",
                  location === to 
                    ? "bg-gradient-lotus text-sacred-maroon shadow-sm" 
                    : "text-muted-foreground hover:bg-accent/10 hover:text-sacred-maroon",
                  collapsed && "justify-center px-2"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={20} className="flex-shrink-0" />
                {!collapsed && <span>{label}</span>}
                {collapsed && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {label}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-accent/20">
            {!collapsed && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">Welcome,</p>
                <p className="font-medium text-sacred-maroon">{user.name}</p>
              </div>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className={cn("w-full", collapsed && "px-2")}
            >
              <LogOut size={16} className={cn(collapsed ? "" : "mr-2")} />
              {!collapsed && "Sign Out"}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};
