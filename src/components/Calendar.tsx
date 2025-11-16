import { useState } from 'react';

interface CalendarProps {
  compact?: boolean;
}

export const Calendar = ({ compact = false }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(16);
  const today = new Date().getDate();

  const daysOfWeek = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  if (compact) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-5xl font-black w-[90px] h-[90px] rounded-full gradient-purple flex items-center justify-center text-white tracking-tight">
          {today}
        </div>
        <div className="text-white text-[15px] font-bold">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long' })}
        </div>
        <div className="text-[#71717a] text-[13px] font-medium">
          {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-[11px] text-[#71717a] py-2 px-1 font-semibold uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square"></div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`
              aspect-square flex items-center justify-center rounded-[10px] text-sm font-semibold cursor-pointer transition-all duration-300
              bg-[#0f0f12] border border-white/4 text-white
              hover:bg-[rgba(138,92,246,0.2)] hover:scale-105 hover:border-[rgba(138,92,246,0.3)]
              ${selectedDate === day ? 'gradient-purple font-extrabold border-[rgba(138,92,246,0.4)] scale-105' : ''}
              ${day === today ? 'border-2 border-[#8a5cf6]' : ''}
            `}
            onClick={() => setSelectedDate(day)}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
};

