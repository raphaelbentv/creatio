interface GaugeProps {
  value: number;
  label?: string;
  size?: number;
}

/* Anneau de progression.
   Le libellé est posé SOUS l'anneau, jamais dedans : à 88px de diamètre
   extérieur, le disque intérieur fait 74px et n'accueille pas deux lignes
   (contrainte relevée sur les maquettes d'Arrow). */
export const Gauge = ({ value, label, size = 88 }: GaugeProps) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(value, 0), 100);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label={label ? `${label} : ${clamped} %` : `${clamped} %`}
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--surface-soft)"
          strokeWidth="11"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={`${(circumference * clamped) / 100} ${circumference}`}
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="56"
          textAnchor="middle"
          className="tabular"
          style={{
            font: '700 24px var(--sans)',
            fill: 'var(--ink)',
          }}
        >
          {clamped}%
        </text>
      </svg>
      {label && <div className="t-caption text-center">{label}</div>}
    </div>
  );
};
