'use client';

import { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-blue-600 to-blue-700 flex flex-col items-center justify-center">
      <div className="text-center">
        <img 
          src="/web-app-manifest-192x192.png" 
          alt="HolidayPhysio" 
          className="w-32 h-32 mb-6 mx-auto rounded-3xl shadow-2xl"
        />
        <h1 className="text-5xl font-bold text-white mb-2">Xmas Physio</h1>
      </div>
      
      <div className="absolute bottom-12 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>
    </div>
  );
}
