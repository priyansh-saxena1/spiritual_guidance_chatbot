import { useState, useEffect } from 'react';

interface BreathingCircleProps {
  duration?: number; // in seconds
  isActive?: boolean;
  onComplete?: () => void;
}

export const BreathingCircle = ({ 
  duration = 4, 
  isActive = false, 
  onComplete 
}: BreathingCircleProps) => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSeconds(prev => {
        const newSeconds = prev + 1;
        const cyclePosition = newSeconds % (duration * 4);
        
        if (cyclePosition < duration) {
          setPhase('inhale');
        } else if (cyclePosition < duration * 2) {
          setPhase('hold');
        } else if (cyclePosition < duration * 3) {
          setPhase('exhale');
        } else {
          setPhase('pause');
        }
        
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, duration]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'pause': return 'Pause';
    }
  };

  const getCircleScale = () => {
    switch (phase) {
      case 'inhale': return 'scale-110';
      case 'hold': return 'scale-110';
      case 'exhale': return 'scale-100';
      case 'pause': return 'scale-100';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      {/* Breathing Circle */}
      <div className="relative w-80 h-80">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-sacred-fire opacity-20 animate-pulse" />
        
        {/* Main breathing circle */}
        <div className={`
          absolute inset-4 rounded-full bg-gradient-sacred-fire opacity-60
          transition-transform duration-[4s] ease-in-out
          ${isActive ? getCircleScale() : 'scale-100'}
        `} />
        
        {/* Inner circle with Om */}
        <div className="absolute inset-8 rounded-full bg-white/90 flex items-center justify-center shadow-sacred">
          <span className="text-6xl">🕉️</span>
        </div>
        
        {/* Breathing guide dots */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-3 h-3 rounded-full bg-primary
                transition-opacity duration-1000
                ${Math.floor(seconds / duration) % 4 >= i / 3 ? 'opacity-100' : 'opacity-30'}
              `}
              style={{
                top: '50%',
                left: '50%',
                transform: `
                  translate(-50%, -50%) 
                  rotate(${i * 30}deg) 
                  translateY(-150px)
                `,
              }}
            />
          ))}
        </div>
      </div>

      {/* Breathing Instructions */}
      <div className="text-center space-y-4">
        <div className="text-3xl font-devanagari text-sacred-maroon">
          {getPhaseText()}
        </div>
        <div className="text-lg text-muted-foreground">
          {isActive ? `${duration} seconds` : 'Press start to begin'}
        </div>
        <div className="text-sm text-accent font-medium">
          Cycle: {Math.floor(seconds / (duration * 4)) + 1}
        </div>
      </div>
    </div>
  );
};