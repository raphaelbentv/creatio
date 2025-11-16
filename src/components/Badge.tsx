import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export const Badge = ({ children, className = '' }: BadgeProps) => {
  return (
    <span
      className={`
        inline-flex items-center gap-2.5 px-[18px] py-2.5 rounded-[14px] gradient-purple
        text-[13px] font-bold mb-4 border border-white/10 transition-all duration-300
        hover:-translate-y-0.5
        ${className}
      `}
    >
      {children}
    </span>
  );
};

