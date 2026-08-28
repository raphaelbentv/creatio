/** @type {import('tailwindcss').Config} */

/* Les utilitaires Tailwind consomment les MÊMES jetons que les classes de
   composants d'index.css. Aucune couleur n'est écrite en dur ici : changer
   d'accent ou de peau reste une affaire de variables CSS, pas de rebuild.

   Les jetons sont exposés en `var(--x)` et non en triplets RGB : le site
   n'a pas besoin des modificateurs d'opacité de Tailwind sur l'accent, et
   --brand-rgb couvre les rares rgba() nécessaires. */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-soft': 'var(--surface-soft)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        brand: 'var(--brand)',
        'brand-2': 'var(--brand-2)',
        'brand-3': 'var(--brand-3)',
        'brand-soft': 'var(--brand-soft)',
        'brand-ink': 'var(--brand-ink)',
        'on-brand': 'var(--on-brand)',
        'dark-bg': 'var(--dark-bg)',
        'dark-ink': 'var(--dark-ink)',
        'dark-ink-2': 'var(--dark-ink-2)',
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        warning: 'var(--warning)',
        'warning-bg': 'var(--warning-bg)',
        danger: 'var(--danger)',
        'danger-bg': 'var(--danger-bg)',
      },
      fontFamily: {
        sans: 'var(--sans)',
        mono: 'var(--mono)',
      },
      /* Six tailles, comme la doctrine — plus « hero », réservé au H1 de
         la page d'accueil. */
      fontSize: {
        caption: ['var(--type-caption)', { lineHeight: '1.4' }],
        meta: ['var(--type-meta)', { lineHeight: '1.5' }],
        label: ['var(--type-label)', { lineHeight: '1.45' }],
        body: ['var(--type-body)', { lineHeight: '1.55' }],
        section: ['var(--type-section)', { lineHeight: '1.25' }],
        page: ['var(--type-page)', { lineHeight: '1.15' }],
        hero: ['var(--type-hero)', { lineHeight: '1.05' }],
      },
      /* Pas d'échelle d'espacement maison : la grille 8 / 16 / 24 / 32 de
         la doctrine existe déjà dans Tailwind sous p-2 / p-4 / p-6 / p-8.
         Redéfinir 1..4 renommerait silencieusement tout le code existant
         (p-4 passerait de 16 à 32px). La discipline se tient au moment
         d'écrire les classes, pas dans la config. */
      borderRadius: {
        DEFAULT: 'var(--radius)',
        tile: 'var(--radius-tile)',
      },
      boxShadow: {
        /* Ombre unique de la doctrine. `shadow-none` reste disponible ;
           il n'y a délibérément pas de second niveau. */
        DEFAULT: 'var(--shadow)',
      },
    },
  },
  plugins: [],
};
