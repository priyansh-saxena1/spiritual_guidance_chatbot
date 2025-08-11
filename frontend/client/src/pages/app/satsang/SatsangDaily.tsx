import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

export const SatsangDaily: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sacred-maroon/10 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-sacred-maroon" />
            </div>
            <h1 className="text-3xl font-bold text-sacred-maroon">
              Daily Satsang
            </h1>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Today's Spiritual Teaching</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-6">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
                  <p className="text-lg font-devanagari mb-4">
                    कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
                  </p>
                  <p className="text-base text-muted-foreground mb-2">
                    karmaṇy-evādhikāras te mā phaleṣu kadācana
                  </p>
                  <p className="text-lg font-semibold">
                    "You have the right to perform your duties, but never to the fruits of action."
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    - Bhagavad Gita 2.47
                  </p>
                </div>
                
                <div className="text-left space-y-4">
                  <h3 className="text-xl font-semibold">Teaching Explanation:</h3>
                  <p className="text-base">
                    This fundamental verse teaches us about Karma Yoga - the path of selfless action. 
                    Krishna instructs Arjuna that we should focus completely on our duties and actions, 
                    while remaining detached from their results.
                  </p>
                  
                  <h3 className="text-xl font-semibold">Practical Application:</h3>
                  <p className="text-base">
                    Today, choose one task and perform it with complete dedication while letting go of 
                    anxiety about the outcome. Focus on the quality of your effort rather than the results.
                  </p>
                  
                  <h3 className="text-xl font-semibold">Reflection Questions:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li>How can I detach from outcomes while still caring about my actions?</li>
                    <li>What duties am I avoiding due to fear of failure?</li>
                    <li>How would my life change if I focused only on my effort, not results?</li>
                  </ul>
                </div>
                
                <div className="flex gap-4 justify-center">
                  <Button variant="outline">Previous Teaching</Button>
                  <Button>Complete Reflection</Button>
                  <Button variant="outline">Next Teaching</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};
