export const Footer = () => {
  return (
    <footer className="py-[60px] px-10 border-t border-white/6 mt-[100px] text-center max-md:px-5">
      <div className="text-[20px] font-black gradient-purple-text mb-4">CREATIO</div>
      <p className="text-[#71717a] text-sm">© {new Date().getFullYear()} Creatio.paris - Tous droits réservés</p>
      <p className="text-[#71717a] text-sm mt-2">Des cours informatifs, pas rébarbatifs.</p>
    </footer>
  );
};

