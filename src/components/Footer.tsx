import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Prestations',
    links: [
      { to: '/services', label: 'Nos services' },
      { to: '/avantages', label: 'Les points forts' },
      { to: '/devis', label: 'Simulateur de devis' },
    ],
  },
  {
    title: 'Creatio',
    links: [
      { to: '/a-propos', label: 'À propos' },
      { to: '/blog', label: 'Blog' },
      { to: '/contact', label: 'Contact' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="shell py-12 grid gap-8 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="text-section font-bold tracking-tight text-ink">
            CREAT<span className="text-brand-ink">IO</span>
          </div>
          <p className="t-meta mt-2 max-w-[38ch]">
            Des cours informatifs, pas rébarbatifs. Programmes, slides et
            évaluations prêts à enseigner.
          </p>
        </div>

        {columns.map(column => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="t-caption font-semibold uppercase tracking-wider">
              {column.title}
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {column.links.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-label text-ink-2 hover:text-brand-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="shell py-4 flex flex-wrap gap-x-6 gap-y-1">
          <p className="t-caption">
            © {new Date().getFullYear()} Creatio.paris — Tous droits réservés
          </p>
          <p className="t-caption">Paris, France</p>
        </div>
      </div>
    </footer>
  );
};
