import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface TimerControlsProps {
  isActive: boolean;
  onToggle: () => void;
  onReset: () => void;
}

export function TimerControls({ isActive, onToggle, onReset }: TimerControlsProps) {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={onToggle}
        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 transition-colors"
      >
        {isActive ? <Pause size={24} /> : <Play size={24} />}
      </button>
      
      <button
        onClick={onReset}
        className="bg-gray-600 hover:bg-gray-700 text-white rounded-full p-4 transition-colors"
      >
        <RefreshCw size={24} />
      </button>
    </div>
  );
}