import React from 'react';
import { Calendar, CheckCircle2, Clock, BookOpen } from 'lucide-react';
import { Task } from '../types';

interface DashboardProps {
  tasks: Task[];
  completedToday: number;
  totalTasks: number;
}

export function Dashboard({ tasks, completedToday, totalTasks }: DashboardProps) {
  const todaysTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Today's Progress</h2>
          <CheckCircle2 className="text-green-500 w-6 h-6" />
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="3"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#4F46E5"
                strokeWidth="3"
                strokeDasharray={`${(completedToday / totalTasks) * 100}, 100`}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="text-2xl font-bold text-gray-800">{Math.round((completedToday / totalTasks) * 100)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Today's Tasks</h2>
          <Calendar className="text-blue-500 w-6 h-6" />
        </div>
        <div className="space-y-3">
          {todaysTasks.map(task => (
            <div key={task.id} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                readOnly
              />
              <span className={`${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Study Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Study Stats</h2>
          <BookOpen className="text-purple-500 w-6 h-6" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Study Time Today</span>
            <span className="text-gray-800 font-semibold">2h 30m</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Focus Score</span>
            <span className="text-gray-800 font-semibold">85%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Completed Tasks</span>
            <span className="text-gray-800 font-semibold">{completedToday}/{totalTasks}</span>
          </div>
        </div>
      </div>
    </div>
  );
}