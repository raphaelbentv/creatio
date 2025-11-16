interface GaugeProps {
  value: number;
  label?: string;
}

export const Gauge = ({ value, label }: GaugeProps) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative w-40 h-40">
        <div 
          className="absolute w-full h-full rounded-full"
          style={{
            background: 'conic-gradient(from 180deg, #8a5cf6 0deg, #6366f1 60deg, #4f46e5 120deg, #1a1a1f 120deg, #0f0f12 360deg)',
            mask: 'radial-gradient(circle, transparent 58%, black 58%)',
            WebkitMask: 'radial-gradient(circle, transparent 58%, black 58%)',
          }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full bg-gradient-to-br from-[#18181b] to-[#0f0f12]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[42px] font-extrabold text-white z-10 tracking-tight">
          {value}%
        </div>
      </div>
      {label && <div className="text-[#71717a] text-[13px] font-medium">{label}</div>}
    </div>
  );
};

