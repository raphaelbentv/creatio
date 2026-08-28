import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { EchantillonModal } from '@/components/EchantillonModal';
import { Icon } from '@/components/Icon';
import { services } from '@/content/site';

export const Services = () => {
  const [isEchantillonModalOpen, setIsEchantillonModalOpen] = useState(false);

  return (
    <>
      <div className="shell py-12">
        <header className="max-w-[62ch]">
          <span className="t-eyebrow">Prestations</span>
          <h1 className="t-page mt-3">Nos services</h1>
          <p className="t-body mt-3">
            Quatre prestations qui se combinent : la structure d’un programme,
            les slides qui l’enseignent, les évaluations qui le valident, et la
            mise à jour qui le garde vivant.
          </p>
        </header>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map(service => (
            <article
              key={service.title}
              className="surface p-6 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="w-10 h-10 rounded bg-brand-soft text-brand-ink flex items-center justify-center shrink-0">
                  <Icon name={service.icon} />
                </span>
                <span className="t-caption whitespace-nowrap">
                  {service.detail}
                </span>
              </div>
              <h2 className="t-section">{service.title}</h2>
              <p className="t-meta max-w-[58ch]">{service.description}</p>
            </article>
          ))}
        </div>

        <section className="surface mt-8 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="t-label">Voir avant de vous engager</h2>
            <p className="t-meta max-w-[52ch]">
              Un extrait de slides réelles en PDF, ou une estimation chiffrée en
              deux minutes.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEchantillonModalOpen(true)}
            >
              Demander un échantillon
            </Button>
            <Link to="/devis">
              <Button variant="primary">Obtenir un devis</Button>
            </Link>
          </div>
        </section>
      </div>

      <EchantillonModal
        isOpen={isEchantillonModalOpen}
        onClose={() => setIsEchantillonModalOpen(false)}
      />
    </>
  );
};
