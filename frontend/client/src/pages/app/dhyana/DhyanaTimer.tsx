import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BreathingCircle } from '@/components/ui/breathing-circle';
import { Play, Pause, Square, Bell, Volume2, VolumeX } from 'lucide-react';

export const DhyanaTimer = () => {
  const [duration, setDuration] = useState(15); // minutes
  const [timeLeft, setTimeLeft] = useState(duration * 60); // seconds
  const [isActive, setIsActive] = useState(false);
  const [showBreathing, setShowBreathing] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (audioEnabled) {
        // Play completion bell sound
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBS6JzfLXeywFIHzH8OCXQwsaYbTh36VVEAhDp+DvsGkgBU');
        audio.volume = 0.3;
        audio.play().catch(() => {});
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, audioEnabled]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(!isActive);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧘‍♀️</div>
        <h1 className="text-3xl font-bold text-sacred-maroon mb-2">Meditation Timer</h1>
        <p className="text-lg text-muted-foreground">Find your inner peace through mindful meditation</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Timer */}
        <div className="lg:col-span-2">
          <Card className="card-sacred">
            <CardContent className="text-center p-8">
              {/* Breathing Circle or Timer Display */}
              {showBreathing && isActive ? (
                <div className="mb-8">
                  <BreathingCircle />
                  <p className="text-sm text-muted-foreground mt-4">Follow the circle's rhythm</p>
                </div>
              ) : (
                <div className="mb-8">
                  <div className="relative w-64 h-64 mx-auto mb-6">
                    {/* Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="hsl(var(--border))"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="120"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 120}`}
                        strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                        className="transition-all duration-1000"
                        style={{
                          filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))'
                        }}
                      />
                    </svg>
                    
                    {/* Center Content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-primary mb-2">
                          {formatTime(timeLeft)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {isActive ? 'Meditating...' : 'Ready to begin'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="flex justify-center space-x-4 mb-6">
                {!isActive && timeLeft === duration * 60 ? (
                  <Button onClick={handleStart} className="btn-lotus px-8 py-3 text-lg">
                    <Play size={20} className="mr-2" />
                    Begin Meditation
                  </Button>
                ) : (
                  <>
                    <Button onClick={handlePause} variant="outline" size="lg">
                      {isActive ? <Pause size={20} /> : <Play size={20} />}
                    </Button>
                    <Button onClick={handleStop} variant="outline" size="lg">
                      <Square size={20} />
                    </Button>
                  </>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-border/50 rounded-full h-2 mb-4">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <p className="text-sm text-muted-foreground">
                {Math.round(progress)}% complete
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Settings & Controls */}
        <div className="space-y-6">
          {/* Duration Settings */}
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="text-sacred-maroon">Duration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select 
                value={duration.toString()} 
                onValueChange={(value) => setDuration(parseInt(value))}
                disabled={isActive}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="text-sacred-maroon">Audio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-sacred-orange">
                  Completion Bell
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
                  <option>Silence</option>
                  <option>Om Chanting</option>
                  <option>Tibetan Bowls</option>
                  <option>Nature Sounds</option>
                  <option>Temple Bells</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Visual Settings */}
          <Card className="card-sacred">
            <CardHeader>
              <CardTitle className="text-sacred-maroon">Visual Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-sacred-orange">
                  Breathing Circle
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowBreathing(!showBreathing)}
                >
                  {showBreathing ? 'On' : 'Off'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Completion Message */}
      {timeLeft === 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="card-sacred max-w-md mx-4">
            <CardContent className="text-center p-8">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-sacred-maroon mb-4">
                Meditation Complete!
              </h3>
              <p className="text-muted-foreground mb-6">
                You have successfully completed your {duration}-minute meditation session.
              </p>
              <Button onClick={handleStop} className="btn-lotus">
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};