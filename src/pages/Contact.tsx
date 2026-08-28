import { useState } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Button } from '@/components/Button';
import { Icon, IconName } from '@/components/Icon';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  message: '',
  subject: 'demande-info',
};

/* Les cartes de contact sont de vrais liens, plus des <div onClick> : un
   lecteur d'écran et le clic-milieu doivent y accéder comme partout ailleurs.
   L'adresse n'en est pas un — elle ne mène nulle part. */
const contactInfo: {
  icon: IconName;
  title: string;
  content: string;
  href?: string;
  description: string;
}[] = [
  {
    icon: 'document',
    title: 'E-mail',
    content: 'contact@creatio.paris',
    href: 'mailto:contact@creatio.paris',
    description: 'Écrivez-nous à tout moment.',
  },
  {
    icon: 'bolt',
    title: 'Téléphone',
    content: '+33 6 76 11 39 47',
    href: 'tel:+33676113947',
    description: 'Du lundi au vendredi, 9 h – 18 h.',
  },
  {
    icon: 'grid',
    title: 'Adresse',
    content: '60 rue François 1er, 75008 Paris',
    description: 'Notre siège social.',
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

      if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS non configuré - Mode simulation activé');
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Message de contact soumis (simulation):', formData);
      } else {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Non renseigné',
          organization: formData.organization || 'Non renseigné',
          subject: formData.subject,
          message: formData.message,
          to_email: 'contact@creatio.paris',
        };

        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setFormData(emptyForm);
      }, 3000);
    } catch (err) {
      setIsSubmitting(false);
      setError(
        "L'envoi a échoué. Vérifiez votre connexion, puis réessayez — ou écrivez directement à contact@creatio.paris."
      );
      console.error("Erreur lors de l'envoi du formulaire:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="shell py-12">
      <header className="max-w-[62ch]">
        <span className="t-eyebrow">Nous joindre</span>
        <h1 className="t-page mt-3">Contactez-nous</h1>
        <p className="t-body mt-3">
          Une question, un projet ? Écrivez-nous : nous répondons sous 24 à 48 h
          ouvrées.
        </p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {contactInfo.map(info => {
          const body = (
            <>
              <span className="w-10 h-10 rounded bg-brand-soft text-brand-ink flex items-center justify-center">
                <Icon name={info.icon} />
              </span>
              <h2 className="t-label">{info.title}</h2>
              <p className="t-meta">{info.description}</p>
              <span
                className={
                  info.href
                    ? 'text-label font-medium text-brand-ink'
                    : 't-label'
                }
              >
                {info.content}
              </span>
            </>
          );

          return info.href ? (
            <a
              key={info.title}
              href={info.href}
              className="surface p-6 flex flex-col gap-3 items-start hover:border-brand transition-colors"
            >
              {body}
            </a>
          ) : (
            <div
              key={info.title}
              className="surface p-6 flex flex-col gap-3 items-start"
            >
              {body}
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <section className="surface p-6 lg:col-span-2">
          <h2 className="t-section">Envoyez-nous un message</h2>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="t-label">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="field"
                  placeholder="Votre nom"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="t-label">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="field"
                  placeholder="vous@etablissement.fr"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="t-label">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="field"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="organization" className="t-label">
                  Établissement
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="field"
                  placeholder="Votre établissement"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="t-label">
                Sujet *
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="field"
              >
                <option value="demande-info">Demande d’information</option>
                <option value="devis">Demande de devis</option>
                <option value="partenariat">Partenariat</option>
                <option value="support">Support technique</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="t-label">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="field resize-y"
                placeholder="Décrivez votre projet ou votre demande…"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="text-meta rounded border p-3"
                style={{
                  background: 'var(--danger-bg)',
                  borderColor: 'var(--danger)',
                  color: 'var(--danger)',
                }}
              >
                {error}
              </p>
            )}

            {isSubmitted && (
              <p
                role="status"
                className="text-meta rounded border p-3"
                style={{
                  background: 'var(--success-bg)',
                  borderColor: 'var(--success)',
                  color: 'var(--success)',
                }}
              >
                Message envoyé. Nous revenons vers vous sous 24 à 48 h ouvrées.
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours…' : 'Envoyer le message'}
            </Button>
          </form>
        </section>

        <aside className="flex flex-col gap-4">
          <section className="surface p-6 flex flex-col gap-3 items-start">
            <span className="badge">24 – 48 h</span>
            <h2 className="t-label">Réponse rapide</h2>
            <p className="t-meta">
              Nous répondons à toute demande sous 24 à 48 h ouvrées.
            </p>
          </section>

          <section className="surface p-6 flex flex-col gap-3 items-start">
            <span className="badge">Sans rendez-vous</span>
            <h2 className="t-label">Échange téléphonique</h2>
            <p className="t-meta">
              Appelez-nous directement pour cadrer votre projet en quelques
              minutes.
            </p>
            <a href="tel:+33676113947" className="btn btn-outline btn-sm">
              +33 6 76 11 39 47
            </a>
          </section>

          <section className="surface p-6 flex flex-col gap-3 items-start">
            <span className="badge">Gratuit</span>
            <h2 className="t-label">Estimation de budget</h2>
            <p className="t-meta">
              Volume, modules, formats : une fourchette chiffrée en deux
              minutes.
            </p>
            <Link to="/devis" className="btn btn-outline btn-sm">
              Calculer le devis
            </Link>
          </section>
        </aside>
      </div>
    </div>
  );
};
