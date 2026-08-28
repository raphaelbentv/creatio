interface StatsCardProps {
  value: string | number;
  label: string;
}

export const StatsCard = ({ value, label }: StatsCardProps) => {
  return (
    <div>
      <div className="text-[34px] font-bold leading-none tracking-tight text-ink tabular">
        {value}
      </div>
      <div className="t-meta mt-2">{label}</div>
    </div>
  );
};
