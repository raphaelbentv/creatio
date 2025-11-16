export const GraphLine = () => {
  return (
    <div className="relative h-[90px] mt-6">
      <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path
          d="M 0 60 Q 50 40, 100 35 T 200 20"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

