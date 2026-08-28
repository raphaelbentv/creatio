import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { EchantillonModal } from './EchantillonModal';

/* Services et Avantages sont devenus des PAGES le 28/08 : la home est passée
   en grille de tuiles et n'a plus de sections à ancrer. Seule la FAQ reste
   une ancre, elle vit en bas de la page d'accueil. */
const navLinks = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/services', label: 'Services', end: false },
  { to: '/avantages', label: 'Avantages', end: false },
  { to: '/#faq', label: 'FAQ', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

const linkClasses = (active: boolean) =>
  [
    'px-3 py-2 rounded text-label font-medium transition-colors',
    active
      ? 'bg-brand-soft text-brand-ink'
      : 'text-ink-2 hover:text-ink hover:bg-surface-soft',
  ].join(' ');

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEchantillonModalOpen, setIsEchantillonModalOpen] = useState(false);
  const location = useLocation();

  /* La FAQ est une ancre : NavLink ne peut pas décider de son état actif,
     il faut regarder le hash. */
  const isFaqActive = location.pathname === '/' && location.hash === '#faq';

  return (
    <>
      <header className="sticky top-0 z-[1000] bg-surface border-b border-line">
        <nav className="shell h-16 flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="/creatio-logo.png"
              alt=""
              aria-hidden="true"
              className="h-8 w-auto"
            />
            <span className="text-section font-bold tracking-tight text-ink">
              CREAT<span className="text-brand-ink">IO</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link =>
              link.to === '/#faq' ? (
                <a
                  key={link.to}
                  href="/#faq"
                  className={linkClasses(isFaqActive)}
                >
                  {link.label}
                </a>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    linkClasses(isActive && !location.hash)
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          <div className="ml-auto hidden md:flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEchantillonModalOpen(true)}
            >
              Demander un échantillon
            </Button>
            <Link to="/devis">
              <Button variant="primary" size="sm">
                Obtenir un devis
              </Button>
            </Link>
          </div>

          <button
            type="button"
            className="ml-auto lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded border border-line-strong"
            onClick={() => setMobileMenuOpen(open => !open)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <span
              className={`w-5 h-px bg-ink transition-transform ${mobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`w-5 h-px bg-ink transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`w-5 h-px bg-ink transition-transform ${mobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-line bg-surface">
            <div className="shell py-4 flex flex-col gap-1">
              {navLinks.map(link =>
                link.to === '/#faq' ? (
                  <a
                    key={link.to}
                    href="/#faq"
                    className={linkClasses(isFaqActive)}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      linkClasses(isActive && !location.hash)
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                )
              )}
              <div className="flex flex-col gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsEchantillonModalOpen(true);
                  }}
                >
                  Demander un échantillon
                </Button>
                <Link to="/devis" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Obtenir un devis
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <EchantillonModal
        isOpen={isEchantillonModalOpen}
        onClose={() => setIsEchantillonModalOpen(false)}
      />
    </>
  );
};
