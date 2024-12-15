import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ProgressCardProps {
  completedToday: number;
  totalTasks: number;
}

export function ProgressCard({ completedToday, totalTasks }: ProgressCardProps) {
  const percentage = Math.round((completedToday / totalTasks) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Today's Progress</h2>
        <CheckCircle2 className="text-green-500 w-6 h-6" />
      </div>
      <div className="flex items-center justify-center">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-2xl font-bold text-gray-800">{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}