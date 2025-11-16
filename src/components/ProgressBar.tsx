interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

export const ProgressBar = ({ value, max = 100, className = '' }: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={`w-full h-2.5 bg-[#0f0f12] rounded-full overflow-hidden mt-4 border border-white/4 ${className}`}>
      <div
        className="h-full gradient-purple rounded-full transition-all duration-600 relative overflow-hidden"
        style={{ width: `${percentage}%` }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white/15 to-transparent shimmer"></div>
      </div>
    </div>
  );
};

