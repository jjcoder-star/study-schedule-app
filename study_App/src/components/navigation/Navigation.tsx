import React from 'react';
import { Layers, Clock, Brain, BarChart } from 'lucide-react';
import { NavButton } from './NavButton';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: 'dashboard' | 'timer' | 'ai' | 'progress') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <NavButton
              icon={Layers}
              label="Dashboard"
              isActive={activeTab === 'dashboard'}
              onClick={() => onTabChange('dashboard')}
            />
            <NavButton
              icon={Clock}
              label="Timer"
              isActive={activeTab === 'timer'}
              onClick={() => onTabChange('timer')}
            />
            <NavButton
              icon={Brain}
              label="AI Assistant"
              isActive={activeTab === 'ai'}
              onClick={() => onTabChange('ai')}
            />
            <NavButton
              icon={BarChart}
              label="Progress"
              isActive={activeTab === 'progress'}
              onClick={() => onTabChange('progress')}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}