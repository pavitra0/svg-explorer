import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div 
          className="absolute top-full mt-2 w-max max-w-xs px-3 py-1.5 bg-zinc-800 dark:bg-zinc-900 border border-transparent dark:border-dark-border text-white dark:text-zinc-200 text-xs rounded-md shadow-lg z-10 animate-tooltip-fade-in"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;