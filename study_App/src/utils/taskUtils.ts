import { Task } from '../types';

export const getTodaysTasks = (tasks: Task[]): Task[] => {
  const today = new Date().toISOString().split('T')[0];
  return tasks.filter(task => task.dueDate === today);
};

export const getTasksByCategory = (tasks: Task[], category: Task['category']): Task[] => {
  return tasks.filter(task => task.category === category);
};

export const getCompletionRate = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(task => task.completed).length;
  return Math.round((completed / tasks.length) * 100);
};