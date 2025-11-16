import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  children: ReactNode;
}


export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  className = '',
  ...props
}: ButtonProps) => {
  const baseClasses = 'px-7 py-3.5 rounded-[10px] text-sm font-extrabold border-none cursor-pointer transition-all duration-400 no-underline inline-flex items-center justify-center gap-2.5 font-sans uppercase tracking-wider relative overflow-hidden';
  
  const variantStyles = {
    primary: 'gradient-purple text-white border-2 border-transparent shadow-[0_0_30px_rgba(138,92,246,0.5),inset_0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-0.5 hover:shadow-[0_0_50px_rgba(138,92,246,0.8),inset_0_0_30px_rgba(255,255,255,0.2),0_10px_40px_rgba(138,92,246,0.4)]',
    secondary: 'bg-[rgba(15,15,18,0.8)] text-white border-2 border-[rgba(138,92,246,0.3)] backdrop-blur-[10px] hover:bg-[rgba(138,92,246,0.15)] hover:border-[#8a5cf6] hover:shadow-[0_0_30px_rgba(138,92,246,0.4),inset_0_0_20px_rgba(138,92,246,0.1)] hover:-translate-y-0.5',
    outline: 'bg-transparent text-white border-2 border-[rgba(138,92,246,0.5)] hover:border-[#8a5cf6] hover:shadow-[0_0_40px_rgba(138,92,246,0.6),inset_0_0_30px_rgba(138,92,246,0.2)] hover:bg-[rgba(138,92,246,0.1)]',
    ghost: 'bg-transparent text-[#8a5cf6] border-2 border-transparent hover:bg-[rgba(138,92,246,0.1)] hover:shadow-[0_0_30px_rgba(138,92,246,0.3)] hover:text-[#a78bfa]',
  };

  const sizeStyles = {
    sm: 'px-5 py-2.5 text-xs',
    md: 'px-7 py-3.5 text-sm',
    lg: 'px-9 py-4.5 text-base',
  };

  const iconStyles = icon ? 'w-12 h-12 p-0 flex items-center justify-center rounded-xl' : '';

  return (
    <button
      className={`
        ${baseClasses}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${iconStyles}
        ${className}
      `}
      {...props}
    >
      <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/30 -translate-x-1/2 -translate-y-1/2 transition-all duration-600 hover:w-[300px] hover:h-[300px]"></span>
      <span className="relative z-10">{children}</span>
    </button>
  );
};
