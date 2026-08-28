import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: boolean;
  children: ReactNode;
}

/* « secondary » et « outline » se rejoignent dans le thème pro : la doctrine
   ne connaît qu'un bouton plein et un bouton à filet. On garde les deux noms
   pour ne pas casser les appels existants. */
const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-outline',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
};

const sizeClasses = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon = false,
  className = '',
  ...props
}: ButtonProps) => {
  const iconClasses = icon ? 'w-11 h-11 p-0' : '';

  return (
    <button
      className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${iconClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};
