import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/Button';
import { Card, CardHeader } from '@/components/Card';
import { Icon, IconName } from '@/components/Icon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface DevisOptions {
  typeService: 'programme' | 'slides' | 'evaluation' | 'complet';
  nombreHeures: number; // Heures de cours (1h = 5 slides)
  nombreModulesHeures: number; // Nombre de modules pour diviser les heures
  nombreModules: number;
  nombreEvaluations: number;
  miseAJourAnnuelle: boolean;
  format: 'ppt' | 'pdf' | 'les-deux';
  urgence: 'standard' | 'express' | 'urgent';
  paiementEchelonne: boolean; // Paiement échelonné ou comptant
  nombreMoisEchelonnement: number; // Nombre de mois pour l'échelonnement
}

// Paliers de pricing pour les slides (cumulatif)
const paliersSlides = [
  { min: 1, max: 100, prix: 11 },
  { min: 101, max: 200, prix: 10 },
  { min: 201, max: 400, prix: 8 },
  { min: 401, max: 800, prix: 7 },
  { min: 801, max: 1500, prix: 6 },
  { min: 1501, max: 5000, prix: 5 },
  { min: 5001, max: Infinity, prix: 3 },
];

// Tarifs de base
const tarifs = {
  module: 500, // € par module
  evaluation: 80, // € par évaluation
  miseAJourAnnuelle: 0.2, // 20% du total
  tva: 0.2, // TVA 20%
  format: {
    ppt: 0,
    pdf: 0,
    'les-deux': 0.1, // +10% pour les deux formats
  },
  urgence: {
    standard: 0,
    express: 0.25, // +25% pour express
    urgent: 0.5, // +50% pour urgent
  },
};

// Calcul du prix des slides selon les paliers cumulés
const calculerPrixSlides = (nombreSlides: number) => {
  if (nombreSlides === 0) return { totalHT: 0, details: [] };

  let totalHT = 0;
  const details: Array<{
    palier: string;
    quantite: number;
    prixUnitaire: number;
    montant: number;
  }> = [];

  for (let i = 0; i < paliersSlides.length; i++) {
    const palier = paliersSlides[i];
    const bornePrecedente = i === 0 ? 0 : paliersSlides[i - 1].max;

    // Si le nombre de slides dépasse le minimum du palier
    if (nombreSlides >= palier.min) {
      // Calculer la quantité dans ce palier
      const debutPalier = bornePrecedente + 1;
      const finPalier =
        palier.max === Infinity
          ? nombreSlides
          : Math.min(palier.max, nombreSlides);
      const quantiteDansPalier = finPalier - debutPalier + 1;

      if (quantiteDansPalier > 0) {
        const montantPalier = Math.floor(quantiteDansPalier * palier.prix);
        totalHT += montantPalier;

        const palierLabel =
          palier.max === Infinity
            ? `${palier.min}+`
            : `${palier.min} - ${palier.max}`;

        details.push({
          palier: palierLabel,
          quantite: quantiteDansPalier,
          prixUnitaire: palier.prix,
          montant: montantPalier,
        });
      }
    }
  }

  return { totalHT, details };
};

const typesService: { value: string; label: string; icon: IconName }[] = [
  { value: 'slides', label: 'Création de slides', icon: 'slides' },
  { value: 'programme', label: 'Création de programme', icon: 'programme' },
  { value: 'evaluation', label: "Création d'évaluations", icon: 'evaluation' },
  { value: 'complet', label: 'Service complet', icon: 'grid' },
];

export const Devis = () => {
  const [options, setOptions] = useState<DevisOptions>({
    typeService: 'slides',
    nombreHeures: 20, // 20h = 100 slides (par défaut)
    nombreModulesHeures: 1, // Nombre de modules pour diviser les heures
    nombreModules: 1,
    nombreEvaluations: 0,
    miseAJourAnnuelle: false,
    format: 'les-deux',
    urgence: 'standard',
    paiementEchelonne: false,
    nombreMoisEchelonnement: 4,
  });

  // Conversion : 1h de cours = 5 slides
  const nombreSlides = options.nombreHeures * 5;
  const heuresParModule =
    options.nombreModulesHeures > 0
      ? Math.round((options.nombreHeures / options.nombreModulesHeures) * 10) /
        10
      : options.nombreHeures;

  const [devisCalcule, setDevisCalcule] = useState<number>(0);
  const [devisHT, setDevisHT] = useState<number>(0);
  const [detailsPaliers, setDetailsPaliers] = useState<
    Array<{
      palier: string;
      quantite: number;
      prixUnitaire: number;
      montant: number;
    }>
  >([]);
  const devisCardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [moduleNames, setModuleNames] = useState<string[]>(['Module 1']);

  useEffect(() => {
    setModuleNames(prev => {
      const count = Math.max(
        options.nombreModules,
        options.nombreModulesHeures
      );
      const next = [...prev];
      if (count > prev.length) {
        for (let i = prev.length; i < count; i += 1) {
          next.push(`Module ${i + 1}`);
        }
      } else if (count < prev.length) {
        next.splice(count);
      }
      return next;
    });
  }, [options.nombreModules, options.nombreModulesHeures]);

  const handleModuleNameChange = (index: number, value: string) => {
    setModuleNames(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  const handleChange = (
    field: keyof DevisOptions,
    value: string | number | boolean
  ) => {
    setOptions(prev => ({ ...prev, [field]: value }));
  };

  const genererPDF = async () => {
    if (!devisCardRef.current) return;
    setIsExporting(true);

    // Laisse le temps au DOM d'appliquer les styles d'export (masquage des boutons, padding)
    await new Promise(resolve => requestAnimationFrame(() => resolve(null)));

    const canvas = await html2canvas(devisCardRef.current, {
      scale: 2, // meilleure résolution
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pageWidth / imgWidth, (pageHeight - 40) / imgHeight);
    const finalWidth = imgWidth * ratio;
    const finalHeight = imgHeight * ratio;
    const offsetX = (pageWidth - finalWidth) / 2;
    const offsetY = 20;

    pdf.addImage(
      imgData,
      'PNG',
      offsetX,
      offsetY,
      finalWidth,
      finalHeight,
      undefined,
      'FAST'
    );

    pdf.save(`devis-creatio-${new Date().toISOString().split('T')[0]}.pdf`);

    setIsExporting(false);
  };

  // Scroll vers le haut de la page au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calcul automatique en temps réel
  useEffect(() => {
    let totalHT = 0;
    let detailsPaliersSlides: Array<{
      palier: string;
      quantite: number;
      prixUnitaire: number;
      montant: number;
    }> = [];

    // Calcul selon le type de service
    if (options.typeService === 'programme') {
      totalHT = Math.floor(options.nombreModules * tarifs.module);
    } else if (options.typeService === 'slides') {
      const resultSlides = calculerPrixSlides(nombreSlides);
      totalHT = resultSlides.totalHT;
      detailsPaliersSlides = resultSlides.details;
    } else if (options.typeService === 'evaluation') {
      totalHT = Math.floor(options.nombreEvaluations * tarifs.evaluation);
    } else if (options.typeService === 'complet') {
      const resultSlides = calculerPrixSlides(nombreSlides);
      totalHT = Math.floor(
        options.nombreModules * tarifs.module +
          resultSlides.totalHT +
          options.nombreEvaluations * tarifs.evaluation
      );
      detailsPaliersSlides = resultSlides.details;
    }

    // Ajout du format
    totalHT = Math.floor(totalHT * (1 + tarifs.format[options.format]));

    // Ajout de l'urgence
    totalHT = Math.floor(totalHT * (1 + tarifs.urgence[options.urgence]));

    // Ajout de la mise à jour annuelle
    if (options.miseAJourAnnuelle) {
      totalHT = Math.floor(totalHT * (1 + tarifs.miseAJourAnnuelle));
    }

    // Calcul TTC (HT + TVA 20%)
    const totalTTC = Math.floor(totalHT * (1 + tarifs.tva));

    setDevisHT(totalHT);
    setDevisCalcule(totalTTC);
    setDetailsPaliers(detailsPaliersSlides);
  }, [options, nombreSlides]);

  return (
    <div className="shell py-12">
      <div>
        <header className="max-w-[62ch] mb-8">
          <span className="t-eyebrow">Estimation</span>
          <h1 className="t-page mt-3">Calculer votre devis</h1>
          <p className="t-body mt-3">
            Une estimation instantanée du coût de création de vos supports
            pédagogiques. Aucune donnée n’est envoyée : le calcul se fait dans
            votre navigateur.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Formulaire */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <Card size="large">
              <CardHeader title="Type de service" size="large" />
              <div className="grid grid-cols-2 gap-4">
                {typesService.map(service => (
                  <button
                    key={service.value}
                    onClick={() => handleChange('typeService', service.value)}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-300 text-left
                      ${
                        options.typeService === service.value
                          ? 'border-brand bg-brand-soft'
                          : 'border-line bg-surface-soft hover:border-brand'
                      }
                    `}
                  >
                    <span className="w-10 h-10 mb-3 rounded bg-brand-soft text-brand-ink flex items-center justify-center">
                      <Icon name={service.icon} />
                    </span>
                    <div className="text-ink font-bold text-sm">
                      {service.label}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Nombre d'heures de cours */}
            {(options.typeService === 'slides' ||
              options.typeService === 'complet') && (
              <Card size="square">
                <CardHeader title="Heures de cours à couvrir" size="large" />
                <div className="space-y-4">
                  <div>
                    <label className="block text-ink-2 text-sm mb-3">
                      {options.nombreHeures}h de cours ({nombreSlides} slides)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="500"
                      step="1"
                      value={options.nombreHeures}
                      onChange={e =>
                        handleChange('nombreHeures', parseInt(e.target.value))
                      }
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-ink-3 mt-2">
                      <span>1h</span>
                      <span>500h</span>
                    </div>
                  </div>

                  {/* Répartition en modules */}
                  <div className="pt-4 border-t border-line">
                    <label className="block text-ink-2 text-sm mb-3">
                      Répartition en modules
                    </label>
                    <div className="flex items-center gap-3 mb-3">
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={options.nombreModulesHeures}
                        onChange={e =>
                          handleChange(
                            'nombreModulesHeures',
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-20 px-3 py-2 bg-surface-soft border border-line rounded-lg text-ink text-sm focus:outline-none focus:border-brand transition-colors"
                      />
                      <span className="text-ink-2 text-sm">
                        module{options.nombreModulesHeures > 1 ? 's' : ''}
                      </span>
                    </div>
                    {options.nombreModulesHeures > 1 && (
                      <div className="text-xs text-ink-3 bg-surface-soft p-3 rounded-lg border border-line">
                        <div className="font-semibold text-ink-2 mb-1">
                          Répartition :
                        </div>
                        <div className="space-y-1">
                          <div>
                            {options.nombreHeures}h ÷{' '}
                            {options.nombreModulesHeures} module
                            {options.nombreModulesHeures > 1 ? 's' : ''} ={' '}
                            <span className="text-ink font-semibold">
                              {heuresParModule}h par module
                            </span>
                          </div>
                          <div className="text-brand-ink">
                            ({Math.round(heuresParModule * 5)} slides par
                            module)
                          </div>
                          <div className="pt-2 border-t border-line space-y-1">
                            <div className="text-ink-2 font-semibold">
                              Noms des modules
                            </div>
                            <div className="space-y-1">
                              {Array.from({
                                length: options.nombreModulesHeures,
                              }).map((_, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2"
                                >
                                  <span className="text-ink-3 w-16">
                                    Module {idx + 1}
                                  </span>
                                  <input
                                    type="text"
                                    value={moduleNames[idx] || ''}
                                    onChange={e =>
                                      handleModuleNameChange(
                                        idx,
                                        e.target.value
                                      )
                                    }
                                    className="flex-1 px-3 py-2 bg-surface-soft border border-line rounded-lg text-ink text-xs focus:outline-none focus:border-brand transition-colors"
                                    placeholder={`Nom du module ${idx + 1}`}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-ink-3">
                    Conversion : 1h de cours = 5 slides
                    <br />
                    Prix selon paliers cumulés (11€ → 3€ par slide)
                  </div>
                  {detailsPaliers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-line">
                      <div className="text-xs text-ink-3 mb-2 font-semibold">
                        Détail des paliers :
                      </div>
                      <div className="space-y-1">
                        {detailsPaliers.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-xs text-ink-2"
                          >
                            <span>
                              {detail.palier} : {detail.quantite} ×{' '}
                              {detail.prixUnitaire}€
                            </span>
                            <span className="font-semibold">
                              {detail.montant}€
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Nombre de modules */}
            {(options.typeService === 'programme' ||
              options.typeService === 'complet') && (
              <Card size="square">
                <CardHeader title="Nombre de modules" size="large" />
                <div className="space-y-4">
                  <div>
                    <label className="block text-ink-2 text-sm mb-2">
                      {options.nombreModules} module
                      {options.nombreModules > 1 ? 's' : ''}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={options.nombreModules}
                      onChange={e =>
                        handleChange('nombreModules', parseInt(e.target.value))
                      }
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-ink-3 mt-1">
                      <span>1</span>
                      <span>20</span>
                    </div>
                  </div>
                  <div className="text-sm text-ink-3">
                    Prix unitaire : {tarifs.module}€ par module
                  </div>

                  {/* Noms des modules */}
                  <div className="pt-4 border-t border-line">
                    <label className="block text-ink-2 text-sm mb-3">
                      Noms des modules
                    </label>
                    <div className="space-y-2">
                      {moduleNames.map((name, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-xs text-ink-3 w-16">
                            Module {idx + 1}
                          </span>
                          <input
                            type="text"
                            value={name}
                            onChange={e =>
                              handleModuleNameChange(idx, e.target.value)
                            }
                            className="flex-1 px-3 py-2 bg-surface-soft border border-line rounded-lg text-ink text-sm focus:outline-none focus:border-brand transition-colors"
                            placeholder={`Nom du module ${idx + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Nombre d'évaluations */}
            {(options.typeService === 'evaluation' ||
              options.typeService === 'complet') && (
              <Card size="square">
                <CardHeader title="Nombre d'évaluations" size="large" />
                <div className="space-y-4">
                  <div>
                    <label className="block text-ink-2 text-sm mb-2">
                      {options.nombreEvaluations} évaluation
                      {options.nombreEvaluations > 1 ? 's' : ''}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={options.nombreEvaluations}
                      onChange={e =>
                        handleChange(
                          'nombreEvaluations',
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-ink-3 mt-1">
                      <span>0</span>
                      <span>50</span>
                    </div>
                  </div>
                  <div className="text-sm text-ink-3">
                    Prix unitaire : {tarifs.evaluation}€ par évaluation
                  </div>
                </div>
              </Card>
            )}

            {/* Options supplémentaires */}
            <Card size="square">
              <CardHeader title="Options supplémentaires" size="large" />
              <div className="space-y-4">
                <div>
                  <label className="block text-ink-2 text-sm mb-3">
                    Format de livraison
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'ppt', label: 'PPT' },
                      { value: 'pdf', label: 'PDF' },
                      { value: 'les-deux', label: 'Les deux' },
                    ].map(format => (
                      <button
                        key={format.value}
                        onClick={() => handleChange('format', format.value)}
                        className={`
                          p-3 rounded-lg border-2 transition-all duration-300
                          ${
                            options.format === format.value
                              ? 'border-brand bg-brand-soft text-ink'
                              : 'border-line bg-surface-soft text-ink-2 hover:border-brand'
                          }
                        `}
                      >
                        {format.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-ink-2 text-sm mb-3">
                    Délai de livraison
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        value: 'standard',
                        label: 'Standard',
                        desc: '4-6 semaines',
                      },
                      {
                        value: 'express',
                        label: 'Express',
                        desc: '2-3 semaines',
                        bonus: '+25%',
                      },
                      {
                        value: 'urgent',
                        label: 'Urgent',
                        desc: '1-2 semaines',
                        bonus: '+50%',
                      },
                    ].map(urgence => (
                      <button
                        key={urgence.value}
                        onClick={() => handleChange('urgence', urgence.value)}
                        className={`
                          p-3 rounded-lg border-2 transition-all duration-300 text-left
                          ${
                            options.urgence === urgence.value
                              ? 'border-brand bg-brand-soft'
                              : 'border-line bg-surface-soft hover:border-brand'
                          }
                        `}
                      >
                        <div className="text-ink font-bold text-sm">
                          {urgence.label}
                        </div>
                        <div className="text-ink-3 text-xs mt-1">
                          {urgence.desc}
                        </div>
                        {urgence.bonus && (
                          <div className="text-brand-ink text-xs mt-1 font-bold">
                            {urgence.bonus}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-surface-soft rounded-lg border border-line">
                  <input
                    type="checkbox"
                    id="miseAJour"
                    checked={options.miseAJourAnnuelle}
                    onChange={e =>
                      handleChange('miseAJourAnnuelle', e.target.checked)
                    }
                    className="w-5 h-5 rounded accent-[color:var(--brand)] cursor-pointer"
                  />
                  <label
                    htmlFor="miseAJour"
                    className="text-ink cursor-pointer flex-1"
                  >
                    <div className="font-bold text-sm">
                      Mise à jour annuelle
                    </div>
                    <div className="text-ink-3 text-xs mt-1">
                      Révision annuelle des contenus (+20%)
                    </div>
                  </label>
                </div>
              </div>
            </Card>
          </div>

          {/* Résultat du devis */}
          <div className="lg:col-span-1">
            {/* La carte est collante SOUS la navbar (64px) et sert aussi de
                gabarit à l'export PDF : elle ne porte donc ni survol ni
                décor, seulement l'ombre unique. */}
            <div
              ref={devisCardRef}
              className="tile sticky top-[80px] w-full"
              style={isExporting ? { paddingTop: '32px' } : undefined}
            >
              <div>
                <CardHeader title="Votre devis" size="large" />
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-black text-ink mb-2 flex items-baseline justify-center gap-2">
                      <span>{devisHT.toLocaleString('fr-FR')}€</span>
                      <span className="text-2xl text-ink-3 font-normal">
                        HT
                      </span>
                    </div>
                    <div className="text-ink-3 text-xs mt-3 mb-1">
                      TTC : {devisCalcule.toLocaleString('fr-FR')}€
                    </div>
                    <div className="t-caption mt-2 text-brand-ink font-semibold">
                      Calcul en temps réel
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-line">
                    {/* Heures de cours */}
                    {(options.typeService === 'slides' ||
                      options.typeService === 'complet') && (
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-ink-3">Heures de cours</span>
                          <span className="text-ink">
                            {options.nombreHeures}h ({nombreSlides} slides)
                          </span>
                        </div>
                        {options.nombreModulesHeures > 1 && (
                          <div className="text-xs text-ink-3 pl-2">
                            Réparti en {options.nombreModulesHeures} module
                            {options.nombreModulesHeures > 1 ? 's' : ''} :{' '}
                            {heuresParModule}h par module
                          </div>
                        )}
                        {moduleNames.length > 0 && (
                          <div className="text-xs text-ink-2 pl-3 mt-1 space-y-1">
                            {moduleNames
                              .slice(
                                0,
                                Math.max(
                                  options.nombreModulesHeures,
                                  options.nombreModules
                                )
                              )
                              .map((name, idx) => (
                                <div
                                  key={idx}
                                  className="flex gap-2 items-center"
                                >
                                  <span className="text-ink-3">•</span>
                                  <span>{name || `Module ${idx + 1}`}</span>
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Détails des paliers pour les slides */}
                    {detailsPaliers.length > 0 && (
                      <>
                        <div className="text-xs text-ink-3 font-semibold mb-2">
                          Calcul par paliers (slides) :
                        </div>
                        {detailsPaliers.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-xs text-ink-2 pl-2"
                          >
                            <span>
                              {detail.palier} : {detail.quantite} ×{' '}
                              {detail.prixUnitaire}€
                            </span>
                            <span className="font-semibold">
                              {detail.montant.toLocaleString('fr-FR')}€
                            </span>
                          </div>
                        ))}
                        <div className="pt-2 border-t border-line"></div>
                      </>
                    )}

                    {/* Modules */}
                    {(options.typeService === 'programme' ||
                      options.typeService === 'complet') &&
                      options.nombreModules > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-ink-3">Modules</span>
                          <span className="text-ink">
                            {options.nombreModules} × {tarifs.module}€ ={' '}
                            {(
                              options.nombreModules * tarifs.module
                            ).toLocaleString('fr-FR')}
                            €
                          </span>
                        </div>
                      )}
                    {(options.typeService === 'programme' ||
                      options.typeService === 'complet') &&
                      moduleNames.length > 0 && (
                        <div className="text-xs text-ink-2 pl-2 space-y-1 mt-1">
                          {moduleNames.map((name, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                              <span className="text-ink-3 w-16">
                                Module {idx + 1}
                              </span>
                              <span className="text-ink-2">
                                {name || `Module ${idx + 1}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Évaluations */}
                    {(options.typeService === 'evaluation' ||
                      options.typeService === 'complet') &&
                      options.nombreEvaluations > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-ink-3">Évaluations</span>
                          <span className="text-ink">
                            {options.nombreEvaluations} × {tarifs.evaluation}€ ={' '}
                            {(
                              options.nombreEvaluations * tarifs.evaluation
                            ).toLocaleString('fr-FR')}
                            €
                          </span>
                        </div>
                      )}

                    {options.format === 'les-deux' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-3">Format double</span>
                        <span className="text-ink">+10%</span>
                      </div>
                    )}
                    {options.urgence !== 'standard' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-3">
                          Délai {options.urgence}
                        </span>
                        <span className="text-ink">
                          +{tarifs.urgence[options.urgence] * 100}%
                        </span>
                      </div>
                    )}
                    {options.miseAJourAnnuelle && (
                      <div className="flex justify-between text-sm">
                        <span className="text-ink-3">Mise à jour annuelle</span>
                        <span className="text-ink">+20%</span>
                      </div>
                    )}

                    {/* Total HT et TVA */}
                    <div className="pt-2 border-t border-line">
                      <div className="flex justify-between text-sm font-semibold mb-1">
                        <span className="text-ink">Total HT</span>
                        <span className="text-ink">
                          {devisHT.toLocaleString('fr-FR')}€
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-ink-3">
                        <span>TVA (20%)</span>
                        <span>
                          {Math.floor(devisCalcule - devisHT).toLocaleString(
                            'fr-FR'
                          )}
                          €
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sélection du mode de paiement */}
                  <div className="pt-4 border-t border-line">
                    <h4 className="text-sm font-bold text-brand-ink mb-3">
                      Mode de paiement
                    </h4>
                    <div className="space-y-3">
                      {/* Option comptant */}
                      <div
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          !options.paiementEchelonne
                            ? 'border-brand bg-brand-soft'
                            : 'border-line bg-surface-soft hover:border-brand'
                        }`}
                        onClick={() => handleChange('paiementEchelonne', false)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-ink text-sm">
                              Paiement comptant
                            </div>
                            <div className="text-xs text-ink-3 mt-1">
                              Remise de 15% sur le montant HT
                            </div>
                          </div>
                          {!options.paiementEchelonne && (
                            <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                          )}
                          {options.paiementEchelonne && (
                            <div className="w-5 h-5 rounded-full border-2 border-line-strong"></div>
                          )}
                        </div>
                        {!options.paiementEchelonne && devisHT > 0 && (
                          <div className="mt-2 pt-2 border-t border-line">
                            <div className="text-xs text-ink-3">
                              Montant avec remise :
                            </div>
                            <div className="text-ink font-semibold text-sm mt-1">
                              {Math.floor(devisHT * 0.85).toLocaleString(
                                'fr-FR'
                              )}
                              € HT
                              <span className="text-ink-3 text-xs ml-2 font-normal">
                                (
                                {Math.floor(
                                  devisHT * 0.85 * 1.2
                                ).toLocaleString('fr-FR')}
                                € TTC)
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Option échelonné */}
                      <div
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                          options.paiementEchelonne
                            ? 'border-brand bg-brand-soft'
                            : 'border-line bg-surface-soft hover:border-brand'
                        }`}
                        onClick={() => handleChange('paiementEchelonne', true)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-semibold text-ink text-sm">
                              Paiement échelonné
                            </div>
                            <div className="text-xs text-ink-3 mt-1">
                              Sans remise, paiement mensuel
                            </div>
                          </div>
                          {options.paiementEchelonne && (
                            <div className="w-5 h-5 rounded-full bg-brand flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                          )}
                          {!options.paiementEchelonne && (
                            <div className="w-5 h-5 rounded-full border-2 border-line-strong"></div>
                          )}
                        </div>

                        {options.paiementEchelonne && (
                          <div className="mt-3 pt-3 border-t border-line">
                            <label className="block text-xs text-ink-2 mb-2">
                              Nombre de mois
                            </label>
                            <div className="flex gap-2 mb-2">
                              {[4, 6, 10].map(mois => (
                                <button
                                  key={mois}
                                  onClick={e => {
                                    e.stopPropagation();
                                    handleChange(
                                      'nombreMoisEchelonnement',
                                      mois
                                    );
                                  }}
                                  className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 ${
                                    options.nombreMoisEchelonnement === mois
                                      ? 'bg-brand text-ink'
                                      : 'bg-surface-soft text-ink-2 border border-line hover:border-brand'
                                  }`}
                                >
                                  {mois} mois
                                </button>
                              ))}
                            </div>
                            <input
                              type="number"
                              min="2"
                              max="24"
                              value={options.nombreMoisEchelonnement}
                              onChange={e => {
                                const value = Math.max(
                                  2,
                                  Math.min(24, parseInt(e.target.value) || 2)
                                );
                                handleChange('nombreMoisEchelonnement', value);
                              }}
                              onClick={e => e.stopPropagation()}
                              className="w-full px-3 py-2 bg-surface-soft border border-line rounded-lg text-ink text-xs focus:outline-none focus:border-brand transition-colors"
                              placeholder="Nombre de mois"
                            />
                            {devisCalcule > 0 && (
                              <div className="mt-3 pt-3 border-t border-line">
                                <div className="text-xs text-ink-3">
                                  Mensualité TTC :
                                </div>
                                <div className="text-ink font-semibold text-sm mt-1">
                                  {Math.floor(
                                    devisCalcule /
                                      options.nombreMoisEchelonnement
                                  ).toLocaleString('fr-FR')}
                                  € / mois
                                  <span className="text-ink-3 text-xs ml-2 font-normal">
                                    ({options.nombreMoisEchelonnement}{' '}
                                    mensualités)
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Clause de remise */}
                  {!options.paiementEchelonne && (
                    <div className="pt-4 border-t border-line">
                      <h4 className="text-sm font-bold text-brand-ink mb-2">
                        Remise conditionnelle
                      </h4>
                      <div className="bg-brand-soft border border-brand rounded-lg p-3 text-xs">
                        <div className="text-ink leading-relaxed">
                          En cas de règlement en une seule fois à la signature,
                          une remise de{' '}
                          <span className="font-bold text-brand-ink">15%</span>{' '}
                          est appliquée sur le montant HT global.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Modalités TVA */}
                  <div className="pt-4 border-t border-line">
                    <h4 className="text-sm font-bold text-brand-ink mb-2">
                      Modalités TVA
                    </h4>
                    <div className="text-xs text-ink-2 leading-relaxed space-y-1">
                      <p>
                        Chaque facture mensuelle comprend la{' '}
                        <span className="font-semibold text-ink">
                          TVA légale (20%)
                        </span>
                        .
                      </p>
                      <p>
                        La remise de 15% s'applique uniquement sur la{' '}
                        <span className="font-semibold text-ink">base HT</span>{' '}
                        avant calcul de la TVA.
                      </p>
                    </div>
                  </div>

                  {!isExporting && (
                    <>
                      <Button
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={genererPDF}
                      >
                        Télécharger le devis (PDF)
                      </Button>
                      <div className="text-center text-xs text-ink-3 pt-4 border-t border-line">
                        <p>
                          Ce devis est une estimation calculée en temps réel.
                        </p>
                        <p className="mt-1">
                          Un devis personnalisé sera établi après analyse de vos
                          besoins.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
