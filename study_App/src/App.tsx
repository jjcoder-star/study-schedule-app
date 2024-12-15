import React, { useState } from 'react';
import { Navigation } from './components/navigation/Navigation';
import { Dashboard } from './components/Dashboard';
import { Timer } from './components/Timer';
import { AIAssistant } from './components/AIAssistant';
import { ProgressTracker } from './components/ProgressTracker';
import { TaskForm } from './components/TaskForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Task } from './types';

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Read Chapter 5',
    description: 'Complete reading and take notes',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    category: 'study'
  },
  {
    id: '2',
    title: 'Math Assignment',
    description: 'Solve problems 1-10',
    completed: false,
    dueDate: new Date().toISOString().split('T')[0],
    category: 'homework'
  }
];

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timer' | 'ai' | 'progress'>('dashboard');
  const [tasks, setTasks] = useLocalStorage<Task[]>('study-tasks', initialTasks);

  const handleAddTask = (newTask: Omit<Task, 'id'>) => {
    const task: Task = {
      ...newTask,
      id: crypto.randomUUID()
    };
    setTasks([...tasks, task]);
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const completedToday = tasks.filter(task => task.completed).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            <TaskForm onAddTask={handleAddTask} />
            <Dashboard tasks={tasks} completedToday={completedToday} totalTasks={tasks.length} />
          </>
        );
      case 'timer':
        return <Timer />;
      case 'ai':
        return <AIAssistant tasks={tasks} />;
      case 'progress':
        return <ProgressTracker tasks={tasks} onTaskComplete={handleTaskComplete} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;