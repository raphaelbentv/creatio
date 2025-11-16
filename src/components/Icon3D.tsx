import { ReactNode } from 'react';

interface Icon3DProps {
  children: ReactNode;
  className?: string;
}

export const Icon3D = ({ children, className = '' }: Icon3DProps) => {
  return (
    <div
      className={`
        w-[70px] h-[70px] bg-gradient-to-br from-[#ff6b9d] via-[#c026d3] to-[#8a5cf6]
        rounded-[18px] flex items-center justify-center mb-5
        transition-all duration-400
        hover:-translate-y-2
        ${className}
      `}
      style={{
        transform: 'perspective(1000px) rotateX(10deg) rotateY(-10deg)',
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

