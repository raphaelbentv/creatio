import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  size?: 'tiny' | 'small' | 'square' | 'wide' | 'tall' | 'large' | 'huge';
  className?: string;
}

const sizeClasses = {
  tiny: 'col-span-1 row-span-1',
  small: 'col-span-2 row-span-1',
  square: 'col-span-2 row-span-2',
  wide: 'col-span-3 row-span-2',
  tall: 'col-span-2 row-span-3',
  large: 'col-span-3 row-span-3',
  huge: 'col-span-4 row-span-4',
};

export const Card = ({ children, size = 'tiny', className = '' }: CardProps) => {
  return (
    <div
      className={`
        card-gradient rounded-3xl p-6 border border-white/6 transition-all duration-400 relative overflow-hidden
        shadow-[0_2px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.03)]
        hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(138,92,246,0.15),0_4px_12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)]
        hover:border-[rgba(138,92,246,0.25)]
        ${sizeClasses[size]}
        ${className}
      `}
    >
      <div className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl p-px bg-gradient-to-br from-[rgba(138,92,246,0.3)] via-[rgba(99,102,241,0.15)] to-transparent opacity-0 transition-opacity duration-400 hover:opacity-100 -z-10"></div>
      <div 
        className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-0 transition-opacity duration-400 hover:opacity-100 -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(138, 92, 246, 0.08) 0%, transparent 70%)',
        }}
      ></div>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  onMenuClick?: () => void;
  size?: 'small' | 'large';
}

export const CardHeader = ({ title, onMenuClick, size = 'small' }: CardHeaderProps) => {
  const titleSizeClass = size === 'large' ? 'text-2xl' : 'text-[15px]';
  
  return (
    <div className="flex justify-between items-center mb-6">
      <h3 className={`${titleSizeClass} font-bold text-[#8a5cf6] capitalize tracking-tight`}>{title}</h3>
      <div
        className="w-1 h-[18px] bg-gradient-to-b from-[#6b6b7a] via-transparent to-[#6b6b7a] cursor-pointer opacity-40 transition-all duration-300 rounded-sm hover:opacity-100 hover:from-[#8a5cf6] hover:to-[#8a5cf6]"
        onClick={onMenuClick}
      ></div>
    </div>
  );
};

