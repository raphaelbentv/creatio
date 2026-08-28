/* Aplat plutôt que dégradé : la doctrine du thème pro conserve la forme
   `gradient` quand elle est imposée par une API, mais jamais deux bornes
   différentes. Ici rien ne l'impose, donc un trait à l'accent suffit. */
export const GraphLine = () => {
  return (
    <div className="relative h-[90px]">
      <svg
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        className="w-full h-full"
        aria-hidden="true"
      >
        <path
          d="M 0 60 Q 50 40, 100 35 T 200 20"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};
