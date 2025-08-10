import { useState } from 'react';
import { Button } from './button';

interface MantraCounterProps {
  mantra?: string;
  transliteration?: string;
  target?: number;
  count?: number;
  onCount?: () => void;
  onComplete?: () => void;
  isActive?: boolean;
}

export const MantraCounter = ({ 
  mantra = "ॐ नमः शिवाय", 
  transliteration = "Om Namaḥ Śivāya", 
  target = 108,
  count: externalCount,
  onCount,
  onComplete,
  isActive 
}: MantraCounterProps) => {
  const [internalCount, setInternalCount] = useState(0);
  
  // Use external count if provided, otherwise use internal
  const count = externalCount !== undefined ? externalCount : internalCount;

  const handleIncrement = () => {
    if (onCount) {
      onCount();
    } else {
      const newCount = internalCount + 1;
      setInternalCount(newCount);
      
      if (newCount >= target && onComplete) {
        onComplete();
      }
    }
  };

  const handleReset = () => {
    setInternalCount(0);
  };

  const progress = (count / target) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Mantra Display */}
      <div className="text-center mb-12 space-y-6">
        <div className="sanskrit-text text-4xl">
          {mantra}
        </div>
        {transliteration && (
          <div className="transliteration text-xl">
            {transliteration}
          </div>
        )}
      </div>

      {/* Sacred Counter Circle */}
      <div className="relative w-80 h-80 mx-auto mb-12">
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="hsl(var(--border))"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 140}`}
            strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`}
            className="transition-all duration-300"
            style={{
              filter: 'drop-shadow(0 0 10px hsl(var(--primary) / 0.5))'
            }}
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">📿</div>
            <div className="text-5xl font-bold text-primary mb-2">{count}</div>
            <div className="text-lg text-muted-foreground">of {target}</div>
          </div>
        </div>

        {/* Mala Beads Around Circle */}
        {[...Array(108)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute w-2 h-2 rounded-full transition-all duration-300
              ${i < count ? 'bg-primary shadow-glow' : 'bg-border'}
            `}
            style={{
              top: '50%',
              left: '50%',
              transform: `
                translate(-50%, -50%) 
                rotate(${(i * 360) / 108}deg) 
                translateY(-150px)
              `,
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-6">
        <Button
          onClick={handleIncrement}
          variant="om"
          size="lg"
          disabled={count >= target}
          className="text-xl px-8 py-4 transition-all duration-300"
        >
          Count
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="px-8 py-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Reset
        </Button>
      </div>

      {/* Completion Message */}
      {count >= target && (
        <div className="text-center mt-8 p-6 bg-gradient-lotus rounded-2xl">
          <div className="text-2xl mb-2">🎉</div>
          <div className="heading-sacred text-xl text-sacred-maroon">
            Mala Complete!
          </div>
          <div className="text-muted-foreground">
            You have completed {target} repetitions
          </div>
        </div>
      )}
    </div>
  );
};