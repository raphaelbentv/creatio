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

  const handleChange = (
    field: keyof DevisOptions,
    value: string | number | boolean
  ) => {
    setOptions(prev => ({ ...prev, [field]: value }));
  };

  const genererPDF = () => {
    const doc = new jsPDF();
    const pageWidth = 595.27; // A4 width in points
    const pageHeight = 841.89; // A4 height in points
    const marginLeft = 40;
    const marginRight = pageWidth - 40;
    const centerX = pageWidth / 2;

    // Couleurs
    const colors = {
      background: [9, 9, 11], // #09090b
      backgroundSecondary: [15, 15, 18], // #0f0f12
      violet: [138, 92, 246], // #8a5cf6
      blue: [99, 102, 241], // #6366f1
      white: [255, 255, 255],
      gray: [113, 113, 122], // #71717a
      borderDark: [24, 24, 27], // #18181b
    };

    // Calculs des montants
    const tva = Math.floor(devisCalcule - devisHT);
    const remiseHT = Math.floor(devisHT * 0.85 * 100) / 100;
    const remiseTTC = Math.floor(remiseHT * 1.2 * 100) / 100;

    // Échéances : toujours basées sur le montant HT normal (sans remise)
    // car la remise ne s'applique qu'au paiement comptant
    const echeances = {
      '4': {
        ht: Math.floor((devisHT / 4) * 100) / 100,
        ttc: Math.floor((devisCalcule / 4) * 100) / 100,
      },
      '6': {
        ht: Math.floor((devisHT / 6) * 100) / 100,
        ttc: Math.floor((devisCalcule / 6) * 100) / 100,
      },
      '10': {
        ht: Math.floor((devisHT / 10) * 100) / 100,
        ttc: Math.floor((devisCalcule / 10) * 100) / 100,
      },
    };

    // Date formatée
    const dateFormatted = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    // Fonction helper pour formater les nombres
    const formatNumber = (num: number) => {
      return num.toLocaleString('fr-FR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

    // Fonction helper pour dessiner une ligne
    const drawLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: number[],
      width: number = 1
    ) => {
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setLineWidth(width);
      doc.line(x1, y1, x2, y2);
    };

    // Fonction helper pour dessiner un rectangle arrondi
    const drawRoundedRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number,
      fillColor?: number[],
      strokeColor?: number[],
      strokeWidth?: number
    ) => {
      if (fillColor) {
        doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
        doc.roundedRect(x, y, w, h, r, r, 'F');
      }
      if (strokeColor) {
        doc.setDrawColor(strokeColor[0], strokeColor[1], strokeColor[2]);
        doc.setLineWidth(strokeWidth || 1);
        doc.roundedRect(x, y, w, h, r, r, 'S');
      }
    };

    // ========== PAGE 1 ==========
    doc.setFillColor(
      colors.background[0],
      colors.background[1],
      colors.background[2]
    );
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    let y = 60; // Position verticale depuis le haut

    // Header avec bordure violette
    drawLine(0, y, pageWidth, y, colors.violet, 3);
    y += 20;

    // Logo et date
    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
    doc.text('CREATIO', marginLeft, y);
    y += 12;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text('by Venio', marginLeft, y);
    y += 8;

    doc.setFontSize(9);
    doc.text(`Date: ${dateFormatted}`, marginRight, y - 20, { align: 'right' });
    y += 10;

    // Ligne de séparation
    drawLine(marginLeft, y, marginRight, y, colors.borderDark, 1);
    y += 30;

    // Titre principal
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text('Votre Devis', marginLeft, y);
    y += 40;

    // Card montant principal
    const cardWidth = pageWidth - marginLeft * 2;
    const cardHeight = 100;
    const cardX = marginLeft;
    const cardY = y;

    drawRoundedRect(
      cardX,
      cardY,
      cardWidth,
      cardHeight,
      12,
      colors.backgroundSecondary,
      colors.violet,
      1.5
    );

    y += 28;

    // Montant HT
    doc.setFontSize(48);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    const montantHTText = `${formatNumber(devisHT)}€`;
    doc.text(montantHTText, cardX + 28, y);

    // "HT" à droite
    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text('HT', cardX + cardWidth - 28, y, { align: 'right' });

    y += 20;

    // Montant TTC
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
    doc.text(`${formatNumber(devisCalcule)}€ TTC`, cardX + 28, y);

    y = cardY + cardHeight + 30;

    // Section calcul
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text('Calcul en temps réel', marginLeft, y);
    y += 20;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text(
      `Heures de cours : ${options.nombreHeures}h (${nombreSlides} slides)`,
      marginLeft,
      y
    );
    y += 40;

    // Tableau des paliers
    if (detailsPaliers.length > 0) {
      const tableX = marginLeft;
      const tableY = y;
      const col1Width = 120;
      const col2Width = 150;
      const col3Width = 120;
      const rowHeight = 24;
      const cellPadding = 15;

      // En-tête du tableau
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);

      // Colonne 1: PALIER
      doc.text('PALIER', tableX + cellPadding, tableY + 8);
      // Colonne 2: CALCUL
      doc.text('CALCUL', tableX + col1Width + cellPadding, tableY + 8);
      // Colonne 3: MONTANT
      doc.text(
        'MONTANT',
        tableX + col1Width + col2Width + col3Width - cellPadding,
        tableY + 8,
        { align: 'right' }
      );

      // Ligne de séparation en-tête
      drawLine(
        tableX,
        tableY + 12,
        tableX + col1Width + col2Width + col3Width,
        tableY + 12,
        colors.borderDark,
        1
      );

      y = tableY + rowHeight;

      // Lignes du tableau
      detailsPaliers.forEach((detail, index) => {
        // Background alterné (couleur plus claire pour simuler l'opacité)
        if (index % 2 === 0) {
          const bgColor = [
            Math.min(255, colors.backgroundSecondary[0] + 3),
            Math.min(255, colors.backgroundSecondary[1] + 3),
            Math.min(255, colors.backgroundSecondary[2] + 3),
          ];
          doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
          doc.rect(
            tableX,
            y - rowHeight,
            col1Width + col2Width + col3Width,
            rowHeight,
            'F'
          );
        }

        // Colonne 1: Range
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
        doc.text(detail.palier, tableX + cellPadding, y - 8);

        // Colonne 2: Calcul
        doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
        doc.text(
          `${detail.quantite} × ${detail.prixUnitaire}€`,
          tableX + col1Width + cellPadding,
          y - 8
        );

        // Colonne 3: Montant
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
        doc.text(
          `${formatNumber(detail.montant)}€`,
          tableX + col1Width + col2Width + col3Width - cellPadding,
          y - 8,
          { align: 'right' }
        );

        y += rowHeight;
      });
    }

    y += 20;

    // Ligne de séparation violette
    drawLine(marginLeft, y, marginRight, y, colors.violet, 1);
    y += 15;

    // Options supplémentaires
    if (options.format === 'les-deux') {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text('Format double', marginLeft, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
      doc.text('+10%', marginRight, y, { align: 'right' });
      y += 15;
    }

    if (options.urgence !== 'standard') {
      const urgenceLabels: Record<string, string> = {
        express: '+25%',
        urgent: '+50%',
      };
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text(`Délai ${options.urgence}`, marginLeft, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
      doc.text(urgenceLabels[options.urgence] || '', marginRight, y, {
        align: 'right',
      });
      y += 15;
    }

    if (options.miseAJourAnnuelle) {
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text('Mise à jour annuelle', marginLeft, y);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
      doc.text('+20%', marginRight, y, { align: 'right' });
      y += 15;
    }

    // Ligne de séparation grise
    drawLine(marginLeft, y, marginRight, y, colors.borderDark, 1);
    y += 20;

    // Totaux
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text('Total HT', marginLeft, y);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
    doc.text(`${formatNumber(devisHT)}€`, marginRight, y, { align: 'right' });
    y += 12;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text('TVA (20%)', marginLeft, y);
    doc.text(`${formatNumber(tva)}€`, marginRight, y, { align: 'right' });

    // ========== PAGE 2 ==========
    doc.addPage();

    // Background
    doc.setFillColor(
      colors.background[0],
      colors.background[1],
      colors.background[2]
    );
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    y = 60;

    // Header simplifié
    drawLine(0, y, pageWidth, y, colors.violet, 3);
    y += 20;

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
    doc.text('CREATIO', marginLeft, y);
    y += 50;

    // Section remise
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text('Remise conditionnelle', marginLeft, y);
    y += 20;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    const remiseText =
      'En cas de règlement en une seule fois à la signature, une remise de 15% est appliquée sur le montant HT global.';
    const remiseLines = doc.splitTextToSize(remiseText, cardWidth - 56);
    doc.text(remiseLines, marginLeft, y);
    y += remiseLines.length * 6 + 20;

    // Card montant avec remise
    const remiseCardWidth = cardWidth;
    const remiseCardHeight = 100;
    const remiseCardX = marginLeft;
    const remiseCardY = y;

    drawRoundedRect(
      remiseCardX,
      remiseCardY,
      remiseCardWidth,
      remiseCardHeight,
      12,
      colors.backgroundSecondary,
      colors.violet,
      1.5
    );

    y += 32;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text('Montant avec remise :', remiseCardX + 32, y);
    y += 20;

    doc.setFontSize(32);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
    doc.text(`${formatNumber(remiseHT)}€`, remiseCardX + 32, y);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text('HT', remiseCardX + remiseCardWidth - 32, y, { align: 'right' });
    y += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text(`(${formatNumber(remiseTTC)}€ TTC)`, centerX, y, {
      align: 'center',
    });

    y = remiseCardY + remiseCardHeight + 50;

    // Calendrier d'échéances
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text("Calendrier d'échéances", marginLeft, y);
    y += 30;

    const cardWidthEcheance = (pageWidth - marginLeft * 2 - 40) / 3;
    const cardHeightEcheance = 100;
    const cardSpacing = 20;

    const echeancesData = [
      { mois: '4', data: echeances['4'] },
      { mois: '6', data: echeances['6'] },
      { mois: '10', data: echeances['10'] },
    ];

    echeancesData.forEach((echeance, index) => {
      const cardX = marginLeft + index * (cardWidthEcheance + cardSpacing);
      const cardY = y;

      // Card échéance
      drawRoundedRect(
        cardX,
        cardY,
        cardWidthEcheance,
        cardHeightEcheance,
        10,
        colors.backgroundSecondary,
        colors.borderDark,
        1
      );

      // Mois
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.violet[0], colors.violet[1], colors.violet[2]);
      doc.text(
        `${echeance.mois} mois`,
        cardX + cardWidthEcheance / 2,
        cardY + 25,
        { align: 'center' }
      );

      // Montant HT
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
      doc.text(
        `${formatNumber(echeance.data.ht)}€ HT/mois`,
        cardX + cardWidthEcheance / 2,
        cardY + 45,
        { align: 'center' }
      );

      // Montant TTC
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
      doc.text(
        `(${formatNumber(echeance.data.ttc)}€ TTC/mois)`,
        cardX + cardWidthEcheance / 2,
        cardY + 60,
        { align: 'center' }
      );
    });

    y += cardHeightEcheance + 50;

    // Modalités TVA
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.white[0], colors.white[1], colors.white[2]);
    doc.text('Modalités TVA', marginLeft, y);
    y += 20;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text(
      '• Chaque facture mensuelle comprend la TVA légale (20%).',
      marginLeft,
      y
    );
    y += 12;

    const modaliteText =
      "• La remise de 15% s'applique uniquement sur la base HT avant calcul de la TVA.";
    const modaliteLines = doc.splitTextToSize(modaliteText, cardWidth - 56);
    doc.text(modaliteLines, marginLeft, y);

    // Footer
    y = pageHeight - 60;
    drawLine(marginLeft, y, marginRight, y, colors.borderDark, 1);
    y += 15;

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.gray[0], colors.gray[1], colors.gray[2]);
    doc.text(
      'Creatio by Venio • Solutions pédagogiques nouvelle génération',
      centerX,
      y,
      { align: 'center' }
    );
    y += 8;
    doc.text('creatio.paris • contact@venio.fr', centerX, y, {
      align: 'center',
    });

    // Métadonnées PDF
    doc.setProperties({
      title: `Devis Creatio - ${formatNumber(devisHT)}€`,
      subject: 'Devis personnalisé - Solutions pédagogiques',
      author: 'Creatio by Venio',
      creator: 'Creatio Quote Generator',
      keywords: 'devis, formation, pédagogie, creatio',
    });

    // Télécharger le PDF
    doc.save(`devis-creatio-${new Date().toISOString().split('T')[0]}.pdf`);
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
    <div className="pt-[100px] pb-10 px-5 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">
            Calculer votre devis
          </h1>
          <p className="text-xl text-[#6b6b7a] mb-8 max-w-3xl mx-auto">
            Obtenez une estimation instantanée du coût de création de vos
            supports pédagogiques
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Formulaire */}
          <div className="lg:col-span-2 space-y-6 flex flex-col">
            <Card size="large">
              <CardHeader title="Type de service" size="large" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    value: 'slides',
                    label: 'Création de slides',
                    icon: (
                      <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="10"
                          y="8"
                          width="44"
                          height="32"
                          rx="3"
                          stroke="#8a5cf6"
                          strokeWidth="2"
                        />
                        <rect
                          x="14"
                          y="14"
                          width="12"
                          height="8"
                          fill="#6366f1"
                        />
                        <rect
                          x="28"
                          y="14"
                          width="22"
                          height="2"
                          fill="#71717a"
                        />
                        <rect
                          x="28"
                          y="18"
                          width="18"
                          height="2"
                          fill="#71717a"
                        />
                        <rect
                          x="14"
                          y="26"
                          width="36"
                          height="2"
                          fill="#71717a"
                        />
                        <rect
                          x="14"
                          y="30"
                          width="30"
                          height="2"
                          fill="#71717a"
                        />
                        <path
                          d="M20 44l12 8 22-16"
                          stroke="url(#grad-slides)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="grad-slides"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: '#8a5cf6', stopOpacity: 1 }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: '#6366f1', stopOpacity: 1 }}
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    ),
                  },
                  {
                    value: 'programme',
                    label: 'Création de programme',
                    icon: (
                      <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="8"
                          y="12"
                          width="48"
                          height="40"
                          rx="4"
                          stroke="#8a5cf6"
                          strokeWidth="2"
                        />
                        <path
                          d="M16 22h32M16 30h32M16 38h24"
                          stroke="#6366f1"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="48"
                          cy="20"
                          r="8"
                          fill="url(#grad-programme)"
                        />
                        <defs>
                          <linearGradient
                            id="grad-programme"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: '#8a5cf6', stopOpacity: 1 }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: '#6366f1', stopOpacity: 1 }}
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    ),
                  },
                  {
                    value: 'evaluation',
                    label: "Création d'évaluations",
                    icon: (
                      <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="12"
                          y="8"
                          width="40"
                          height="48"
                          rx="4"
                          stroke="#8a5cf6"
                          strokeWidth="2"
                        />
                        <path
                          d="M20 18h24M20 26h24M20 34h24M20 42h16"
                          stroke="#71717a"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
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
                          <linearGradient
                            id="grad-eval"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: '#8a5cf6', stopOpacity: 1 }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: '#6366f1', stopOpacity: 1 }}
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    ),
                  },
                  {
                    value: 'complet',
                    label: 'Service complet',
                    icon: (
                      <svg
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="8"
                          y="8"
                          width="48"
                          height="48"
                          rx="4"
                          stroke="#8a5cf6"
                          strokeWidth="2"
                        />
                        <rect
                          x="14"
                          y="14"
                          width="20"
                          height="20"
                          rx="2"
                          fill="url(#grad-complet)"
                        />
                        <path
                          d="M38 20h10M38 28h10M38 36h10"
                          stroke="#6366f1"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="20" cy="38" r="4" fill="#6366f1" />
                        <path
                          d="M16 50l8 4 16-12"
                          stroke="url(#grad-complet-arrow)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <defs>
                          <linearGradient
                            id="grad-complet"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: '#8a5cf6', stopOpacity: 0.3 }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: '#6366f1', stopOpacity: 0.3 }}
                            />
                          </linearGradient>
                          <linearGradient
                            id="grad-complet-arrow"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              style={{ stopColor: '#8a5cf6', stopOpacity: 1 }}
                            />
                            <stop
                              offset="100%"
                              style={{ stopColor: '#6366f1', stopOpacity: 1 }}
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    ),
                  },
                ].map(service => (
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
                    <div className="w-12 h-12 mb-3 flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div className="text-white font-bold text-sm">
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
                    <label className="block text-white/80 text-sm mb-3">
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
                        onChange={e =>
                          handleChange(
                            'nombreModulesHeures',
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        className="w-20 px-3 py-2 bg-[#0f0f12] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-[#8a5cf6] transition-colors"
                      />
                      <span className="text-white/70 text-sm">
                        module{options.nombreModulesHeures > 1 ? 's' : ''}
                      </span>
                    </div>
                    {options.nombreModulesHeures > 1 && (
                      <div className="text-xs text-[#71717a] bg-[#0f0f12] p-3 rounded-lg border border-white/5">
                        <div className="font-semibold text-white/80 mb-1">
                          Répartition :
                        </div>
                        <div className="space-y-1">
                          <div>
                            {options.nombreHeures}h ÷{' '}
                            {options.nombreModulesHeures} module
                            {options.nombreModulesHeures > 1 ? 's' : ''} ={' '}
                            <span className="text-white font-semibold">
                              {heuresParModule}h par module
                            </span>
                          </div>
                          <div className="text-[#8a5cf6]">
                            ({Math.round(heuresParModule * 5)} slides par
                            module)
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
                      <div className="text-xs text-[#71717a] mb-2 font-semibold">
                        Détail des paliers :
                      </div>
                      <div className="space-y-1">
                        {detailsPaliers.map((detail, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-xs text-white/70"
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
                    <label className="block text-white/80 text-sm mb-2">
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
            {(options.typeService === 'evaluation' ||
              options.typeService === 'complet') && (
              <Card size="square">
                <CardHeader title="Nombre d'évaluations" size="large" />
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">
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
                  <label className="block text-white/80 text-sm mb-3">
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
                  <label className="block text-white/80 text-sm mb-3">
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
                              ? 'border-[#8a5cf6] bg-[rgba(138,92,246,0.1)]'
                              : 'border-white/10 bg-[#0f0f12] hover:border-[rgba(138,92,246,0.3)]'
                          }
                        `}
                      >
                        <div className="text-white font-bold text-sm">
                          {urgence.label}
                        </div>
                        <div className="text-[#71717a] text-xs mt-1">
                          {urgence.desc}
                        </div>
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
                    onChange={e =>
                      handleChange('miseAJourAnnuelle', e.target.checked)
                    }
                    className="w-5 h-5 rounded accent-[#8a5cf6] cursor-pointer"
                  />
                  <label
                    htmlFor="miseAJour"
                    className="text-white cursor-pointer flex-1"
                  >
                    <div className="font-bold text-sm">
                      Mise à jour annuelle
                    </div>
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
            <div className="card-gradient rounded-3xl p-6 border border-white/6 transition-all duration-400 sticky top-0 w-full overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.03)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(138,92,246,0.15),0_4px_12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-[rgba(138,92,246,0.25)]">
              <div className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl p-px bg-gradient-to-br from-[rgba(138,92,246,0.3)] via-[rgba(99,102,241,0.15)] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400 -z-10"></div>
              <div
                className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-0 hover:opacity-100 transition-opacity duration-400 -z-10"
                style={{
                  background:
                    'radial-gradient(circle, rgba(138, 92, 246, 0.08) 0%, transparent 70%)',
                }}
              ></div>
              <div className="relative z-10">
                <CardHeader title="Votre devis" size="large" />
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-black text-white mb-2 flex items-baseline justify-center gap-2">
                      <span>{devisHT.toLocaleString('fr-FR')}€</span>
                      <span className="text-2xl text-[#71717a] font-normal">
                        HT
                      </span>
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
                    {(options.typeService === 'slides' ||
                      options.typeService === 'complet') && (
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-[#71717a]">
                            Heures de cours
                          </span>
                          <span className="text-white">
                            {options.nombreHeures}h ({nombreSlides} slides)
                          </span>
                        </div>
                        {options.nombreModulesHeures > 1 && (
                          <div className="text-xs text-[#71717a] pl-2">
                            Réparti en {options.nombreModulesHeures} module
                            {options.nombreModulesHeures > 1 ? 's' : ''} :{' '}
                            {heuresParModule}h par module
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
                          <div
                            key={idx}
                            className="flex justify-between text-xs text-white/70 pl-2"
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
                        <div className="pt-2 border-t border-white/5"></div>
                      </>
                    )}

                    {/* Modules */}
                    {(options.typeService === 'programme' ||
                      options.typeService === 'complet') &&
                      options.nombreModules > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#71717a]">Modules</span>
                          <span className="text-white">
                            {options.nombreModules} × {tarifs.module}€ ={' '}
                            {(
                              options.nombreModules * tarifs.module
                            ).toLocaleString('fr-FR')}
                            €
                          </span>
                        </div>
                      )}

                    {/* Évaluations */}
                    {(options.typeService === 'evaluation' ||
                      options.typeService === 'complet') &&
                      options.nombreEvaluations > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[#71717a]">Évaluations</span>
                          <span className="text-white">
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
                        <span className="text-[#71717a]">Format double</span>
                        <span className="text-white">+10%</span>
                      </div>
                    )}
                    {options.urgence !== 'standard' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#71717a]">
                          Délai {options.urgence}
                        </span>
                        <span className="text-white">
                          +{tarifs.urgence[options.urgence] * 100}%
                        </span>
                      </div>
                    )}
                    {options.miseAJourAnnuelle && (
                      <div className="flex justify-between text-sm">
                        <span className="text-[#71717a]">
                          Mise à jour annuelle
                        </span>
                        <span className="text-white">+20%</span>
                      </div>
                    )}

                    {/* Total HT et TVA */}
                    <div className="pt-2 border-t border-white/10">
                      <div className="flex justify-between text-sm font-semibold mb-1">
                        <span className="text-white">Total HT</span>
                        <span className="text-white">
                          {devisHT.toLocaleString('fr-FR')}€
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-[#71717a]">
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
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold text-[#8a5cf6] mb-3">
                      Mode de paiement
                    </h4>
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
                            <div className="font-semibold text-white text-sm">
                              Paiement comptant
                            </div>
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
                            <div className="text-xs text-[#71717a]">
                              Montant avec remise :
                            </div>
                            <div className="text-white font-semibold text-sm mt-1">
                              {Math.floor(devisHT * 0.85).toLocaleString(
                                'fr-FR'
                              )}
                              € HT
                              <span className="text-[#71717a] text-xs ml-2 font-normal">
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
                            ? 'border-[#8a5cf6] bg-[rgba(138,92,246,0.1)]'
                            : 'border-white/10 bg-[#0f0f12] hover:border-[rgba(138,92,246,0.3)]'
                        }`}
                        onClick={() => handleChange('paiementEchelonne', true)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="font-semibold text-white text-sm">
                              Paiement échelonné
                            </div>
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
                              onChange={e => {
                                const value = Math.max(
                                  2,
                                  Math.min(24, parseInt(e.target.value) || 2)
                                );
                                handleChange('nombreMoisEchelonnement', value);
                              }}
                              onClick={e => e.stopPropagation()}
                              className="w-full px-3 py-2 bg-[#0f0f12] border border-white/10 rounded-lg text-white text-xs focus:outline-none focus:border-[#8a5cf6] transition-colors"
                              placeholder="Nombre de mois"
                            />
                            {devisCalcule > 0 && (
                              <div className="mt-3 pt-3 border-t border-white/10">
                                <div className="text-xs text-[#71717a]">
                                  Mensualité TTC :
                                </div>
                                <div className="text-white font-semibold text-sm mt-1">
                                  {Math.floor(
                                    devisCalcule /
                                      options.nombreMoisEchelonnement
                                  ).toLocaleString('fr-FR')}
                                  € / mois
                                  <span className="text-[#71717a] text-xs ml-2 font-normal">
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
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="text-sm font-bold text-[#8a5cf6] mb-2">
                        Remise conditionnelle
                      </h4>
                      <div className="bg-[rgba(138,92,246,0.1)] border border-[rgba(138,92,246,0.3)] rounded-lg p-3 text-xs">
                        <div className="text-white/90 leading-relaxed">
                          En cas de règlement en une seule fois à la signature,
                          une remise de{' '}
                          <span className="font-bold text-[#8a5cf6]">15%</span>{' '}
                          est appliquée sur le montant HT global.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Modalités TVA */}
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold text-[#8a5cf6] mb-2">
                      Modalités TVA
                    </h4>
                    <div className="text-xs text-white/80 leading-relaxed space-y-1">
                      <p>
                        Chaque facture mensuelle comprend la{' '}
                        <span className="font-semibold text-white">
                          TVA légale (20%)
                        </span>
                        .
                      </p>
                      <p>
                        La remise de 15% s'applique uniquement sur la{' '}
                        <span className="font-semibold text-white">
                          base HT
                        </span>{' '}
                        avant calcul de la TVA.
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={genererPDF}
                  >
                    Télécharger le devis (PDF)
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    Demander un devis personnalisé
                  </Button>
                  <div className="text-center text-xs text-[#71717a] pt-4 border-t border-white/10">
                    <p>Ce devis est une estimation calculée en temps réel.</p>
                    <p className="mt-1">
                      Un devis personnalisé sera établi après analyse de vos
                      besoins.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
