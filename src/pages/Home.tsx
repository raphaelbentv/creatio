import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Gauge } from '@/components/Gauge';
import { ProgressBar } from '@/components/ProgressBar';
import { Faq } from '@/components/Faq';
import { EchantillonModal } from '@/components/EchantillonModal';
import { Icon } from '@/components/Icon';
import { faqs, testimonials } from '@/content/site';

/* Layout « Widgets » : la home ne raconte plus l'offre en sections empilées,
   elle la MONTRE. Une information dominante par tuile, grille modulaire de
   1×1, 2×1 et 2×2, rayon 22px — le seul endroit du site qui s'écarte du
   rayon 8px du reste du système.

   Services et Points forts vivent désormais sur /services et /avantages :
   les tuiles pointent vers eux plutôt que de les résumer à moitié. */

const livraison = [
  { label: 'Programme', value: '2 sem.' },
  { label: 'Slides', value: '40 / module' },
  { label: 'Évaluations', value: 'incluses' },
];

export const Home = () => {
  const [isEchantillonModalOpen, setIsEchantillonModalOpen] = useState(false);
  const featured = testimonials[0];

  return (
    <>
      <div className="shell py-8">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(200px,auto)]">
          {/* Accroche */}
          <section className="tile md:col-span-2 lg:row-span-2 flex flex-col justify-center gap-5 !p-8">
            <span className="t-eyebrow">
              Solutions pédagogiques nouvelle génération
            </span>
            <h1 className="t-hero max-lg:text-[38px]">
              <span className="block">Vos cours, prêts.</span>
              <span className="block">Vos apprenants, engagés.</span>
            </h1>
            <p className="t-body max-w-[52ch]">
              De la structuration d’un programme à l’élaboration des slides de
              cours, libérez vos ressources internes et garantissez une qualité
              optimale.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link to="/services">
                <Button variant="primary" size="lg">
                  Découvrir nos services
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsEchantillonModalOpen(true)}
              >
                Échantillon gratuit
              </Button>
            </div>
          </section>

          {/* Satisfaction */}
          <section className="tile flex flex-col items-center justify-center gap-2">
            <Gauge value={95} label="Satisfaction client" />
          </section>

          {/* Programmes */}
          <section className="tile flex flex-col justify-center gap-2">
            <div className="text-[34px] font-bold leading-none tracking-tight tabular">
              100+
            </div>
            <div className="t-meta">Programmes créés</div>
            <ProgressBar value={72} className="mt-2" />
            <div className="t-caption">72 % en formation continue</div>
          </section>

          {/* Livraison type */}
          <section className="tile flex flex-col justify-center gap-3">
            <div className="t-caption">Livraison type</div>
            <dl className="flex flex-col gap-2">
              {livraison.map(row => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-3"
                >
                  <dt className="t-meta">{row.label}</dt>
                  {/* 90px et `whitespace-nowrap` : sans ça, « 40 / module »
                      casse sur deux lignes et pousse la dernière ligne hors
                      de la tuile. */}
                  <dd className="t-label min-w-[90px] text-right whitespace-nowrap tabular">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Slides */}
          <section className="tile flex flex-col justify-center gap-2">
            <div className="text-[34px] font-bold leading-none tracking-tight tabular">
              500+
            </div>
            <div className="t-meta">Slides livrées</div>
            <div className="t-caption mt-1 text-success">
              ● Format PPT et PDF
            </div>
          </section>

          {/* Témoignage */}
          <section className="tile md:col-span-2 flex flex-col justify-center gap-4">
            <blockquote className="text-[17px] leading-relaxed text-ink">
              « {featured.quote} »
            </blockquote>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="w-9 h-9 rounded-full bg-brand-soft text-brand-ink flex items-center justify-center text-meta font-semibold"
              >
                {featured.author.charAt(0)}
              </span>
              <div>
                <div className="t-label">{featured.author}</div>
                <div className="t-caption">{featured.role}</div>
              </div>
            </div>
          </section>

          {/* Qualiopi */}
          <section className="tile flex flex-col justify-center gap-3">
            <span className="w-9 h-9 rounded bg-brand-soft text-brand-ink flex items-center justify-center">
              <Icon name="check-circle" />
            </span>
            <div className="t-label">Cochez les cases Qualiopi</div>
            <p className="t-meta">
              Objectifs, prérequis, modalités d’évaluation : les indicateurs
              sont couverts dès la livraison.
            </p>
          </section>

          {/* Devis — la seule tuile en aplat d'accent de la grille */}
          <section className="tile tile-brand flex flex-col justify-center gap-3">
            <div className="text-section font-semibold leading-tight">
              Estimez votre projet en 2 minutes
            </div>
            <p className="t-meta">Simulateur en ligne, sans engagement.</p>
            <Link
              to="/devis"
              className="btn bg-surface text-brand-ink hover:bg-surface-soft mt-1"
            >
              Calculer le devis
            </Link>
          </section>

          {/* Extrait de slide */}
          <section className="tile md:col-span-2 flex flex-col justify-center gap-3">
            <div className="t-caption">
              Extrait de slide — module « Fondamentaux du CRM »
            </div>
            <div
              aria-hidden="true"
              className="rounded border border-line bg-surface-soft p-4 flex flex-col gap-2"
            >
              <span className="block h-2 w-[46%] rounded-sm bg-brand" />
              <span className="block h-1.5 w-[88%] rounded-sm bg-line-strong" />
              <span className="block h-1.5 w-[76%] rounded-sm bg-line-strong" />
              <span className="block h-1.5 w-[82%] rounded-sm bg-line-strong" />
            </div>
          </section>

          {/* Échantillon */}
          <section className="tile md:col-span-2 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="t-label">Un extrait gratuit avant de décider</div>
              <p className="t-meta max-w-[46ch]">
                Recevez un PDF de slides réelles pour évaluer notre rendu, sans
                engagement.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsEchantillonModalOpen(true)}
            >
              Demander l’échantillon
            </Button>
          </section>
        </div>
      </div>

      <section id="faq" className="shell py-12">
        <h2 className="t-page">Questions fréquentes</h2>
        <p className="t-body mt-2 mb-6 max-w-[62ch]">
          Les sept questions qui reviennent à chaque premier échange.
        </p>
        <Faq items={faqs} />
      </section>

      <EchantillonModal
        isOpen={isEchantillonModalOpen}
        onClose={() => setIsEchantillonModalOpen(false)}
      />
    </>
  );
};
