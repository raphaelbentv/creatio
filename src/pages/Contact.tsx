import { useState } from 'react';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Link } from 'react-router-dom';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    subject: 'demande-info',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Email',
      content: 'contact@creatio.paris',
      link: 'mailto:contact@creatio.paris',
      description: 'Envoyez-nous un email à tout moment',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Téléphone',
      content: '+33 1 XX XX XX XX',
      link: 'tel:+331XXXXXXXXX',
      description: 'Appelez-nous du lundi au vendredi',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Adresse',
      content: 'Paris, France',
      link: '#',
      description: 'Notre siège social',
    },
  ];

  const quickActions = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Réponse rapide',
      description: 'Nous répondons sous 24-48h ouvrées',
      badge: '⚡ 24-48h',
      action: null,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Rendez-vous téléphonique',
      description: 'Programmez un appel avec notre équipe',
      badge: '📅 Disponible',
      action: 'Programmer un appel',
      link: '#',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Calcul de budget',
      description: 'Estimez le coût en temps réel',
      badge: '💰 Gratuit',
      action: 'Calculer le budget',
      link: '/devis',
    },
  ];

  return (
    <div className="pt-[120px] pb-10 px-5 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Contactez-nous</h1>
          <p className="text-xl text-[#6b6b7a] mb-8 max-w-3xl mx-auto">
            Une question ? Un projet ? N'hésitez pas à nous contacter, nous vous répondrons dans
            les plus brefs délais.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{info.icon}</div>
              <h3 className="service-title">{info.title}</h3>
              <p className="service-description mb-4">{info.description}</p>
              <a
                href={info.link}
                className="text-[#8a5cf6] hover:text-[#a78bfa] transition-colors font-semibold"
              >
                {info.content}
              </a>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="service-card">
              <h3 className="service-title mb-6">Envoyez-nous un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
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
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
                      placeholder="06 XX XX XX XX"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organization"
                      className="block text-sm font-medium text-white/80 mb-2"
                    >
                      Établissement
                    </label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors"
                      placeholder="Votre établissement"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#8a5cf6] transition-colors"
                  >
                    <option value="demande-info">Demande d'information</option>
                    <option value="devis">Demande de devis</option>
                    <option value="partenariat">Partenariat</option>
                    <option value="support">Support technique</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6] transition-colors resize-vertical"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="space-y-6">
            {quickActions.map((action, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">
                  <span className="feature-icon">{action.icon}</span>
                  {action.title}
                </h3>
                <Badge className="mb-3">{action.badge}</Badge>
                <p className="feature-description mb-4">{action.description}</p>
                {action.action && (
                  <Link to={action.link || '#'}>
                    <Button variant="outline" size="sm" className="w-full">
                      {action.action}
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
