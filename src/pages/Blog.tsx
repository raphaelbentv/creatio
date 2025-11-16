import { Card, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image?: string;
}

export const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Les tendances de la formation professionnelle en 2025',
      excerpt:
        'Découvrez les évolutions majeures qui transforment le paysage de la formation professionnelle et comment les établissements s\'adaptent aux nouvelles exigences.',
      date: '15 Janvier 2025',
      category: 'Formation',
      readTime: '5 min',
    },
    {
      id: '2',
      title: 'Qualiopi : Comment préparer votre audit qualité',
      excerpt:
        'Guide pratique pour les établissements souhaitant obtenir ou maintenir leur certification Qualiopi, avec des conseils concrets et des retours d\'expérience.',
      date: '8 Janvier 2025',
      category: 'Qualité',
      readTime: '7 min',
    },
    {
      id: '3',
      title: 'L\'intelligence artificielle au service de la pédagogie',
      excerpt:
        'Comment l\'IA transforme la création de contenus pédagogiques et améliore l\'expérience d\'apprentissage des étudiants.',
      date: '2 Janvier 2025',
      category: 'Innovation',
      readTime: '6 min',
    },
    {
      id: '4',
      title: 'Créer des supports pédagogiques efficaces : les bonnes pratiques',
      excerpt:
        'Méthodologie et conseils pour concevoir des supports de cours qui favorisent l\'engagement et la rétention des connaissances.',
      date: '20 Décembre 2024',
      category: 'Pédagogie',
      readTime: '8 min',
    },
    {
      id: '5',
      title: 'La digitalisation des CFA : défis et opportunités',
      excerpt:
        'Analyse des enjeux de la transformation digitale pour les Centres de Formation d\'Apprentis et les solutions pour y faire face.',
      date: '12 Décembre 2024',
      category: 'Digital',
      readTime: '6 min',
    },
    {
      id: '6',
      title: 'Optimiser le budget formation : retour sur investissement',
      excerpt:
        'Comment mesurer l\'impact des investissements en formation et optimiser les coûts tout en maintenant la qualité pédagogique.',
      date: '5 Décembre 2024',
      category: 'Finance',
      readTime: '5 min',
    },
  ];

  const categories = ['Tous', 'Formation', 'Qualité', 'Innovation', 'Pédagogie', 'Digital', 'Finance'];

  return (
    <div className="pt-[120px] pb-10 px-5 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Blog Creatio</h1>
          <p className="text-xl text-[#6b6b7a] mb-8 max-w-3xl mx-auto">
            Actualités, conseils et ressources pour les professionnels de la formation
          </p>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === 'Tous' ? 'primary' : 'outline'}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Liste des articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} size="square" className="flex flex-col">
              <CardHeader title={post.category} />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h2>
                <p className="text-white/70 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-[#71717a] mb-4">
                  <span>{post.date}</span>
                  <span>{post.readTime} de lecture</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full">
                Lire l'article →
              </Button>
            </Card>
          ))}
        </div>

        {/* Newsletter */}
        <Card size="wide" className="mt-16">
          <CardHeader title="Restez informé" />
          <div className="text-center">
            <p className="text-white/80 mb-6">
              Recevez nos derniers articles et actualités directement dans votre boîte mail
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 bg-[#0f0f12] border border-white/10 rounded-xl text-white placeholder-[#71717a] focus:outline-none focus:border-[#8a5cf6]"
              />
              <Button variant="primary">S'abonner</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

