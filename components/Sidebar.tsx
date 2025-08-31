import React from 'react';
import { Category } from '../types';
import CategoryList from './CategoryList';
import Logo from './Logo';

interface SidebarProps {
    categories: Category[];
    activeCategory: string;
    onCategorySelect: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-zinc-100 dark:bg-dark border-r border-zinc-200 dark:border-dark-border flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-zinc-200 dark:border-dark-border">
          <a href="#" className="flex items-center gap-3 text-lg font-semibold text-zinc-900 dark:text-white">
            <Logo />
            <span>Icon Explorer</span>
          </a>
      </div>
      <div className="flex-grow overflow-y-auto py-4">
        <CategoryList 
            categories={categories} 
            activeCategory={activeCategory} 
            onCategorySelect={onCategorySelect} 
        />
      </div>
    </aside>
  );
};

export default Sidebar;