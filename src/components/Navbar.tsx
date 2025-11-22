import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';
import { EchantillonModal } from './EchantillonModal';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isEchantillonModalOpen, setIsEchantillonModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Accueil', anchor: null },
    { path: '/', label: 'Services', anchor: '#services' },
    { path: '/', label: 'Avantages', anchor: '#avantages' },
    { path: '/', label: 'FAQ', anchor: '#faq' },
    { path: '/contact', label: 'Contact', anchor: null },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 h-20 z-[1000] px-4 sm:px-6 md:px-10 flex items-center justify-between backdrop-blur-[20px] backdrop-saturate-[180%] transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(9,9,11,0.95)] border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
            : 'bg-[rgba(9,9,11,0.85)] border-b border-transparent'
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(138,92,246,0.5)] via-[rgba(99,102,241,0.8)] via-[rgba(138,92,246,0.5)] to-transparent nav-glow"></div>

        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0"
        >
          <img
            src="/creatio-logo.png"
            alt="Creatio"
            className="h-10 sm:h-12 md:h-14 w-auto"
          />
          <span className="text-lg sm:text-xl md:text-[28px] font-black gradient-purple-text tracking-tight uppercase whitespace-nowrap">
            Creatio
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
          {navLinks.map(link => {
            const href = link.anchor ? `${link.path}${link.anchor}` : link.path;
            return (
              <a
                key={link.path + link.anchor}
                href={href}
                className={`px-3 xl:px-5 py-2.5 text-white no-underline text-xs xl:text-sm font-bold rounded-lg transition-all duration-500 border relative overflow-hidden uppercase tracking-wider group whitespace-nowrap ${
                  location.pathname === link.path && !link.anchor
                    ? 'border-[#8a5cf6] shadow-[0_0_40px_rgba(138,92,246,0.8),inset_0_0_30px_rgba(138,92,246,0.15)]'
                    : 'border-transparent'
                } hover:border-[#8a5cf6] hover:shadow-[0_0_50px_rgba(138,92,246,1),0_0_100px_rgba(99,102,241,0.6),inset_0_0_40px_rgba(138,92,246,0.2)] hover:scale-[1.05] hover:-translate-y-0.5`}
              >
                {/* Fond avec gradient animé très assombri (noir-violet) */}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[rgba(0,0,0,0.85)] via-[rgba(138,92,246,0.25)] via-[rgba(99,102,241,0.3)] to-[rgba(0,0,0,0.85)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-[rgba(138,92,246,0.15)] via-[rgba(0,0,0,0.9)] to-[rgba(99,102,241,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></span>
                <span className="absolute inset-0 rounded-lg bg-[rgba(0,0,0,0.75)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                <span className="absolute inset-0 rounded-lg bg-[rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-400"></span>

                {/* Scan lines multiples animées */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute top-0 left-[-100%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#8a5cf6] via-[#a78bfa] to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out"></span>
                  <span className="absolute top-1/3 left-[100%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#6366f1] via-[#8a5cf6] to-transparent group-hover:left-[-100%] transition-all duration-1200 ease-in-out delay-100"></span>
                  <span className="absolute bottom-0 left-[-100%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#a78bfa] via-[#6366f1] to-transparent group-hover:left-[100%] transition-all duration-1000 ease-in-out delay-200"></span>
                </span>

                {/* Bordures animées avec gradient */}
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-[#8a5cf6] via-[#6366f1] via-[#a78bfa] to-[#8a5cf6] bg-[length:200%_100%] animate-[gradientShift_3s_ease_infinite] -z-10 blur-[1px]"></span>
                  <span className="absolute inset-[1px] rounded-lg bg-[#0a0a0f]"></span>
                </span>

                {/* Particules d'énergie qui émergent */}
                <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-[#8a5cf6] opacity-0 group-hover:w-[300px] group-hover:h-[300px] group-hover:opacity-30 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 transition-all duration-1000 ease-out blur-2xl"></span>
                <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-[#6366f1] opacity-0 group-hover:w-[200px] group-hover:h-[200px] group-hover:opacity-40 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 transition-all duration-800 ease-out delay-100 blur-xl"></span>
                <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-[#a78bfa] opacity-0 group-hover:w-[150px] group-hover:h-[150px] group-hover:opacity-50 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 transition-all duration-600 ease-out delay-200 blur-lg"></span>

                {/* Points lumineux aux coins */}
                <span className="absolute top-0 left-0 w-2 h-2 bg-[#8a5cf6] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_rgba(138,92,246,1)]"></span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-[#6366f1] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_rgba(99,102,241,1)]"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 bg-[#a78bfa] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_rgba(167,139,250,1)]"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#8a5cf6] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_rgba(138,92,246,1)]"></span>

                {/* Effet de distorsion/hologramme subtil */}
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <span className="absolute inset-0 rounded-lg bg-gradient-to-br from-[rgba(138,92,246,0.1)] to-transparent mix-blend-screen"></span>
                </span>

                {/* Texte avec effet de glow et animation - devient noir au survol */}
                <span className="relative z-10 text-white group-hover:text-black transition-all duration-500 group-hover:drop-shadow-[0_0_10px_rgba(138,92,246,0.8),0_0_20px_rgba(99,102,241,0.6)] group-hover:tracking-[0.15em] group-hover:font-extrabold">
                  {link.label}
                </span>

                {/* Lueur pulsante autour du texte */}
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_center,rgba(138,92,246,0.3),transparent_70%)] animate-pulse"></span>
                </span>
              </a>
            );
          })}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEchantillonModalOpen(true)}
            className="hidden xl:flex"
          >
            Échantillon
          </Button>
          <Link to="/devis">
            <Button variant="primary" size="sm">
              Créer un devis
            </Button>
          </Link>
        </div>

        <button
          className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-all duration-300 flex-shrink-0"
          onClick={toggleMobileMenu}
        >
          <span
            className={`w-[22px] h-0.5 bg-[#8a5cf6] rounded-sm transition-all duration-300 shadow-[0_0_10px_rgba(138,92,246,0.8)] ${mobileMenuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''}`}
          ></span>
          <span
            className={`w-[22px] h-0.5 bg-[#8a5cf6] rounded-sm transition-all duration-300 shadow-[0_0_10px_rgba(138,92,246,0.8)] ${mobileMenuOpen ? 'opacity-0' : ''}`}
          ></span>
          <span
            className={`w-[22px] h-0.5 bg-[#8a5cf6] rounded-sm transition-all duration-300 shadow-[0_0_10px_rgba(138,92,246,0.8)] ${mobileMenuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''}`}
          ></span>
        </button>
      </nav>

      <div
        className={`fixed top-20 left-0 right-0 z-[1001] bg-[rgba(9,9,11,0.98)] border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8)] p-4 sm:p-5 flex-col gap-3 backdrop-blur-[20px] backdrop-saturate-[180%] transition-all duration-400 lg:hidden overflow-y-auto ${
          mobileMenuOpen
            ? 'flex max-h-[calc(100vh-5rem)] opacity-100'
            : 'hidden max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {navLinks.map(link => {
          const href = link.anchor ? `${link.path}${link.anchor}` : link.path;
          return (
            <a
              key={link.path + link.anchor}
              href={href}
              className="px-4 sm:px-5 py-3 text-white no-underline text-sm font-bold rounded-lg transition-all duration-500 border border-transparent hover:border-[#8a5cf6] hover:shadow-[0_0_30px_rgba(138,92,246,0.6)] hover:bg-[rgba(138,92,246,0.1)] relative overflow-hidden group uppercase tracking-wider flex-shrink-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[rgba(138,92,246,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="absolute top-0 left-[-100%] w-full h-[1px] bg-gradient-to-r from-transparent via-[#8a5cf6] to-transparent group-hover:left-[100%] transition-all duration-700"></span>
              <span className="relative z-10 group-hover:text-[#a78bfa] group-hover:drop-shadow-[0_0_10px_rgba(138,92,246,0.8)] transition-all duration-500">
                {link.label}
              </span>
            </a>
          );
        })}
        <button
          onClick={() => {
            setMobileMenuOpen(false);
            setIsEchantillonModalOpen(true);
          }}
          className="px-5 py-3 text-white no-underline text-sm font-bold rounded-lg transition-all duration-500 border border-[rgba(138,92,246,0.3)] hover:border-[#8a5cf6] hover:shadow-[0_0_30px_rgba(138,92,246,0.6)] hover:bg-[rgba(138,92,246,0.1)] relative overflow-hidden group uppercase tracking-wider flex-shrink-0 w-full text-center"
        >
          <span className="relative z-10 group-hover:text-[#a78bfa] group-hover:drop-shadow-[0_0_10px_rgba(138,92,246,0.8)] transition-all duration-500">
            Demander un échantillon
          </span>
        </button>
        <Link
          to="/devis"
          onClick={() => setMobileMenuOpen(false)}
          className="flex-shrink-0"
        >
          <Button variant="primary" size="sm" className="w-full">
            Créer un devis
          </Button>
        </Link>
      </div>

      {/* Modal d'échantillon */}
      <EchantillonModal
        isOpen={isEchantillonModalOpen}
        onClose={() => setIsEchantillonModalOpen(false)}
      />
    </>
  );
};
