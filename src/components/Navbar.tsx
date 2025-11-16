import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      <nav className={`fixed top-0 left-0 right-0 h-20 z-[1000] px-10 flex items-center justify-between backdrop-blur-[20px] backdrop-saturate-[180%] relative transition-all duration-300 ${
        scrolled 
          ? 'bg-[rgba(9,9,11,0.95)] border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' 
          : 'bg-[rgba(9,9,11,0.85)] border-b border-transparent'
      }`}>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(138,92,246,0.5)] via-[rgba(99,102,241,0.8)] via-[rgba(138,92,246,0.5)] to-transparent nav-glow"></div>
        
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/creatio-logo.png" 
            alt="Creatio" 
            className="h-14 w-auto"
          />
          <span className="text-[28px] font-black gradient-purple-text tracking-tight uppercase">
            Creatio
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => {
            const href = link.anchor ? `${link.path}${link.anchor}` : link.path;
            return (
              <a
                key={link.path + link.anchor}
                href={href}
                className={`px-5 py-2.5 text-white no-underline text-sm font-bold rounded-lg transition-all duration-300 border relative overflow-hidden uppercase tracking-wider group ${
                  location.pathname === link.path && !link.anchor
                    ? 'border-[#8a5cf6] shadow-[0_0_30px_rgba(138,92,246,0.6)]'
                    : 'border-transparent'
                } hover:border-[#8a5cf6] hover:shadow-[0_0_30px_rgba(138,92,246,0.8),inset_0_0_20px_rgba(138,92,246,0.1)]`}
              >
                {/* Effet de scan futuriste */}
                <span className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="absolute top-0 left-[-100%] w-full h-[2px] bg-gradient-to-r from-transparent via-[#8a5cf6] to-transparent group-hover:left-[100%] transition-all duration-700"></span>
                  <span className="absolute bottom-0 left-[100%] w-full h-[2px] bg-gradient-to-r from-transparent via-[#6366f1] to-transparent group-hover:left-[-100%] transition-all duration-700"></span>
                </span>
                
                {/* Effet de glow pulsant */}
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-[rgba(138,92,246,0.1)] via-[rgba(99,102,241,0.2)] to-[rgba(138,92,246,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></span>
                
                {/* Effet de particules/énergie */}
                <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-[#8a5cf6] opacity-0 group-hover:w-[200px] group-hover:h-[200px] group-hover:opacity-20 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 transition-all duration-700 blur-xl"></span>
                
                {/* Texte avec effet de glow */}
                <span className="relative z-10 group-hover:text-[#a78bfa] transition-colors duration-300 group-hover:drop-shadow-[0_0_8px_rgba(138,92,246,0.8)]">{link.label}</span>
              </a>
            );
          })}
          <Link to="/devis">
            <Button variant="primary" size="sm">Créer un devis</Button>
          </Link>
        </div>

        <button
          className="md:hidden w-12 h-12 bg-[rgba(15,15,18,0.8)] border-2 border-[rgba(138,92,246,0.3)] rounded-xl cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-all duration-300 backdrop-blur-[10px] relative overflow-hidden hover:border-[#8a5cf6] hover:shadow-[0_0_30px_rgba(138,92,246,0.5)]"
          onClick={toggleMobileMenu}
        >
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-br from-transparent via-[rgba(138,92,246,0.3)] to-transparent scan-line"></div>
          <span className={`w-[22px] h-0.5 bg-[#8a5cf6] rounded-sm transition-all duration-300 shadow-[0_0_10px_rgba(138,92,246,0.8)] relative z-10 ${mobileMenuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''}`}></span>
          <span className={`w-[22px] h-0.5 bg-[#8a5cf6] rounded-sm transition-all duration-300 shadow-[0_0_10px_rgba(138,92,246,0.8)] relative z-10 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-[22px] h-0.5 bg-[#8a5cf6] rounded-sm transition-all duration-300 shadow-[0_0_10px_rgba(138,92,246,0.8)] relative z-10 ${mobileMenuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''}`}></span>
        </button>
      </nav>

      <div
        className={`fixed top-20 left-0 right-0 bg-[rgba(9,9,11,0.95)] border-b border-transparent p-5 flex-col gap-3 backdrop-blur-[20px] backdrop-saturate-[180%] transition-all duration-400 md:hidden ${
          mobileMenuOpen ? 'flex max-h-[600px]' : 'hidden max-h-0 overflow-hidden'
        }`}
      >
        {navLinks.map((link) => {
          const href = link.anchor ? `${link.path}${link.anchor}` : link.path;
          return (
            <a
              key={link.path + link.anchor}
              href={href}
              className="px-5 py-2.5 text-white no-underline text-sm font-bold rounded-lg transition-all duration-300 border border-transparent hover:border-[rgba(138,92,246,0.5)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </a>
          );
        })}
        <Link to="/devis" onClick={() => setMobileMenuOpen(false)}>
          <Button variant="primary" size="sm" className="w-full">
            Créer un devis
          </Button>
        </Link>
      </div>
    </>
  );
};

