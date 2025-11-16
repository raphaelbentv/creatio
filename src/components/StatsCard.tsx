interface StatsCardProps {
  value: string | number;
  label: string;
}

export const StatsCard = ({ value, label }: StatsCardProps) => {
  return (
    <div>
      <div className="text-[56px] font-black mb-3 text-white tracking-tight leading-none">
        {value}
      </div>
      <div className="text-[#71717a] text-[13px] font-medium capitalize">{label}</div>
    </div>
  );
};

