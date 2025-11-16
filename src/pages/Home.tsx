import { useState } from 'react';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';

export const Home = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  const services = [
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="48" height="40" rx="4" stroke="#8a5cf6" strokeWidth="2" />
          <path d="M16 22h32M16 30h32M16 38h24" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          <circle cx="48" cy="20" r="8" fill="url(#grad1)" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Création de programmes',
      description:
        'Des programmes qui respectent les indispensables de la formation, tout en intégrant les aspects modernes des différentes disciplines (IA, CRM, etc.).',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="8" width="44" height="32" rx="3" stroke="#8a5cf6" strokeWidth="2" />
          <rect x="14" y="14" width="12" height="8" fill="#6366f1" />
          <rect x="28" y="14" width="22" height="2" fill="#71717a" />
          <rect x="28" y="18" width="18" height="2" fill="#71717a" />
          <rect x="14" y="26" width="36" height="2" fill="#71717a" />
          <rect x="14" y="30" width="30" height="2" fill="#71717a" />
          <path
            d="M20 44l12 8 22-16"
            stroke="url(#grad2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Création de slides',
      description:
        'Des slides denses en contenu de cours, exploitables par les intervenants et les étudiants, en format PPT ou PDF pour s\'adapter à tous les types d\'enseignement.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="8" width="40" height="48" rx="4" stroke="#8a5cf6" strokeWidth="2" />
          <path d="M20 18h24M20 26h24M20 34h24M20 42h16" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
          <circle cx="46" cy="42" r="2" fill="#6366f1" />
          <circle cx="46" cy="34" r="2" fill="#6366f1" />
          <circle cx="46" cy="26" r="2" fill="#8a5cf6" />
          <path
            d="M54 8L58 12L54 16"
            stroke="url(#grad3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: "Création d'évaluations",
      description:
        'Nous créons les évaluations en adéquation avec la matière et les connaissances attendues. Les études de cas et les corrigés sont fournis lors de la livraison.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="32" r="20" stroke="#8a5cf6" strokeWidth="2" />
          <path
            d="M32 16v16l12 6"
            stroke="url(#grad4)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="32" r="3" fill="#6366f1" />
          <path
            d="M48 20a18 18 0 010 24"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M16 20a18 18 0 000 24"
            stroke="#6366f1"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <defs>
            <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
      ),
      title: 'Mise à jour annuelle',
      description:
        'En option, nous proposons des mises à jour annuelles des programmes, en cas de besoins évolutifs ou d\'ajouts nécessaires.',
    },
  ];

  const stats = [
    { value: '100+', label: 'Programmes créés' },
    { value: '500+', label: 'Slides livrées' },
    { value: '95%', label: 'Satisfaction client' },
    { value: '24/7', label: 'Disponibilité cloud' },
  ];

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Gain de temps',
      description:
        'Libérez vos ressources internes de la production de contenus. Creatio prend en charge la création complète de supports pédagogiques détaillés.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Cochez les cases Qualiopi',
      description:
        'Nos supports sont conçus pour répondre naturellement aux exigences du référentiel Qualiopi. Un atout pour vos audits qualité.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Qualité optimale',
      description:
        'Garantissez à vos étudiants un socle clair, complet et réutilisable pour suivre les cours et réviser efficacement tout au long de l\'année.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Mises à jour annuelles',
      description:
        'Nos supports sont révisés annuellement pour intégrer les évolutions des référentiels et des pratiques métiers.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Structuration modulaire',
      description:
        'Chaque module est conçu de façon logique, progressive et modulaire pour une meilleure expérience d\'apprentissage.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Valorisez votre image',
      description:
        'Des supports cohérents, esthétiques et personnalisables renforcent la crédibilité de vos formations.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: 'Base de travail adaptable',
      description:
        'Les supports sont livrés en format PPT et/ou PDF, modifiables selon les besoins de vos équipes.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="#8a5cf6" strokeWidth="2">
          <path
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Garantissez l'homogénéité",
      description:
        'Chaque étudiant bénéficie du même niveau d\'exigence et de clarté, quel que soit le formateur ou le lieu.',
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
      title: 'Rentabilisez sur le long terme',
      description:
        'Les supports sont réutilisables sur plusieurs années et facilement actualisables. Un investissement durable.',
    },
  ];

  const testimonials = [
    {
      quote:
        '« C\'est un budget, mais on y gagne sur tous les plans : moins de bricolage côté intervenants, des contenus solides, et surtout une vraie différence dans la manière dont les étudiants s\'approprient les cours. »',
      author: 'Eric',
      role: 'Responsable pédagogique',
    },
    {
      quote:
        '« On s\'est rendu compte que les étudiants n\'avaient parfois que des bribes de cours ou des notes peu exploitables. Ce format comble vraiment ce manque. »',
      author: 'Corrine',
      role: 'Chargée de coordination',
    },
    {
      quote:
        '« Au départ, on a hésité à externaliser, mais aujourd\'hui, je ne reviendrais pas en arrière. Le niveau des supports a un vrai impact sur la qualité du suivi pédagogique. »',
      author: 'Claire',
      role: 'Directrice de programme',
    },
    {
      quote:
        '« Les supports sont clairs, ça va droit au but. Pas besoin de chercher partout, tout est déjà là. »',
      author: 'Lana',
      role: 'Étudiante en Bachelor Marketing Digital',
    },
  ];

  const faqs = [
    {
      question: 'Quel est le délai de production ?',
      answer:
        'Tout dépend du volume. En moyenne, comptez 1 à 4 semaines pour une production de 100 à 500 slides, selon la complexité du programme et le niveau de détail attendu.',
    },
    {
      question: 'Les supports sont-ils modifiables ?',
      answer:
        'Oui, tous les supports sont livrés en format PowerPoint modifiable. Vous gardez la liberté d\'ajuster, ajouter ou simplifier selon vos préférences.',
    },
    {
      question: 'Faut-il adapter les supports à chaque formateur ?',
      answer:
        'Absolument. Les supports sont conçus pour être directement exploitables, tout en laissant la possibilité à chaque formateur d\'adapter son animation pédagogique.',
    },
    {
      question: 'Les supports répondent-ils aux critères Qualiopi ?',
      answer:
        'Oui. Chaque module est structuré avec des objectifs pédagogiques clairs, une logique de progression, et des contenus exploitables en cas d\'audit.',
    },
    {
      question: 'Peut-on créer un programme entier de zéro ?',
      answer:
        'Oui. Nous pouvons concevoir la structure et le contenu intégral d\'un nouveau programme, sur la base de vos orientations pédagogiques et de vos objectifs institutionnels.',
    },
    {
      question: 'Proposez-vous un échantillon gratuit ?',
      answer:
        'Oui. Nous proposons l\'envoi d\'un extrait gratuit de slides (PDF) pour vous permettre d\'évaluer notre approche et notre rendu.',
    },
    {
      question: 'Comment garantir la mise à jour des contenus ?',
      answer:
        'Nous proposons une actualisation annuelle des contenus livrés, sur demande ou dans le cadre d\'un partenariat régulier.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="relative z-10">
          <Badge className="mb-6">Solutions pédagogiques nouvelle génération</Badge>
          <h1 className="hero-title">
            Vos cours, prêts.
            <br />
            Vos apprenants, engagés.
          </h1>
          <p className="hero-subtitle">
            De la structuration d'un programme à l'élaboration des slides de cours, libérez vos
            ressources internes et garantissez une qualité optimale.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" size="lg">
              Découvrir nos services
            </Button>
            <Button variant="outline" size="lg">
              Demander un échantillon
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" id="services">
        <div className="max-w-[1400px] mx-auto px-10 max-md:px-5">
          <h2 className="section-title">Nos Services</h2>
          <p className="section-subtitle">
            Des solutions complètes pour créer des contenus pédagogiques de qualité professionnelle
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-15">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="max-w-[1400px] mx-auto px-10 max-md:px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="avantages">
        <div className="max-w-[1400px] mx-auto px-10 max-md:px-5">
          <h2 className="section-title">Les Points Forts</h2>
          <p className="section-subtitle">Pourquoi choisir Creatio pour vos supports pédagogiques</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">
                  <span className="feature-icon">{feature.icon}</span>
                  {feature.title}
                </h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="max-w-[1400px] mx-auto px-10 max-md:px-5">
          <h2 className="section-title">Témoignages</h2>
          <p className="section-subtitle">Ce que disent nos clients et utilisateurs</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">{testimonial.author}</div>
                <div className="testimonial-role">{testimonial.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section" id="faq">
        <div className="max-w-[1400px] mx-auto px-10 max-md:px-5">
          <h2 className="section-title">Questions Fréquentes</h2>
          <p className="section-subtitle">Tout ce que vous devez savoir sur nos services</p>

          <div className="max-w-[900px] mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
                  onClick={() => toggleFaq(index)}
                  onMouseEnter={() => setOpenFaqIndex(index)}
                >
                  <div className="faq-question">
                    <span>{faq.question}</span>
                    <svg
                      className={`faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`}
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                  <div className={`faq-answer ${isOpen ? 'faq-answer-open' : ''}`}>
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" id="echantillon">
        <div className="max-w-[1400px] mx-auto px-10 max-md:px-5">
          <div className="cta-section">
            <h2 className="cta-title">Prêt à transformer vos contenus pédagogiques ?</h2>
            <p className="cta-description">
              Demandez un échantillon gratuit et découvrez la qualité de nos supports. Indiquez-nous
              quelques éléments, et nous vous enverrons un extrait adapté à vos besoins.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button variant="primary" size="lg">
                Demander un échantillon
              </Button>
              <Button variant="outline" size="lg">
                Programmer un call
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
