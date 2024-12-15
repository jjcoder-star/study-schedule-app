import { useState, useEffect } from 'react';

export function useTimer(initialTime: number) {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);

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
    setTime(initialTime);
  };

  return {
    time,
    isActive,
    toggleTimer,
    resetTimer,
    minutes: Math.floor(time / 60),
    seconds: time % 60
  };
}