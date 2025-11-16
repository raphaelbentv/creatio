import { Card, CardHeader } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { StatsCard } from '@/components/StatsCard';

export const About = () => {
  const values = [
    {
      icon: '🎯',
      title: 'Excellence pédagogique',
      description:
        'Nous créons des supports de qualité qui respectent les standards pédagogiques les plus élevés.',
    },
    {
      icon: '🤝',
      title: 'Partenariat durable',
      description:
        'Nous construisons des relations de confiance avec nos clients pour un accompagnement sur le long terme.',
    },
    {
      icon: '💡',
      title: 'Innovation constante',
      description:
        'Nous intégrons les dernières évolutions technologiques et pédagogiques dans nos créations.',
    },
    {
      icon: '✅',
      title: 'Conformité garantie',
      description:
        'Tous nos supports sont conçus pour répondre aux exigences Qualiopi et aux référentiels en vigueur.',
    },
  ];

  const team = [
    {
      name: 'Équipe pédagogique',
      role: 'Création de contenus',
      description: 'Experts en pédagogie et en création de supports de formation',
    },
    {
      name: 'Équipe technique',
      role: 'Développement & Design',
      description: 'Spécialistes en design graphique et en développement de solutions digitales',
    },
    {
      name: 'Équipe qualité',
      role: 'Conformité & Audit',
      description: 'Garant de la conformité Qualiopi et de la qualité des livrables',
    },
  ];

  return (
    <div className="pt-[120px] pb-10 px-5 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">À propos de Creatio</h1>
          <p className="text-xl text-[#6b6b7a] mb-8 max-w-3xl mx-auto">
            Creatio accompagne les établissements d'enseignement supérieur et les CFA dans la
            création de supports pédagogiques structurés et de qualité.
          </p>
        </div>

        {/* Mission */}
        <Card size="wide" className="mb-12">
          <CardHeader title="Notre mission" />
          <div className="space-y-4">
            <p className="text-white/80 text-lg leading-relaxed">
              Depuis notre création, Creatio s'engage à libérer les établissements de formation de
              la charge de production de contenus pédagogiques, leur permettant de se concentrer sur
              leur cœur de métier : l'accompagnement et la formation des apprenants.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              Nous créons des supports pédagogiques structurés, clairs et directement exploitables
              par les étudiants et les intervenants, en respectant les indispensables de la
              formation et en intégrant les aspects modernes des différentes disciplines.
            </p>
          </div>
        </Card>

        {/* Valeurs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} size="square">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{value.title}</h3>
                <p className="text-white/70 text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card size="tiny">
            <StatsCard value="50+" label="Établissements accompagnés" />
          </Card>
          <Card size="tiny">
            <StatsCard value="500+" label="Supports créés" />
          </Card>
          <Card size="tiny">
            <StatsCard value="100%" label="Conformité Qualiopi" />
          </Card>
          <Card size="tiny">
            <StatsCard value="24/7" label="Support disponible" />
          </Card>
        </div>

        {/* Équipe */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Notre organisation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} size="square">
                <CardHeader title={member.name} />
                <Badge className="mb-4">{member.role}</Badge>
                <p className="text-white/70 text-sm">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Pourquoi nous choisir */}
        <Card size="wide">
          <CardHeader title="Pourquoi choisir Creatio ?" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Gain de temps significatif</h3>
              <p className="text-white/80 text-sm mb-4">
                Libérez vos équipes de la production de contenus pour qu'elles se concentrent sur
                l'accompagnement pédagogique et la coordination des formations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Qualité professionnelle</h3>
              <p className="text-white/80 text-sm mb-4">
                Des supports créés par des experts pédagogiques, conformes aux référentiels et
                prêts à l'emploi.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Rentabilité optimale</h3>
              <p className="text-white/80 text-sm mb-4">
                Des supports réutilisables sur plusieurs années, facilement actualisables, pour un
                retour sur investissement optimal.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Accompagnement personnalisé</h3>
              <p className="text-white/80 text-sm mb-4">
                Un suivi dédié et des mises à jour annuelles pour garantir la pertinence continue
                de vos supports pédagogiques.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
