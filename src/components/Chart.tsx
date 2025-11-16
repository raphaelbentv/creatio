interface ChartProps {
  data: number[];
  className?: string;
}

export const Chart = ({ data, className = '' }: ChartProps) => {
  const maxValue = Math.max(...data);

  return (
    <div className={`flex items-end gap-2.5 h-[140px] mb-5 px-1 ${className}`}>
      {data.map((value, index) => {
        const height = (value / maxValue) * 100;
        return (
          <div
            key={index}
            className="flex-1 gradient-purple rounded-lg transition-all duration-400 cursor-pointer relative hover:opacity-100 hover:scale-y-[1.08] hover:scale-x-[1.1] hover:brightness-110"
            style={{ height: `${height}%` }}
          >
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-transparent to-white/10 rounded-lg"></div>
          </div>
        );
      })}
    </div>
  );
};

