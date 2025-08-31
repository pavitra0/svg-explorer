import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400 dark:text-zinc-500"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        placeholder={`Search icons...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white dark:bg-dark border border-zinc-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-zinc-900 dark:text-light transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-500"
      />
    </div>
  );
};

export default SearchBar;