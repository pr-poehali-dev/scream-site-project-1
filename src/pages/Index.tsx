import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [triggered, setTriggered] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const screamRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    screamRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/1993/1993-preview.mp3');
    
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (screamRef.current) {
        screamRef.current.pause();
        screamRef.current = null;
      }
    };
  }, []);

  const triggerScreamer = () => {
    setTriggered(true);
    
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (screamRef.current) {
      screamRef.current.volume = 1.0;
      screamRef.current.play().catch(console.error);
    }
    
    document.body.style.overflow = 'hidden';
  };

  useEffect(() => {
    if (countdown > 0 && !triggered) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !triggered) {
      triggerScreamer();
    }
  }, [countdown, triggered]);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  };

  const reset = () => {
    setTriggered(false);
    setCountdown(5);
    
    if (screamRef.current) {
      screamRef.current.pause();
      screamRef.current.currentTime = 0;
    }
    
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
    
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {!triggered ? (
        <div className="text-center space-y-8 p-8">
          <h1 className="text-6xl font-light text-black tracking-wider">
            ТИШИНА
          </h1>
          
          <div className="space-y-4">
            <p className="text-xl text-gray-600 font-light">
              Простой. Спокойный. Безопасный.
            </p>
            
            <div className="text-8xl font-thin text-black tabular-nums">
              {countdown}
            </div>
          </div>

          <Button
            onClick={handleStart}
            variant="outline"
            className="mt-8 px-8 py-6 text-lg font-light border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
          >
            Начать
          </Button>

          <p className="text-sm text-gray-400 font-light">
            Ничего не произойдёт. Обещаю.
          </p>
        </div>
      ) : (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in zoom-in duration-100"
          style={{
            background: '#000',
          }}
        >
          <img
            src="https://cdn.poehali.dev/projects/ffe972c8-4fc9-4c5b-9d4c-b9d391b439c8/files/796f2f3b-dcb9-4c5b-9d4c-b9d391b439c8.jpg"
            alt="screamer"
            className="w-full h-full object-cover animate-pulse"
            style={{
              animation: 'shake 0.1s infinite, pulse 0.5s infinite',
            }}
          />
          
          <Button
            onClick={reset}
            className="absolute bottom-8 bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg font-light"
          >
            Сбросить
          </Button>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-2px, 2px) rotate(-1deg); }
          20% { transform: translate(2px, -2px) rotate(1deg); }
          30% { transform: translate(-2px, -2px) rotate(-1deg); }
          40% { transform: translate(2px, 2px) rotate(1deg); }
          50% { transform: translate(-2px, 2px) rotate(-1deg); }
          60% { transform: translate(2px, -2px) rotate(1deg); }
          70% { transform: translate(-2px, -2px) rotate(-1deg); }
          80% { transform: translate(2px, 2px) rotate(1deg); }
          90% { transform: translate(-2px, 2px) rotate(-1deg); }
        }
      `}</style>
    </div>
  );
};

export default Index;