import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Modal } from './Modal';
import { Button } from './Button';

interface EchantillonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EchantillonModal = ({ isOpen, onClose }: EchantillonModalProps) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    organisation: '',
    fonction: '',
    domaine: '',
    nombreEtudiants: '',
    nombreHeures: '',
    formatSouhaite: 'ppt',
    besoinsSpecifiques: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Configuration EmailJS - À configurer avec vos clés
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

      // Si les clés ne sont pas configurées, on utilise le mode simulation
      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS non configuré - Mode simulation activé');
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log('Demande d\'échantillon soumise (simulation):', formData);
      } else {
        // Envoi réel via EmailJS
        const templateParams = {
          from_name: `${formData.prenom} ${formData.nom}`,
          from_email: formData.email,
          telephone: formData.telephone || 'Non renseigné',
          organisation: formData.organisation,
          fonction: formData.fonction || 'Non renseigné',
          domaine: formData.domaine,
          nombre_etudiants: formData.nombreEtudiants || 'Non renseigné',
          nombre_heures: formData.nombreHeures,
          format_souhaite: formData.formatSouhaite,
          besoins_specifiques: formData.besoinsSpecifiques || 'Aucun besoin spécifique',
          to_email: 'contact@creatio.paris', // Email de destination
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Fermer le modal après 2 secondes
      setTimeout(() => {
        setIsSubmitted(false);
        onClose();
        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          organisation: '',
          fonction: '',
          domaine: '',
          nombreEtudiants: '',
          nombreHeures: '',
          formatSouhaite: 'ppt',
          besoinsSpecifiques: '',
        });
      }, 2000);
    } catch (err) {
      console.error('Erreur lors de l\'envoi:', err);
      setError('Une erreur est survenue lors de l\'envoi. Veuillez réessayer ou nous contacter directement.');
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <div className="text-center py-8">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#8a5cf6] to-[#6366f1] flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">Demande envoyée !</h3>
          <p className="text-[#71717a]">
            Nous vous enverrons un échantillon personnalisé dans les plus brefs délais.
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Demander un échantillon" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-[rgba(138,92,246,0.05)] border border-[rgba(138,92,246,0.2)] rounded-xl p-4 mb-6">
          <p className="text-sm text-white/80 leading-relaxed">
            <span className="text-[#8a5cf6] font-bold">Gratuit et sans engagement</span> - 
            Recevez un extrait de cours personnalisé selon vos besoins. 
            Indiquez-nous quelques détails et nous vous préparerons un échantillon adapté à votre contexte.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nom" className="block text-sm font-semibold text-white/90 mb-2">
              Nom *
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              required
              value={formData.nom}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
              placeholder="Dupont"
            />
          </div>

          <div>
            <label htmlFor="prenom" className="block text-sm font-semibold text-white/90 mb-2">
              Prénom *
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              required
              value={formData.prenom}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
              placeholder="Jean"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
              placeholder="jean.dupont@exemple.fr"
            />
          </div>

          <div>
            <label htmlFor="telephone" className="block text-sm font-semibold text-white/90 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
              placeholder="06 12 34 56 78"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="organisation" className="block text-sm font-semibold text-white/90 mb-2">
              Organisation *
            </label>
            <input
              type="text"
              id="organisation"
              name="organisation"
              required
              value={formData.organisation}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
              placeholder="Ex: École de commerce, Université Paris, Centre de formation professionnelle..."
            />
          </div>

          <div>
            <label htmlFor="fonction" className="block text-sm font-semibold text-white/90 mb-2">
              Fonction
            </label>
            <input
              type="text"
              id="fonction"
              name="fonction"
              value={formData.fonction}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
              placeholder="Ex: Formateur en marketing, Directeur pédagogique, Responsable formation..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="domaine" className="block text-sm font-semibold text-white/90 mb-2">
              Domaine d'enseignement *
            </label>
            <input
              type="text"
              id="domaine"
              name="domaine"
              required
              value={formData.domaine}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
              placeholder="Ex: Marketing digital, Management d'équipe, Développement web..."
            />
          </div>

          <div>
            <label htmlFor="nombreEtudiants" className="block text-sm font-semibold text-white/90 mb-2">
              Nombre d'étudiants (approximatif)
            </label>
            <input
              type="text"
              id="nombreEtudiants"
              name="nombreEtudiants"
              value={formData.nombreEtudiants}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
              placeholder="Ex: 30 étudiants par promotion, 150 au total..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="nombreHeures" className="block text-sm font-semibold text-white/90 mb-2">
            Nombre d'heures à couvrir par l'échantillon *
          </label>
          <input
            type="text"
            id="nombreHeures"
            name="nombreHeures"
            required
            value={formData.nombreHeures}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
            placeholder="Ex: 2h de cours sur l'introduction au marketing, 1h sur les bases du management..."
          />
        </div>

        <div>
          <label htmlFor="formatSouhaite" className="block text-sm font-semibold text-white/90 mb-2">
            Format souhaité *
          </label>
          <select
            id="formatSouhaite"
            name="formatSouhaite"
            required
            value={formData.formatSouhaite}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8a5cf6] transition-colors"
          >
            <option value="ppt">PowerPoint (PPT)</option>
            <option value="pdf">PDF</option>
            <option value="les-deux">Les deux formats</option>
          </select>
        </div>

        <div>
          <label htmlFor="besoinsSpecifiques" className="block text-sm font-semibold text-white/90 mb-2">
            Besoins spécifiques ou contexte
          </label>
          <textarea
            id="besoinsSpecifiques"
            name="besoinsSpecifiques"
            rows={4}
            value={formData.besoinsSpecifiques}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors resize-vertical"
            placeholder="Ex: Cours niveau débutant, focus sur les cas pratiques, intégration d'exemples concrets, approche interactive..."
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer la demande'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Annuler
          </Button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <p className="text-xs text-[#71717a] text-center pt-2">
          En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe.
          Vos données sont traitées de manière confidentielle.
        </p>
      </form>
    </Modal>
  );
};

