import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-sacred-cream">
      <Sidebar />
      <main className="ml-64 transition-all duration-300">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};