import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

export function Timer() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  const backgrounds = [
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
    'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=1920&q=80'
  ];

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
    setBackgroundIndex((backgroundIndex + 1) % backgrounds.length);
  };

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div 
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgrounds[backgroundIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <div className="relative z-10 text-center">
        <div className="bg-white bg-opacity-90 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Focus Timer</h2>
          
          <div className="text-6xl font-bold text-gray-900 mb-8">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTimer}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 transition-colors"
            >
              {isActive ? <Pause size={24} /> : <Play size={24} />}
            </button>
            
            <button
              onClick={resetTimer}
              className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-4 transition-colors"
            >
              <RefreshCw size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}