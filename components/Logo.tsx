import React from 'react';

const Logo: React.FC = () => {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-zinc-900 dark:text-white">
        <path d="M14.5 3.5C14.5 3.5 18 2 21 4C21 4 22.5 7.5 20.5 10.5C20.5 10.5 19 12.5 16 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 10L3.5 20.5C3.5 20.5 2 22 4 21C4 21 7.5 22.5 10.5 20.5C10.5 20.5 12.5 19 11.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 11.5L11.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.5 2.5C8.5 2.5 12.5 1.5 15 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 11C3 11 1.5 12.5 4.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default Logo;