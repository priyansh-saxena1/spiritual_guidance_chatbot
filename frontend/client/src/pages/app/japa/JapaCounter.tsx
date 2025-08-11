import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { MantraCounter } from '@/components/ui/mantra-counter';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Settings, Sparkles } from 'lucide-react';
import { Layout } from '@/components/Layout';

export const JapaCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [sessionStarted, setSessionStarted] = useState(false);

  const currentMantra = {
    name: 'Om Namah Shivaya',
    sanskrit: 'ॐ नमः शिवाय',
    transliteration: 'Om Namaḥ Śivāya',
    meaning: 'I bow to Shiva, the supreme consciousness',
    deity: 'Lord Shiva',
    icon: Sparkles
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && sessionStarted) {
      interval = setInterval(() => {
        setTimer(timer => timer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, sessionStarted]);

  const handleCount = () => {
    if (!sessionStarted) {
      setSessionStarted(true);
      setIsActive(true);
    }
    
    if (count < target) {
      setCount(count + 1);
      
      // Play audio feedback if enabled
      if (audioEnabled) {
        // In a real app, you'd play a mala bead sound
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBS6JzfLXeywFIHzH8OCXQwsaYbTh36VVEAhDp+DvsGkgBU');
        audio.volume = 0.1;
        audio.play().catch(() => {});
      }
    }
  };

  const handleReset = () => {
    setCount(0);
    setTimer(0);
    setIsActive(false);
    setSessionStarted(false);
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  const progress = (count / target) * 100;
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const averagePace = timer > 0 && count > 0 ? Math.round(timer / count) : 0;

  const IconComponent = currentMantra.icon;

  return (
    <Layout>
      <div className="min-h-screen bg-sacred-cream">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-sacred-maroon/10 flex items-center justify-center">
              <IconComponent className="w-10 h-10 text-sacred-maroon" />
            </div>
            <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Japa Counter</h1>
            <p className="text-lg text-muted-foreground">{currentMantra.name}</p>
          </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Counter */}
          <div className="lg:col-span-2">
            <Card className="card-sacred mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sacred-maroon">Current Mantra</CardTitle>
                  <Badge className="bg-gradient-lotus text-sacred-maroon">
                    {currentMantra.deity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="p-6 bg-gradient-lotus rounded-2xl">
                  <p className="text-2xl font-sanskrit text-sacred-maroon mb-2">
                    {currentMantra.sanskrit}
                  </p>
                  <p className="text-lg italic text-muted-foreground mb-2">
                    {currentMantra.transliteration}
                  </p>
                  <p className="text-sm text-sacred-orange">
                    {currentMantra.meaning}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Mala Counter */}
            <Card className="card-sacred">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <MantraCounter 
                    count={count} 
                    target={target} 
                    onCount={handleCount}
                    isActive={sessionStarted}
                  />
                </div>

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-sacred-maroon mb-2">
                    {count} / {target}
                  </div>
                  <Progress value={progress} className="h-3 mb-4" />
                  <p className="text-muted-foreground">
                    {target - count} repetitions remaining
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={handleCount}
                    className="btn-lotus px-8 py-4 text-lg"
                    disabled={count >= target}
                  >
                    {!sessionStarted ? 'Begin Japa' : 'Count'}
                  </Button>
                  
                  {sessionStarted && (
                    <>
                      <Button variant="outline" onClick={handlePause}>
                        {isActive ? <Pause size={20} /> : <Play size={20} />}
                      </Button>
                      <Button variant="outline" onClick={handleReset}>
                        <RotateCcw size={20} />
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Session Stats & Controls */}
          <div className="space-y-6">
            {/* Session Stats */}
            <Card className="card-sacred">
              <CardHeader>
                <CardTitle className="text-sacred-maroon">Session Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold">{formatTime(timer)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Progress:</span>
                  <span className="font-semibold">{Math.round(progress)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Pace:</span>
                  <span className="font-semibold">
                    {averagePace > 0 ? `${averagePace}s` : '--'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="font-semibold text-sacred-orange">{count}</span>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="card-sacred">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sacred-maroon">
                  <Settings size={20} />
                  <span>Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-sacred-orange mb-2 block">
                    Target Count
                  </label>
                  <div className="flex space-x-2">
                    {[108, 216, 324, 432].map((num) => (
                      <Button
                        key={num}
                        variant={target === num ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTarget(num)}
                        disabled={sessionStarted}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-sacred-orange">
                    Audio Feedback
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                  >
                    {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  </Button>
                </div>

                <div>
                  <label className="text-sm font-semibold text-sacred-orange mb-2 block">
                    Background Sounds
                  </label>
                  <select className="w-full p-2 border rounded-lg text-sm">
                    <option>None</option>
                    <option>Temple Bells</option>
                    <option>Om Chanting</option>
                    <option>Tibetan Bowls</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-sacred">
              <CardHeader>
                <CardTitle className="text-sacred-maroon">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  🔮 Change Mantra
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📚 Mantra Library
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  View History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};