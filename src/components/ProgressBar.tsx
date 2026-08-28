interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

/* `block` explicite sur la barre ET sur son remplissage : sur un élément
   inline, `height` est ignoré et la jauge disparaît sans lever d'erreur. */
export const ProgressBar = ({
  value,
  max = 100,
  className = '',
}: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={`block w-full h-1.5 rounded-full bg-surface-soft border border-line overflow-hidden ${className}`.trim()}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <span
        className="block h-full rounded-full bg-brand"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};
