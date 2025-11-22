import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal = ({ isOpen, onClose, children, title, size = 'md' }: ModalProps) => {
  // Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Empêcher le scroll du body quand le modal est ouvert
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"></div>

      {/* Modal Content */}
      <div
        className={`relative z-10 w-full ${sizeClasses[size]} bg-gradient-to-br from-[#0f0f12] via-[#09090b] to-[#0f0f12] rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(138,92,246,0.3)] overflow-hidden transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec bordure violette */}
        <div className="relative border-b border-[#8a5cf6]/30 bg-[rgba(138,92,246,0.05)]">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(138,92,246,0.5)] to-transparent"></div>
          
          {title && (
            <div className="px-6 sm:px-8 py-5 flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-black gradient-purple-text uppercase tracking-tight">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[rgba(138,92,246,0.1)] border border-[rgba(138,92,246,0.3)] text-[#8a5cf6] hover:bg-[rgba(138,92,246,0.2)] hover:border-[#8a5cf6] transition-all duration-300 hover:scale-110"
                aria-label="Fermer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          {!title && (
            <div className="px-6 sm:px-8 py-4 flex justify-end">
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[rgba(138,92,246,0.1)] border border-[rgba(138,92,246,0.3)] text-[#8a5cf6] hover:bg-[rgba(138,92,246,0.2)] hover:border-[#8a5cf6] transition-all duration-300 hover:scale-110"
                aria-label="Fermer"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 sm:py-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};






