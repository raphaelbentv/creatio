interface ChartProps {
  data: number[];
  className?: string;
}

export const Chart = ({ data, className = '' }: ChartProps) => {
  const maxValue = Math.max(...data);

  return (
    <div
      className={`flex items-end gap-2 h-[140px] ${className}`.trim()}
      role="img"
      aria-label={`Série de ${data.length} valeurs, maximum ${maxValue}`}
    >
      {data.map((value, index) => (
        <div
          key={index}
          className="flex-1 rounded-sm bg-brand"
          style={{ height: `${(value / maxValue) * 100}%` }}
        />
      ))}
    </div>
  );
};
