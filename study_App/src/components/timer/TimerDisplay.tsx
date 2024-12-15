import React from 'react';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
}

export function TimerDisplay({ minutes, seconds }: TimerDisplayProps) {
  return (
    <div className="text-6xl font-bold text-gray-900 mb-8">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
}