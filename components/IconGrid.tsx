import React from 'react';
import { SvglIcon } from '../types';
import IconCard from './IconCard';

interface IconGridProps {
  icons: SvglIcon[];
  onIconClick: (icon: SvglIcon) => void;
}

const IconGrid: React.FC<IconGridProps> = ({ icons, onIconClick }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(80px,1fr))] gap-2">
      {icons.map((icon) => (
        <IconCard key={icon.id} icon={icon} onClick={onIconClick} />
      ))}
    </div>
  );
};

export default IconGrid;