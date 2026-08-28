import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { features, stats, testimonials } from '@/content/site';

export const Avantages = () => {
  return (
    <div className="shell py-12">
      <header className="max-w-[62ch]">
        <span className="t-eyebrow">Ce que ça change</span>
        <h1 className="t-page mt-3">Les points forts</h1>
        <p className="t-body mt-3">
          Neuf raisons pour lesquelles les établissements nous confient la
          production de leurs supports — du temps gagné aux audits Qualiopi.
        </p>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map(feature => (
          <article
            key={feature.title}
            className="surface p-6 flex flex-col gap-3"
          >
            <span className="w-10 h-10 rounded bg-brand-soft text-brand-ink flex items-center justify-center">
              <Icon name={feature.icon} />
            </span>
            <h2 className="t-label">{feature.title}</h2>
            <p className="t-meta">{feature.description}</p>
          </article>
        ))}
      </div>

      <section className="mt-8 surface overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-line">
          {stats.map(stat => (
            <div key={stat.label} className="p-6">
              <div className="text-[34px] font-bold leading-none tracking-tight tabular">
                {stat.value}
              </div>
              <div className="t-meta mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="t-section">Ce qu’en disent nos clients</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {testimonials.map(testimonial => (
            <figure
              key={testimonial.author}
              className="surface p-6 flex flex-col gap-4"
            >
              <blockquote className="text-body leading-relaxed text-ink">
                « {testimonial.quote} »
              </blockquote>
              <figcaption>
                <div className="t-label">{testimonial.author}</div>
                <div className="t-caption">{testimonial.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="surface mt-8 p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="t-label">Chiffrer votre projet</h2>
          <p className="t-meta max-w-[52ch]">
            Volume, modules, formats : le simulateur donne une fourchette en
            deux minutes.
          </p>
        </div>
        <Link to="/devis">
          <Button variant="primary">Ouvrir le simulateur</Button>
        </Link>
      </section>
    </div>
  );
};
