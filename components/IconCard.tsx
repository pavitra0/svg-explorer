import React from 'react';
import { SvglIcon } from '../types';
import Tooltip from './Tooltip';

interface IconCardProps {
  icon: SvglIcon;
  onClick: (icon: SvglIcon) => void;
}

const IconCard: React.FC<IconCardProps> = ({ icon, onClick }) => {
  return (
    <Tooltip text={icon.name}>
      <div
        onClick={() => onClick(icon)}
        className="group cursor-pointer flex items-center justify-center p-4 aspect-square bg-zinc-100 dark:bg-dark-card rounded-md border border-zinc-200 dark:border-dark-card transition-all duration-200 hover:border-zinc-300 dark:hover:border-dark-border active:scale-95"
      >
        <img
          src={icon.route}
          alt={icon.name}
          className="w-10 h-10 object-contain transition-transform duration-200 group-hover:scale-110"
          loading="lazy"
        />
      </div>
    </Tooltip>
  );
};

export default IconCard;