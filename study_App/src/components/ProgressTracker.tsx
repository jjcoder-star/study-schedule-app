import React from 'react';
import { CheckCircle2, Clock, Tag } from 'lucide-react';
import { Task } from '../types';

interface ProgressTrackerProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
}

export function ProgressTracker({ tasks, onTaskComplete }: ProgressTrackerProps) {
  const categories = ['homework', 'study', 'project'] as const;
  
  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'homework': return 'bg-blue-100 text-blue-800';
      case 'study': return 'bg-green-100 text-green-800';
      case 'project': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Progress Tracker</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stats Overview */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Overview</h3>
          <div className="space-y-4">
            {categories.map(category => {
              const categoryTasks = tasks.filter(t => t.category === category);
              const completed = categoryTasks.filter(t => t.completed).length;
              const total = categoryTasks.length;
              const percentage = total ? Math.round((completed / total) * 100) : 0;
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-gray-600" />
                    <span className="capitalize text-gray-700">{category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {tasks.map(task => (
            <div
              key={task.id}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => onTaskComplete(task.id)}
                    className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <div>
                    <h4 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                      {task.title}
                    </h4>
                    <p className="text-sm text-gray-500">{task.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(task.category)}`}>
                        {task.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                {task.completed && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}