import { useState } from 'react';
import { Button } from '@/components/Button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Les tendances de la formation professionnelle en 2025',
    excerpt:
      "Découvrez les évolutions majeures qui transforment le paysage de la formation professionnelle et comment les établissements s'adaptent aux nouvelles exigences.",
    date: '15 janvier 2025',
    category: 'Formation',
    readTime: '5 min',
  },
  {
    id: '2',
    title: 'Qualiopi : comment préparer votre audit qualité',
    excerpt:
      "Guide pratique pour les établissements souhaitant obtenir ou maintenir leur certification Qualiopi, avec des conseils concrets et des retours d'expérience.",
    date: '8 janvier 2025',
    category: 'Qualité',
    readTime: '7 min',
  },
  {
    id: '3',
    title: "L'intelligence artificielle au service de la pédagogie",
    excerpt:
      "Comment l'IA transforme la création de contenus pédagogiques et améliore l'expérience d'apprentissage des étudiants.",
    date: '2 janvier 2025',
    category: 'Innovation',
    readTime: '6 min',
  },
  {
    id: '4',
    title: 'Créer des supports pédagogiques efficaces : les bonnes pratiques',
    excerpt:
      "Méthodologie et conseils pour concevoir des supports de cours qui favorisent l'engagement et la rétention des connaissances.",
    date: '20 décembre 2024',
    category: 'Pédagogie',
    readTime: '8 min',
  },
  {
    id: '5',
    title: 'La digitalisation des CFA : défis et opportunités',
    excerpt:
      "Analyse des enjeux de la transformation digitale pour les Centres de Formation d'Apprentis et les solutions pour y faire face.",
    date: '12 décembre 2024',
    category: 'Digital',
    readTime: '6 min',
  },
  {
    id: '6',
    title: 'Optimiser le budget formation : retour sur investissement',
    excerpt:
      "Comment mesurer l'impact des investissements en formation et optimiser les coûts tout en maintenant la qualité pédagogique.",
    date: '5 décembre 2024',
    category: 'Finance',
    readTime: '5 min',
  },
];

const categories = [
  'Tous',
  'Formation',
  'Qualité',
  'Innovation',
  'Pédagogie',
  'Digital',
  'Finance',
];

export const Blog = () => {
  /* Les pilules de catégorie filtrent réellement depuis la refonte : elles
     étaient purement décoratives, ce qui est pire qu'une absence de filtre. */
  const [activeCategory, setActiveCategory] = useState('Tous');

  const posts =
    activeCategory === 'Tous'
      ? blogPosts
      : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="shell py-12">
      <header className="max-w-[62ch]">
        <span className="t-eyebrow">Ressources</span>
        <h1 className="t-page mt-3">Blog Creatio</h1>
        <p className="t-body mt-3">
          Actualités, conseils et ressources pour les professionnels de la
          formation.
        </p>
      </header>

      <div
        className="mt-8 flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrer par catégorie"
      >
        {categories.map(category => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveCategory(category)}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline'}`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <article
            key={post.id}
            className="surface p-6 flex flex-col gap-3 items-start"
          >
            <span className="badge">{post.category}</span>
            <h2 className="t-section">{post.title}</h2>
            <p className="t-meta flex-1">{post.excerpt}</p>
            <div className="flex items-center gap-3 t-caption">
              <span>{post.date}</span>
              <span aria-hidden="true">·</span>
              <span>{post.readTime} de lecture</span>
            </div>
            <Button variant="ghost" size="sm">
              Lire l’article
            </Button>
          </article>
        ))}
      </div>

      {posts.length === 0 && (
        <p className="t-body mt-6">
          Aucun article dans cette catégorie pour le moment.
        </p>
      )}

      <section className="surface mt-8 p-6">
        <h2 className="t-section">Restez informé</h2>
        <p className="t-meta mt-2 max-w-[56ch]">
          Recevez nos derniers articles et actualités directement dans votre
          boîte mail.
        </p>
        <form
          className="mt-4 flex flex-wrap gap-2 max-w-md"
          onSubmit={event => event.preventDefault()}
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Votre adresse e-mail
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="vous@etablissement.fr"
            className="field flex-1 min-w-[200px]"
          />
          <Button variant="primary" type="submit">
            S’abonner
          </Button>
        </form>
      </section>
    </div>
  );
};
