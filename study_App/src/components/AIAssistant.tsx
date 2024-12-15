import React, { useState } from 'react';
import { MessageSquare, Brain, ChevronRight } from 'lucide-react';
import { Task } from '../types';

interface AIAssistantProps {
  tasks: Task[];
}

export function AIAssistant({ tasks }: AIAssistantProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (type: 'progress' | 'reminders' | 'homework') => {
    setIsTyping(true);
    
    // Simulate AI response generation
    setTimeout(() => {
      let response = '';
      
      switch (type) {
        case 'progress':
          const completed = tasks.filter(t => t.completed).length;
          const total = tasks.length;
          response = `This week you've completed ${completed} out of ${total} tasks. That's ${Math.round((completed/total) * 100)}% completion rate. Keep up the good work!`;
          break;
          
        case 'reminders':
          const pending = tasks.filter(t => !t.completed).map(t => t.title).join(', ');
          response = `You still need to complete: ${pending || 'No pending tasks!'}`;
          break;
          
        case 'homework':
          const today = new Date().toISOString().split('T')[0];
          const homework = tasks.filter(t => t.dueDate === today && t.category === 'homework')
            .map(t => t.title).join(', ');
          response = `Today's homework: ${homework || 'No homework due today!'}`;
          break;
      }
      
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center space-x-3 mb-6">
        <Brain className="w-8 h-8 text-purple-600" />
        <h2 className="text-2xl font-bold text-gray-800">Study Assistant</h2>
      </div>

      <div className="space-y-4 mb-6">
        <button
          onClick={() => generateResponse('progress')}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-700">Check Weekly Progress</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => generateResponse('reminders')}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-700">Get Task Reminders</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>

        <button
          onClick={() => generateResponse('homework')}
          className="w-full flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <span className="font-medium text-gray-700">Today's Homework</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="border-t pt-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex items-start space-x-3">
              <MessageSquare className="w-5 h-5 text-purple-600 mt-1" />
              <p className="text-gray-700">{msg}</p>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}