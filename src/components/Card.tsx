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

export const Card = ({
  children,
  size = 'tiny',
  className = '',
}: CardProps) => {
  return (
    <div className={`tile ${sizeClasses[size]} ${className}`.trim()}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  onMenuClick?: () => void;
  size?: 'small' | 'large';
}

export const CardHeader = ({
  title,
  onMenuClick,
  size = 'small',
}: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className={size === 'large' ? 't-section' : 't-label'}>{title}</h3>
      {onMenuClick && (
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={`Options — ${title}`}
          className="text-ink-3 hover:text-brand-ink transition-colors"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <circle cx="12" cy="5" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="12" cy="19" r="1.6" />
          </svg>
        </button>
      )}
    </div>
  );
};
