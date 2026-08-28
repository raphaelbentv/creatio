import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Icon, IconName } from '@/components/Icon';

/* Les émojis qui servaient de puces sont remplacés par les icônes du système :
   un émoji se rend différemment selon la plateforme et n'obéit ni à l'accent
   ni à la peau. */
const values: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'clipboard',
    title: 'Excellence pédagogique',
    description:
      'Nous créons des supports de qualité qui respectent les standards pédagogiques les plus élevés.',
  },
  {
    icon: 'document',
    title: 'Partenariat durable',
    description:
      'Nous construisons des relations de confiance avec nos clients pour un accompagnement sur le long terme.',
  },
  {
    icon: 'sparkle',
    title: 'Innovation constante',
    description:
      'Nous intégrons les dernières évolutions technologiques et pédagogiques dans nos créations.',
  },
  {
    icon: 'check-circle',
    title: 'Conformité garantie',
    description:
      'Tous nos supports sont conçus pour répondre aux exigences Qualiopi et aux référentiels en vigueur.',
  },
];

const team = [
  {
    name: 'Équipe pédagogique',
    role: 'Création de contenus',
    description:
      'Experts en pédagogie et en création de supports de formation.',
  },
  {
    name: 'Équipe technique',
    role: 'Développement & design',
    description:
      'Spécialistes en design graphique et en développement de solutions digitales.',
  },
  {
    name: 'Équipe qualité',
    role: 'Conformité & audit',
    description:
      'Garante de la conformité Qualiopi et de la qualité des livrables.',
  },
];

const chiffres = [
  { value: '50+', label: 'Établissements accompagnés' },
  { value: '500+', label: 'Supports créés' },
  { value: '100 %', label: 'Conformité Qualiopi' },
  { value: '24/7', label: 'Support disponible' },
];

const raisons = [
  {
    title: 'Gain de temps significatif',
    description:
      "Libérez vos équipes de la production de contenus pour qu'elles se concentrent sur l'accompagnement pédagogique et la coordination des formations.",
  },
  {
    title: 'Qualité professionnelle',
    description:
      "Des supports créés par des experts pédagogiques, conformes aux référentiels et prêts à l'emploi.",
  },
  {
    title: 'Rentabilité optimale',
    description:
      'Des supports réutilisables sur plusieurs années, facilement actualisables, pour un retour sur investissement optimal.',
  },
  {
    title: 'Accompagnement personnalisé',
    description:
      'Un suivi dédié et des mises à jour annuelles pour garantir la pertinence continue de vos supports pédagogiques.',
  },
];

export const About = () => {
  return (
    <div className="shell py-12">
      <header className="max-w-[62ch]">
        <span className="t-eyebrow">Qui nous sommes</span>
        <h1 className="t-page mt-3">À propos de Creatio</h1>
        <p className="t-body mt-3">
          Creatio accompagne les établissements d’enseignement supérieur et les
          CFA dans la création de supports pédagogiques structurés et de
          qualité.
        </p>
      </header>

      <section className="surface mt-8 p-6">
        <h2 className="t-section">Notre mission</h2>
        <div className="mt-4 flex flex-col gap-4 max-w-[68ch]">
          <p className="t-body">
            Creatio s’engage à libérer les établissements de formation de la
            charge de production de contenus pédagogiques, pour qu’ils se
            concentrent sur leur cœur de métier : l’accompagnement et la
            formation des apprenants.
          </p>
          <p className="t-body">
            Nous créons des supports structurés, clairs et directement
            exploitables par les étudiants comme par les intervenants, en
            respectant les indispensables de la formation et en intégrant les
            aspects modernes des différentes disciplines.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="t-section">Nos valeurs</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {values.map(value => (
            <article
              key={value.title}
              className="surface p-6 flex flex-col gap-3"
            >
              <span className="w-10 h-10 rounded bg-brand-soft text-brand-ink flex items-center justify-center">
                <Icon name={value.icon} />
              </span>
              <h3 className="t-label">{value.title}</h3>
              <p className="t-meta">{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface mt-8 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
          {chiffres.map(chiffre => (
            <div key={chiffre.label} className="p-6">
              <div className="text-[34px] font-bold leading-none tracking-tight tabular">
                {chiffre.value}
              </div>
              <div className="t-meta mt-2">{chiffre.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="t-section">Notre organisation</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {team.map(member => (
            <article
              key={member.name}
              className="surface p-6 flex flex-col gap-3 items-start"
            >
              <h3 className="t-label">{member.name}</h3>
              <span className="badge">{member.role}</span>
              <p className="t-meta">{member.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface mt-8 p-6">
        <h2 className="t-section">Pourquoi choisir Creatio ?</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {raisons.map(raison => (
            <div key={raison.title}>
              <h3 className="t-label">{raison.title}</h3>
              <p className="t-meta mt-2 max-w-[52ch]">{raison.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface mt-8 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="t-label">Parlons de votre programme</h2>
          <p className="t-meta max-w-[52ch]">
            Un échange de trente minutes suffit pour savoir si nous sommes le
            bon partenaire.
          </p>
        </div>
        <Link to="/contact">
          <Button variant="primary">Nous contacter</Button>
        </Link>
      </section>
    </div>
  );
};
