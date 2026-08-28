import { ReactNode } from 'react';

interface Icon3DProps {
  children: ReactNode;
  className?: string;
}

/* Le nom reste « Icon3D » pour ne pas casser ses appels, mais il n'y a plus
   rien de 3D : la doctrine du thème pro exclut les dégradés et les
   perspectives. C'est un porte-icône en lavis d'accent. */
export const Icon3D = ({ children, className = '' }: Icon3DProps) => {
  return (
    <div
      className={`w-12 h-12 rounded bg-brand-soft text-brand-ink flex items-center justify-center ${className}`.trim()}
    >
      {children}
    </div>
  );
};
