import React from 'react';
import { Category } from '../types';

interface CategoryListProps {
    categories: Category[];
    activeCategory: string;
    onCategorySelect: (category: string) => void;
}

const CategoryItem: React.FC<{ name: string, count?: number, isActive: boolean, onClick: () => void }> = ({ name, count, isActive, onClick }) => (
    <button 
        onClick={onClick}
        className={`w-full text-left px-6 py-1.5 text-sm flex justify-between items-center transition-colors rounded-r-md -ml-px border-l-2 ${
            isActive 
            ? 'border-primary text-primary dark:text-white bg-red-100/50 dark:bg-dark-accent' 
            : 'border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800/50'
        }`}
    >
        <span className="font-medium">{name}</span>
        {count != null && <span className="text-zinc-400 dark:text-zinc-500">{count}</span>}
    </button>
);


const CategoryList: React.FC<CategoryListProps> = ({ categories, activeCategory, onCategorySelect }) => {
  const totalIcons = categories.reduce((sum, cat) => sum + cat.total, 0);

  return (
    <nav className="space-y-1">
        <h3 className="px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-2 mb-1">View</h3>
        <CategoryItem 
            name="All"
            count={totalIcons > 0 ? totalIcons : undefined}
            isActive={activeCategory === 'all'}
            onClick={() => onCategorySelect('all')}
        />
        <h3 className="px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider mt-4 mb-1">Categories</h3>
        {categories.map(cat => (
            <CategoryItem 
                key={cat.category}
                name={cat.category}
                count={cat.total}
                isActive={activeCategory === cat.category}
                onClick={() => onCategorySelect(cat.category)}
            />
        ))}
    </nav>
  );
};

export default CategoryList;