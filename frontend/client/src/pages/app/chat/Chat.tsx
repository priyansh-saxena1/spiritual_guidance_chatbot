import React from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Chat: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-sacred-maroon mb-2">
            🕉️ Spiritual Guidance Chat
          </h1>
          <p className="text-muted-foreground">
            Receive personalized spiritual guidance and wisdom
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>AI Spiritual Companion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Spiritual Guide:</p>
                <p>🙏 Namaste! I'm here to help guide you on your spiritual journey. Ask me about meditation, mantras, scriptures, or any spiritual practice you'd like to learn about.</p>
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask your spiritual question..."
                  className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Send
                </button>
              </div>
              
              <p className="text-xs text-muted-foreground text-center">
                This chat will be connected to the AI backend for personalized spiritual guidance
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Chat;
