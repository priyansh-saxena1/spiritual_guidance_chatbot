import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  spiritual_path?: string;
  ishta_devata?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const token = localStorage.getItem('token');
    
    if (token) {
      // Try to get user profile from backend
      refreshUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const refreshUser = async () => {
    try {
      const userData = await authAPI.getProfile();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, clear token and use mock data for now
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Try real API first
      const response = await authAPI.login({ username: email, password });
      setUser(response.user);
    } catch (error) {
      console.error('Backend login failed, using mock:', error);
      // Fallback to mock login for development
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        username: email,
        spiritual_path: 'bhakti',
        ishta_devata: 'krishna'
      };
      
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Try real API first
      await authAPI.register({
        username: email,
        email,
        password,
        name
      });
      // After successful registration, log the user in
      await signIn(email, password);
    } catch (error) {
      console.error('Backend signup failed, using mock:', error);
      // Fallback to mock signup for development
      const mockUser: User = {
        id: '1',
        email,
        name,
        username: email,
        spiritual_path: 'bhakti',
        ishta_devata: 'krishna'
      };
      
      const mockToken = 'mock-jwt-token';
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    authAPI.logout();
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
