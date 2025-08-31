import React, { useState, useEffect, useCallback } from 'react';
import { SvglIcon, Category } from './types';
import { fetchIcons, fetchCategories } from './services/svgService';
import { useDebounce } from './hooks/useDebounce';
import Header from './components/Header';
import IconGrid from './components/IconGrid';
import IconDetailModal from './components/IconDetailModal';
import Loader from './components/Loader';
import Sidebar from './components/Sidebar';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  const [icons, setIcons] = useState<SvglIcon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<SvglIcon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  const debouncedSearchTerm = useDebounce<string>(searchTerm, 300);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getIcons = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // If there's a search term, category is ignored by the search endpoint
        const fetchedIcons = await fetchIcons(debouncedSearchTerm, debouncedSearchTerm ? undefined : activeCategory);
        setIcons(fetchedIcons);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred. Please try again later.');
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getIcons();
  }, [debouncedSearchTerm, activeCategory]);

  const handleIconClick = useCallback((icon: SvglIcon) => {
    setSelectedIcon(icon);
    document.body.style.overflow = 'hidden';
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedIcon(null);
    document.body.style.overflow = '';
  }, []);
  
  const handleCategorySelect = (category: string) => {
      setSearchTerm(''); // Clear search term when a category is selected
      setActiveCategory(category);
  }

  return (
    <div className="flex h-screen bg-light dark:bg-dark font-sans text-zinc-900 dark:text-light">
      <Sidebar 
        categories={categories} 
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-shrink-0">
           <Header theme={theme} toggleTheme={toggleTheme} />
           <div className="px-8 mt-6">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
           </div>
        </div>
        
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {isLoading && <Loader />}
          {error && <p className="text-center text-red-500 mt-10">{error}</p>}
          {!isLoading && !error && (
              icons.length > 0 ? (
                  <IconGrid icons={icons} onIconClick={handleIconClick} />
              ) : (
                  <div className="text-center text-zinc-500 dark:text-zinc-500 mt-16 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-zinc-400 dark:text-zinc-700"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <h2 className="text-xl font-semibold mb-1 text-zinc-700 dark:text-zinc-300">No results found</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                    {debouncedSearchTerm 
                      ? `Your search for "${debouncedSearchTerm}" did not return any results.`
                      : 'No icons available for this category.'
                    }
                    </p>
                  </div>
              )
          )}
        </main>
      </div>

      <IconDetailModal icon={selectedIcon} onClose={handleClosePanel} />
    </div>
  );
};

export default App;