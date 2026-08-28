/* Contenu du site, en un seul endroit.
   La home (grille de tuiles), /services et /avantages puisent tous ici :
   c'est ce qui rend le découpage en pages tenable — une donnée, un lieu. */

import type { IconName } from '@/components/Icon';

export const services = [
  {
    icon: 'programme' as IconName,
    title: 'Création de programmes',
    description:
      'Des programmes qui respectent les indispensables de la formation, tout en intégrant les aspects modernes des différentes disciplines (IA, CRM, etc.).',
    detail: 'à partir de 2 semaines',
  },
  {
    icon: 'slides' as IconName,
    title: 'Création de slides',
    description:
      "Des slides denses en contenu de cours, exploitables par les intervenants et les étudiants, en format PPT ou PDF pour s'adapter à tous les types d'enseignement.",
    detail: 'PPT · PDF',
  },
  {
    icon: 'evaluation' as IconName,
    title: "Création d'évaluations",
    description:
      'QCM, études de cas et grilles de correction alignés sur les objectifs pédagogiques de chaque module.',
    detail: 'Qualiopi',
  },
  {
    icon: 'refresh' as IconName,
    title: 'Mise à jour annuelle',
    description:
      'Actualisation des contenus livrés, sur demande ou dans le cadre d’un partenariat régulier.',
    detail: 'annuel',
  },
];

export const stats = [
  { value: '100+', label: 'Programmes créés' },
  { value: '500+', label: 'Slides livrées' },
  { value: '95 %', label: 'Satisfaction client' },
  { value: '24/7', label: 'Disponibilité cloud' },
];

export const features = [
  {
    icon: 'bolt' as IconName,
    title: 'Gain de temps',
    description:
      'Libérez vos ressources internes de la production de contenus. Creatio prend en charge la création complète de supports pédagogiques détaillés.',
  },
  {
    icon: 'check-circle' as IconName,
    title: 'Cochez les cases Qualiopi',
    description:
      'Nos supports sont conçus pour répondre naturellement aux exigences du référentiel Qualiopi. Un atout pour vos audits qualité.',
  },
  {
    icon: 'clipboard' as IconName,
    title: 'Qualité optimale',
    description:
      "Garantissez à vos étudiants un socle clair, complet et réutilisable pour suivre les cours et réviser efficacement tout au long de l'année.",
  },
  {
    icon: 'refresh' as IconName,
    title: 'Mises à jour annuelles',
    description:
      'Nos supports sont révisés annuellement pour intégrer les évolutions des référentiels et des pratiques métiers.',
  },
  {
    icon: 'grid' as IconName,
    title: 'Structuration modulaire',
    description:
      "Chaque module est conçu de façon logique, progressive et modulaire pour une meilleure expérience d'apprentissage.",
  },
  {
    icon: 'sparkle' as IconName,
    title: 'Valorisez votre image',
    description:
      'Des supports cohérents, esthétiques et personnalisables renforcent la crédibilité de vos formations.',
  },
  {
    icon: 'settings' as IconName,
    title: 'Base de travail adaptable',
    description:
      'Les supports sont livrés en format PPT et/ou PDF, modifiables selon les besoins de vos équipes.',
  },
  {
    icon: 'document' as IconName,
    title: "Garantissez l'homogénéité",
    description:
      "Chaque étudiant bénéficie du même niveau d'exigence et de clarté, quel que soit le formateur ou le lieu.",
  },
  {
    icon: 'coin' as IconName,
    title: 'Rentabilisez sur le long terme',
    description:
      'Les supports sont réutilisables sur plusieurs années et facilement actualisables. Un investissement durable.',
  },
];

export const testimonials = [
  {
    quote:
      "C'est un budget, mais on y gagne sur tous les plans : moins de bricolage côté intervenants, des contenus solides, et surtout une vraie différence dans la manière dont les étudiants s'approprient les cours.",
    author: 'Eric',
    role: 'Responsable pédagogique',
  },
  {
    quote:
      "On s'est rendu compte que les étudiants n'avaient parfois que des bribes de cours ou des notes peu exploitables. Ce format comble vraiment ce manque.",
    author: 'Corrine',
    role: 'Chargée de coordination',
  },
  {
    quote:
      "Au départ, on a hésité à externaliser, mais aujourd'hui, je ne reviendrais pas en arrière. Le niveau des supports a un vrai impact sur la qualité du suivi pédagogique.",
    author: 'Claire',
    role: 'Directrice de programme',
  },
  {
    quote:
      'Les supports sont clairs, ça va droit au but. Pas besoin de chercher partout, tout est déjà là.',
    author: 'Lana',
    role: 'Étudiante en Bachelor Marketing Digital',
  },
];

export const faqs = [
  {
    question: 'Quel est le délai de production ?',
    answer:
      'Tout dépend du volume. En moyenne, comptez 1 à 4 semaines pour une production de 100 à 500 slides, selon la complexité du programme et le niveau de détail attendu.',
  },
  {
    question: 'Les supports sont-ils modifiables ?',
    answer:
      "Oui, tous les supports sont livrés en format PowerPoint modifiable. Vous gardez la liberté d'ajuster, ajouter ou simplifier selon vos préférences.",
  },
  {
    question: 'Faut-il adapter les supports à chaque formateur ?',
    answer:
      "Absolument. Les supports sont conçus pour être directement exploitables, tout en laissant la possibilité à chaque formateur d'adapter son animation pédagogique.",
  },
  {
    question: 'Les supports répondent-ils aux critères Qualiopi ?',
    answer:
      "Oui. Chaque module est structuré avec des objectifs pédagogiques clairs, une logique de progression, et des contenus exploitables en cas d'audit.",
  },
  {
    question: 'Peut-on créer un programme entier de zéro ?',
    answer:
      "Oui. Nous pouvons concevoir la structure et le contenu intégral d'un nouveau programme, sur la base de vos orientations pédagogiques et de vos objectifs institutionnels.",
  },
  {
    question: 'Proposez-vous un échantillon gratuit ?',
    answer:
      "Oui. Nous proposons l'envoi d'un extrait gratuit de slides (PDF) pour vous permettre d'évaluer notre approche et notre rendu.",
  },
  {
    question: 'Comment garantir la mise à jour des contenus ?',
    answer:
      'Nous proposons une actualisation annuelle des contenus livrés, sur demande ou dans le cadre d’un partenariat régulier.',
  },
];
