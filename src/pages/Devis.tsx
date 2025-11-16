import { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Card, CardHeader } from '@/components/Card';
import jsPDF from 'jspdf';

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
  const details: Array<{ palier: string; quantite: number; prixUnitaire: number; montant: number }> = [];

  for (let i = 0; i < paliersSlides.length; i++) {
    const palier = paliersSlides[i];
    const bornePrecedente = i === 0 ? 0 : paliersSlides[i - 1].max;

    // Si le nombre de slides dépasse le minimum du palier
    if (nombreSlides >= palier.min) {
      // Calculer la quantité dans ce palier
      const debutPalier = bornePrecedente + 1;
      const finPalier = palier.max === Infinity ? nombreSlides : Math.min(palier.max, nombreSlides);
      const quantiteDansPalier = finPalier - debutPalier + 1;

      if (quantiteDansPalier > 0) {
        const montantPalier = quantiteDansPalier * palier.prix;
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
  const heuresParModule = options.nombreModulesHeures > 0 
    ? Math.round((options.nombreHeures / options.nombreModulesHeures) * 10) / 10 
    : options.nombreHeures;

  const [devisCalcule, setDevisCalcule] = useState<number>(0);
  const [devisHT, setDevisHT] = useState<number>(0);
  const [detailsPaliers, setDetailsPaliers] = useState<
    Array<{ palier: string; quantite: number; prixUnitaire: number; montant: number }>
  >([]);

  const handleChange = (
    field: keyof DevisOptions,
    value: string | number | boolean
  ) => {
    setOptions((prev) => ({ ...prev, [field]: value }));
  };

  const genererPDF = () => {
    const doc = new jsPDF();
    let yPosition = 20;

    // En-tête
    doc.setFontSize(20);
    doc.setTextColor(138, 92, 246);
    doc.text('DEVIS CREATIO', 105, yPosition, { align: 'center' });
    yPosition += 10;

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, 105, yPosition, { align: 'center' });
    yPosition += 15;

    // Type de service
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Type de service :', 20, yPosition);
    yPosition += 7;
    doc.setFontSize(12);
    const typeServiceLabels: Record<string, string> = {
      slides: 'Création de slides',
      programme: 'Création de programme',
      evaluation: "Création d'évaluations",
      complet: 'Service complet',
    };
    doc.text(typeServiceLabels[options.typeService] || options.typeService, 20, yPosition);
    yPosition += 10;

    // Détails des services
      if (options.typeService === 'slides' || options.typeService === 'complet') {
      doc.setFontSize(14);
      doc.text('Heures de cours :', 20, yPosition);
      yPosition += 7;
      doc.setFontSize(12);
      const nombreSlidesPDF = options.nombreHeures * 5;
      const nombreModulesHeuresPDF = options.nombreModulesHeures || 1;
      const heuresParModulePDF = nombreModulesHeuresPDF > 1 
        ? Math.round((options.nombreHeures / nombreModulesHeuresPDF) * 10) / 10 
        : options.nombreHeures;
      
      doc.text(`${options.nombreHeures}h de cours (${nombreSlidesPDF} slides)`, 20, yPosition);
      yPosition += 5;
      
      if (nombreModulesHeuresPDF > 1) {
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text(`Répartition : ${options.nombreHeures}h ÷ ${nombreModulesHeuresPDF} modules = ${heuresParModulePDF}h par module`, 20, yPosition);
        yPosition += 5;
      }
      yPosition += 5;

      if (detailsPaliers.length > 0) {
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text('Calcul par paliers :', 20, yPosition);
        yPosition += 6;

        detailsPaliers.forEach((detail) => {
          doc.text(
            `  • ${detail.palier} : ${detail.quantite} × ${detail.prixUnitaire}€ = ${detail.montant.toLocaleString('fr-FR')}€`,
            20,
            yPosition
          );
          yPosition += 5;
        });
        yPosition += 3;
      }
    }

    if (options.typeService === 'programme' || options.typeService === 'complet') {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `Modules : ${options.nombreModules} × ${tarifs.module}€ = ${(options.nombreModules * tarifs.module).toLocaleString('fr-FR')}€`,
        20,
        yPosition
      );
      yPosition += 7;
    }

    if (options.typeService === 'evaluation' || options.typeService === 'complet') {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(
        `Évaluations : ${options.nombreEvaluations} × ${tarifs.evaluation}€ = ${(options.nombreEvaluations * tarifs.evaluation).toLocaleString('fr-FR')}€`,
        20,
        yPosition
      );
      yPosition += 7;
    }

    yPosition += 5;

    // Options
    doc.setFontSize(14);
    doc.text('Options :', 20, yPosition);
    yPosition += 7;
    doc.setFontSize(12);

    const formatLabels: Record<string, string> = {
      ppt: 'PowerPoint (PPT)',
      pdf: 'PDF',
      'les-deux': 'Les deux formats (+10%)',
    };
    doc.text(`Format : ${formatLabels[options.format]}`, 20, yPosition);
    yPosition += 6;

    const urgenceLabels: Record<string, string> = {
      standard: 'Standard (4-6 semaines)',
      express: 'Express (2-3 semaines, +25%)',
      urgent: 'Urgent (1-2 semaines, +50%)',
    };
    doc.text(`Délai : ${urgenceLabels[options.urgence]}`, 20, yPosition);
    yPosition += 6;

    if (options.miseAJourAnnuelle) {
      doc.text('Mise à jour annuelle : Oui (+20%)', 20, yPosition);
      yPosition += 6;
    }

    yPosition += 10;

    // Total
    doc.setFontSize(16);
    doc.setTextColor(138, 92, 246);
    doc.text('TOTAL HT :', 20, yPosition);
    doc.setFontSize(18);
    doc.text(`${devisHT.toLocaleString('fr-FR')}€`, 150, yPosition, { align: 'right' });
    yPosition += 8;

    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text('TVA (20%) :', 20, yPosition);
    doc.text(`${(devisCalcule - devisHT).toLocaleString('fr-FR')}€`, 150, yPosition, { align: 'right' });
    yPosition += 7;

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('TOTAL TTC :', 20, yPosition);
    doc.setFontSize(16);
    doc.text(`${devisCalcule.toLocaleString('fr-FR')}€`, 150, yPosition, { align: 'right' });

    // Pied de page
    yPosition = 280;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Ce devis est une estimation calculée en temps réel.', 105, yPosition, { align: 'center' });
    yPosition += 5;
    doc.text('Un devis personnalisé sera établi après analyse de vos besoins.', 105, yPosition, {
      align: 'center',
    });

    // Télécharger le PDF
    doc.save(`devis-creatio-${new Date().toISOString().split('T')[0]}.pdf`);
  };

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
      totalHT = options.nombreModules * tarifs.module;
    } else if (options.typeService === 'slides') {
      const resultSlides = calculerPrixSlides(nombreSlides);
      totalHT = resultSlides.totalHT;
      detailsPaliersSlides = resultSlides.details;
    } else if (options.typeService === 'evaluation') {
      totalHT = options.nombreEvaluations * tarifs.evaluation;
    } else if (options.typeService === 'complet') {
      const resultSlides = calculerPrixSlides(nombreSlides);
      totalHT =
        options.nombreModules * tarifs.module +
        resultSlides.totalHT +
        options.nombreEvaluations * tarifs.evaluation;
      detailsPaliersSlides = resultSlides.details;
    }

    // Ajout du format
    totalHT = totalHT * (1 + tarifs.format[options.format]);

    // Ajout de l'urgence
    totalHT = totalHT * (1 + tarifs.urgence[options.urgence]);

    // Ajout de la mise à jour annuelle
    if (options.miseAJourAnnuelle) {
      totalHT = totalHT * (1 + tarifs.miseAJourAnnuelle);
    }

    // Calcul TTC (HT + TVA 20%)
    const totalTTC = totalHT * (1 + tarifs.tva);

    setDevisHT(Math.round(totalHT));
    setDevisCalcule(Math.round(totalTTC));
    setDetailsPaliers(detailsPaliersSlides);
  }, [options, nombreSlides]);

  return (
    <div className="pt-[120px] pb-10 px-5 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Calculer votre devis</h1>
          <p className="text-xl text-[#6b6b7a] mb-8 max-w-3xl mx-auto">
            Obtenez une estimation instantanée du coût de création de vos supports pédagogiques
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire */}
          <div className="lg:col-span-2 space-y-6">
            <Card size="large">
              <CardHeader title="Type de service" size="large" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    value: 'slides',
                    label: 'Création de slides',
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
                          stroke="url(#grad-slides)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient id="grad-slides" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                      </svg>
                    ),
                  },
                  {
                    value: 'programme',
                    label: 'Création de programme',
                    icon: (
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" y="12" width="48" height="40" rx="4" stroke="#8a5cf6" strokeWidth="2" />
                        <path d="M16 22h32M16 30h32M16 38h24" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="48" cy="20" r="8" fill="url(#grad-programme)" />
                        <defs>
                          <linearGradient id="grad-programme" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                      </svg>
                    ),
                  },
                  {
                    value: 'evaluation',
                    label: "Création d'évaluations",
                    icon: (
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="12" y="8" width="40" height="48" rx="4" stroke="#8a5cf6" strokeWidth="2" />
                        <path d="M20 18h24M20 26h24M20 34h24M20 42h16" stroke="#71717a" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="46" cy="42" r="2" fill="#6366f1" />
                        <circle cx="46" cy="34" r="2" fill="#6366f1" />
                        <circle cx="46" cy="26" r="2" fill="#8a5cf6" />
                        <path
                          d="M54 8L58 12L54 16"
                          stroke="url(#grad-eval)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient id="grad-eval" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                      </svg>
                    ),
                  },
                  {
                    value: 'complet',
                    label: 'Service complet',
                    icon: (
                      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" y="8" width="48" height="48" rx="4" stroke="#8a5cf6" strokeWidth="2" />
                        <rect x="14" y="14" width="20" height="20" rx="2" fill="url(#grad-complet)" />
                        <path d="M38 20h10M38 28h10M38 36h10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="20" cy="38" r="4" fill="#6366f1" />
                        <path
                          d="M16 50l8 4 16-12"
                          stroke="url(#grad-complet-arrow)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient id="grad-complet" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 0.3 }} />
                            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 0.3 }} />
                          </linearGradient>
                          <linearGradient id="grad-complet-arrow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: '#8a5cf6', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                      </svg>
                    ),
                  },
                ].map((service) => (
                  <button
                    key={service.value}
                    onClick={() => handleChange('typeService', service.value)}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-300 text-left
                      ${
                        options.typeService === service.value
                          ? 'border-[#8a5cf6] bg-[rgba(138,92,246,0.1)]'
                          : 'border-white/10 bg-[#0f0f12] hover:border-[rgba(138,92,246,0.3)]'
                      }
                    `}
                  >
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">{service.icon}</div>
                    <div className="text-white font-bold text-sm">{service.label}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Nombre d'heures de cours */}
            {(options.typeService === 'slides' || options.typeService === 'complet') && (
              <Card size="square">
                <CardHeader title="Heures de cours à couvrir" size="large" />
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-3">
                      {options.nombreHeures}h de cours ({nombreSlides} slides)
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="500"
                      step="1"
                      value={options.nombreHeures}
                      onChange={(e) => handleChange('nombreHeures', parseInt(e.target.value))}
                      className="w-full h-4 bg-[#0f0f12] rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-[#71717a] mt-2">
                      <span>1h</span>
                      <span>500h</span>
                    </div>
                  </div>

                  {/* Répartition en modules */}
                  <div className="pt-4 border-t border-white/10">
                    <label className="block text-white/80 text-sm mb-3">
                      Répartition en modules
                    </label>
                    <div className="flex items-center gap-3 mb-3">
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={options.nombreModulesHeures}
                        onChange={(e) => handleChange('nombreModulesHeures', Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 px-3 py-2 bg-[#0f0f12] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#8a5cf6] transition-colors"
                      />
                      <span className="text-white/70 text-sm">module{options.nombreModulesHeures > 1 ? 's' : ''}</span>
                    </div>
                    {options.nombreModulesHeures > 1 && (
                      <div className="text-xs text-[#71717a] bg-[#0f0f12] p-3 rounded-lg border border-white/5">
                        <div className="font-semibold text-white/80 mb-1">Répartition :</div>
                        <div className="space-y-1">
                          <div>
                            {options.nombreHeures}h ÷ {options.nombreModulesHeures} module{options.nombreModulesHeures > 1 ? 's' : ''} = <span className="text-white font-semibold">{heuresParModule}h par module</span>
                          </div>
                          <div className="text-[#8a5cf6]">
                            ({Math.round(heuresParModule * 5)} slides par module)
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-[#71717a]">
                    Conversion : 1h de cours = 5 slides
                    <br />
                    Prix selon paliers cumulés (11€ → 3€ par slide)
                  </div>
                  {detailsPaliers.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="text-xs text-[#71717a] mb-2 font-semibold">Détail des paliers :</div>
                      <div className="space-y-1">
                        {detailsPaliers.map((detail, idx) => (
                          <div key={idx} className="flex justify-between text-xs text-white/70">
                            <span>
                              {detail.palier} : {detail.quantite} × {detail.prixUnitaire}€
                            </span>
                            <span className="font-semibold">{detail.montant}€</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Nombre de modules */}
            {(options.typeService === 'programme' || options.typeService === 'complet') && (
              <Card size="square">
                <CardHeader title="Nombre de modules" size="large" />
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      {options.nombreModules} module{options.nombreModules > 1 ? 's' : ''}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={options.nombreModules}
                      onChange={(e) => handleChange('nombreModules', parseInt(e.target.value))}
                      className="w-full h-2 bg-[#0f0f12] rounded-lg appearance-none cursor-pointer accent-[#8a5cf6]"
                    />
                    <div className="flex justify-between text-xs text-[#71717a] mt-1">
                      <span>1</span>
                      <span>20</span>
                    </div>
                  </div>
                  <div className="text-sm text-[#71717a]">
                    Prix unitaire : {tarifs.module}€ par module
                  </div>
                </div>
              </Card>
            )}

            {/* Nombre d'évaluations */}
            {(options.typeService === 'evaluation' || options.typeService === 'complet') && (
              <Card size="square">
                <CardHeader title="Nombre d'évaluations" size="large" />
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      {options.nombreEvaluations} évaluation{options.nombreEvaluations > 1 ? 's' : ''}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={options.nombreEvaluations}
                      onChange={(e) => handleChange('nombreEvaluations', parseInt(e.target.value))}
                      className="w-full h-2 bg-[#0f0f12] rounded-lg appearance-none cursor-pointer accent-[#8a5cf6]"
                    />
                    <div className="flex justify-between text-xs text-[#71717a] mt-1">
                      <span>0</span>
                      <span>50</span>
                    </div>
                  </div>
                  <div className="text-sm text-[#71717a]">
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
                  <label className="block text-white/80 text-sm mb-3">Format de livraison</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'ppt', label: 'PPT' },
                      { value: 'pdf', label: 'PDF' },
                      { value: 'les-deux', label: 'Les deux' },
                    ].map((format) => (
                      <button
                        key={format.value}
                        onClick={() => handleChange('format', format.value)}
                        className={`
                          p-3 rounded-lg border-2 transition-all duration-300
                          ${
                            options.format === format.value
                              ? 'border-[#8a5cf6] bg-[rgba(138,92,246,0.1)] text-white'
                              : 'border-white/10 bg-[#0f0f12] text-white/70 hover:border-[rgba(138,92,246,0.3)]'
                          }
                        `}
                      >
                        {format.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 text-sm mb-3">Délai de livraison</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'standard', label: 'Standard', desc: '4-6 semaines' },
                      { value: 'express', label: 'Express', desc: '2-3 semaines', bonus: '+25%' },
                      { value: 'urgent', label: 'Urgent', desc: '1-2 semaines', bonus: '+50%' },
                    ].map((urgence) => (
                      <button
                        key={urgence.value}
                        onClick={() => handleChange('urgence', urgence.value)}
                        className={`
                          p-3 rounded-lg border-2 transition-all duration-300 text-left
                          ${
                            options.urgence === urgence.value
                              ? 'border-[#8a5cf6] bg-[rgba(138,92,246,0.1)]'
                              : 'border-white/10 bg-[#0f0f12] hover:border-[rgba(138,92,246,0.3)]'
                          }
                        `}
                      >
                        <div className="text-white font-bold text-sm">{urgence.label}</div>
                        <div className="text-[#71717a] text-xs mt-1">{urgence.desc}</div>
                        {urgence.bonus && (
                          <div className="text-[#8a5cf6] text-xs mt-1 font-bold">
                            {urgence.bonus}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-[#0f0f12] rounded-lg border border-white/10">
                  <input
                    type="checkbox"
                    id="miseAJour"
                    checked={options.miseAJourAnnuelle}
                    onChange={(e) => handleChange('miseAJourAnnuelle', e.target.checked)}
                    className="w-5 h-5 rounded accent-[#8a5cf6] cursor-pointer"
                  />
                  <label htmlFor="miseAJour" className="text-white cursor-pointer flex-1">
                    <div className="font-bold text-sm">Mise à jour annuelle</div>
                    <div className="text-[#71717a] text-xs mt-1">
                      Révision annuelle des contenus (+20%)
                    </div>
                  </label>
                </div>
              </div>
            </Card>
          </div>

          {/* Résultat du devis */}
          <div className="lg:col-span-1">
            <Card size="tall" className="sticky top-[100px]">
              <CardHeader title="Votre devis" size="large" />
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-black text-white mb-2 flex items-baseline justify-center gap-2">
                    <span>{devisHT.toLocaleString('fr-FR')}€</span>
                    <span className="text-2xl text-[#71717a] font-normal">HT</span>
                  </div>
                  <div className="text-[#71717a] text-xs mb-1">
                    TTC : {devisCalcule.toLocaleString('fr-FR')}€
                  </div>
                  <div className="text-[#8a5cf6] text-xs mt-2 font-bold animate-pulse">
                    Calcul en temps réel
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  {/* Heures de cours */}
                  {(options.typeService === 'slides' || options.typeService === 'complet') && (
                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#71717a]">Heures de cours</span>
                        <span className="text-white">
                          {options.nombreHeures}h ({nombreSlides} slides)
                        </span>
                      </div>
                      {options.nombreModulesHeures > 1 && (
                        <div className="text-xs text-[#71717a] pl-2">
                          Réparti en {options.nombreModulesHeures} module{options.nombreModulesHeures > 1 ? 's' : ''} : {heuresParModule}h par module
                        </div>
                      )}
                    </div>
                  )}

                  {/* Détails des paliers pour les slides */}
                  {detailsPaliers.length > 0 && (
                    <>
                      <div className="text-xs text-[#71717a] font-semibold mb-2">
                        Calcul par paliers (slides) :
                      </div>
                      {detailsPaliers.map((detail, idx) => (
                        <div key={idx} className="flex justify-between text-xs text-white/70 pl-2">
                          <span>
                            {detail.palier} : {detail.quantite} × {detail.prixUnitaire}€
                          </span>
                          <span className="font-semibold">{detail.montant.toLocaleString('fr-FR')}€</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-white/5"></div>
                    </>
                  )}

                  {/* Modules */}
                  {(options.typeService === 'programme' || options.typeService === 'complet') &&
                    options.nombreModules > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#71717a]">Modules</span>
                        <span className="text-white">
                          {options.nombreModules} × {tarifs.module}€ ={' '}
                          {(options.nombreModules * tarifs.module).toLocaleString('fr-FR')}€
                        </span>
                      </div>
                    )}

                  {/* Évaluations */}
                  {(options.typeService === 'evaluation' || options.typeService === 'complet') &&
                    options.nombreEvaluations > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#71717a]">Évaluations</span>
                        <span className="text-white">
                          {options.nombreEvaluations} × {tarifs.evaluation}€ ={' '}
                          {(options.nombreEvaluations * tarifs.evaluation).toLocaleString('fr-FR')}€
                        </span>
                      </div>
                    )}

                  {options.format === 'les-deux' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#71717a]">Format double</span>
                      <span className="text-white">+10%</span>
                    </div>
                  )}
                  {options.urgence !== 'standard' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#71717a]">Délai {options.urgence}</span>
                      <span className="text-white">
                        +{tarifs.urgence[options.urgence] * 100}%
                      </span>
                    </div>
                  )}
                  {options.miseAJourAnnuelle && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#71717a]">Mise à jour annuelle</span>
                      <span className="text-white">+20%</span>
                    </div>
                  )}

                  {/* Total HT et TVA */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex justify-between text-sm font-semibold mb-1">
                      <span className="text-white">Total HT</span>
                      <span className="text-white">{devisHT.toLocaleString('fr-FR')}€</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#71717a]">
                      <span>TVA (20%)</span>
                      <span>{(devisCalcule - devisHT).toLocaleString('fr-FR')}€</span>
                    </div>
                  </div>
                </div>

                {/* Sélection du mode de paiement */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-[#8a5cf6] mb-3">Mode de paiement</h4>
                  <div className="space-y-3">
                    {/* Option comptant */}
                    <div
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        !options.paiementEchelonne
                          ? 'border-[#8a5cf6] bg-[rgba(138,92,246,0.1)]'
                          : 'border-white/10 bg-[#0f0f12] hover:border-[rgba(138,92,246,0.3)]'
                      }`}
                      onClick={() => handleChange('paiementEchelonne', false)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-white text-sm">Paiement comptant</div>
                          <div className="text-xs text-[#71717a] mt-1">
                            Remise de 15% sur le montant HT
                          </div>
                        </div>
                        {!options.paiementEchelonne && (
                          <div className="w-5 h-5 rounded-full bg-[#8a5cf6] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                        {options.paiementEchelonne && (
                          <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
                        )}
                      </div>
                      {!options.paiementEchelonne && devisHT > 0 && (
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <div className="text-xs text-[#71717a]">Montant avec remise :</div>
                          <div className="text-white font-semibold text-sm mt-1">
                            {(devisHT * 0.85).toLocaleString('fr-FR')}€ HT
                            <span className="text-[#71717a] text-xs ml-2 font-normal">
                              ({(devisHT * 0.85 * 1.2).toLocaleString('fr-FR')}€ TTC)
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Option échelonné */}
                    <div
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        options.paiementEchelonne
                          ? 'border-[#8a5cf6] bg-[rgba(138,92,246,0.1)]'
                          : 'border-white/10 bg-[#0f0f12] hover:border-[rgba(138,92,246,0.3)]'
                      }`}
                      onClick={() => handleChange('paiementEchelonne', true)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="font-semibold text-white text-sm">Paiement échelonné</div>
                          <div className="text-xs text-[#71717a] mt-1">
                            Sans remise, paiement mensuel
                          </div>
                        </div>
                        {options.paiementEchelonne && (
                          <div className="w-5 h-5 rounded-full bg-[#8a5cf6] flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          </div>
                        )}
                        {!options.paiementEchelonne && (
                          <div className="w-5 h-5 rounded-full border-2 border-white/30"></div>
                        )}
                      </div>

                      {options.paiementEchelonne && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <label className="block text-xs text-white/80 mb-2">
                            Nombre de mois
                          </label>
                          <div className="flex gap-2 mb-2">
                            {[4, 6, 10].map((mois) => (
                              <button
                                key={mois}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleChange('nombreMoisEchelonnement', mois);
                                }}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-300 ${
                                  options.nombreMoisEchelonnement === mois
                                    ? 'bg-[#8a5cf6] text-white'
                                    : 'bg-[#0f0f12] text-white/70 border border-white/10 hover:border-[rgba(138,92,246,0.3)]'
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
                            onChange={(e) => {
                              const value = Math.max(2, Math.min(24, parseInt(e.target.value) || 2));
                              handleChange('nombreMoisEchelonnement', value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full px-3 py-2 bg-[#0f0f12] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#8a5cf6] transition-colors"
                            placeholder="Nombre de mois"
                          />
                          {devisCalcule > 0 && (
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <div className="text-xs text-[#71717a]">Mensualité TTC :</div>
                              <div className="text-white font-semibold text-sm mt-1">
                                {(devisCalcule / options.nombreMoisEchelonnement).toLocaleString('fr-FR', {
                                  maximumFractionDigits: 2,
                                })}
                                € / mois
                                <span className="text-[#71717a] text-xs ml-2 font-normal">
                                  ({options.nombreMoisEchelonnement} mensualités)
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
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold text-[#8a5cf6] mb-2">Remise conditionnelle</h4>
                    <div className="bg-[rgba(138,92,246,0.1)] border border-[rgba(138,92,246,0.3)] rounded-lg p-3 text-xs">
                      <div className="text-white/90 leading-relaxed">
                        En cas de règlement en une seule fois à la signature, une remise de{' '}
                        <span className="font-bold text-[#8a5cf6]">15%</span> est appliquée sur le montant HT global.
                      </div>
                    </div>
                  </div>
                )}

                {/* Modalités TVA */}
                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-sm font-bold text-[#8a5cf6] mb-2">Modalités TVA</h4>
                  <div className="text-xs text-white/80 leading-relaxed space-y-1">
                    <p>
                      Chaque facture mensuelle comprend la <span className="font-semibold text-white">TVA légale (20%)</span>.
                    </p>
                    <p>
                      La remise de 15% s'applique uniquement sur la <span className="font-semibold text-white">base HT</span> avant calcul de la TVA.
                    </p>
                  </div>
                </div>

                <Button variant="primary" size="lg" className="w-full" onClick={genererPDF}>
                  Télécharger le devis (PDF)
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Demander un devis personnalisé
                </Button>
                <div className="text-center text-xs text-[#71717a] pt-4 border-t border-white/10">
                  <p>Ce devis est une estimation calculée en temps réel.</p>
                  <p className="mt-1">Un devis personnalisé sera établi après analyse de vos besoins.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

