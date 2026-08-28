/* Jeu d'icônes du site.
   Dessinées en `currentColor` et jamais en couleur en dur : elles suivent
   l'accent et la peau comme n'importe quelle encre. */

export type IconName =
  | 'programme'
  | 'slides'
  | 'evaluation'
  | 'refresh'
  | 'bolt'
  | 'check-circle'
  | 'clipboard'
  | 'grid'
  | 'sparkle'
  | 'settings'
  | 'document'
  | 'coin';

const paths: Record<IconName, string> = {
  programme: 'M3 4h18v16H3zM7 9h10M7 13h10M7 17h6',
  slides: 'M3 4h18v12H3zM8 20h8M12 16v4',
  evaluation: 'M6 3h9l4 4v14H6zM9 12l2 2 4-4',
  refresh: 'M21 12a9 9 0 1 1-3-6.7M21 4v5h-5',
  bolt: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  'check-circle': 'M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
  clipboard:
    'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4',
  grid: 'M4 4h6v7H4zM14 4h6v7h-6zM4 15h6v5H4zM14 15h6v5h-6z',
  sparkle:
    'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.3 6.9L21 12l-5.7 2.1L13 21l-2.3-6.9L5 12l5.7-2.1L13 3z',
  settings:
    'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2v.1a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-2.9-1.2l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.7 1.7 0 0 0 4.1 15H4a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.2-2.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 11 4.1V4a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 2.9 1.2l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0 1.2 2.9H24',
  document:
    'M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.6a1 1 0 0 1 .7.3l5.4 5.4a1 1 0 0 1 .3.7V19a2 2 0 0 1-2 2z',
  coin: 'M12 8c-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2m0-8c1.1 0 2.1.4 2.6 1M12 8V7m0 1v8m0 0v1m0-1c-1.1 0-2.1-.4-2.6-1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z',
};

export const Icon = ({
  name,
  className = 'w-5 h-5',
}: {
  name: IconName;
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={paths[name]} />
  </svg>
);
