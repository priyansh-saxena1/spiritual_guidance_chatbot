import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const JapaLibrary: React.FC = () => {
  return (
    <div className="min-h-screen bg-sacred-cream">
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl font-bold text-sacred-maroon mb-4">Mantra Library</h1>
          <p className="text-lg text-muted-foreground">
            Complete collection of sacred mantras and their meanings
          </p>
        </div>
        <Card className="card-sacred">
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Mantra library coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};