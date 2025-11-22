# Creatio - Application React Moderne

Site de Creatio - Des cours informatifs, pas rébarbatifs.

Une application React moderne avec TypeScript, Vite, Tailwind CSS et une structure complète.

## 🚀 Tech Stack

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **Tailwind CSS** - Framework CSS utilitaire
- **React Router** - Navigation
- **ESLint** - Linter
- **Prettier** - Formateur de code
- **Vitest** - Framework de tests

## 📁 Structure du Projet

```
creatio/
├── src/
│   ├── components/       # Composants réutilisables
│   ├── pages/           # Pages de l'application
│   ├── hooks/           # Hooks personnalisés
│   ├── utils/           # Fonctions utilitaires
│   ├── types/           # Types TypeScript
│   ├── services/        # Services API
│   ├── context/         # Contextes React
│   ├── test/            # Configuration des tests
│   ├── App.tsx          # Composant principal
│   ├── main.tsx         # Point d'entrée
│   └── index.css        # Styles globaux
├── public/              # Fichiers statiques
├── index.html           # Template HTML
└── package.json         # Dépendances
```

## 🛠️ Installation

```bash
# Installer les dépendances
npm install

# Ou avec yarn
yarn install

# Ou avec pnpm
pnpm install
```

## 🎯 Scripts Disponibles

```bash
# Démarrer le serveur de développement (port 5007)
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview

# Linter le code
npm run lint

# Corriger automatiquement les erreurs de linting
npm run lint:fix

# Formater le code
npm run format

# Vérifier le formatage
npm run format:check

# Lancer les tests
npm run test

# Lancer les tests avec UI
npm run test:ui

# Lancer les tests avec couverture
npm run test:coverage
```

## 🎨 Alias de Chemins

Le projet utilise des alias pour simplifier les imports :

- `@/` → `./src/`
- `@/components` → `./src/components`
- `@/pages` → `./src/pages`
- `@/hooks` → `./src/hooks`
- `@/utils` → `./src/utils`
- `@/types` → `./src/types`
- `@/services` → `./src/services`
- `@/context` → `./src/context`

Exemple d'utilisation :
```typescript
import { Button } from '@/components/Button';
import { useLocalStorage } from '@/hooks/useLocalStorage';
```

## 🌐 Configuration du Serveur

Le serveur de développement est configuré pour utiliser le **port 5007** par défaut.

L'application sera accessible sur : `http://localhost:5007`

## 📝 Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
# Configuration EmailJS pour l'envoi d'emails depuis les formulaires
# Obtenez ces clés sur https://www.emailjs.com/
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# URL de l'API backend (optionnel)
VITE_API_BASE_URL=http://localhost:3000/api
```

### Configuration EmailJS

Pour activer l'envoi d'emails depuis le formulaire de demande d'échantillon :

1. Créez un compte gratuit sur [EmailJS](https://www.emailjs.com/) (200 emails/mois gratuits)
2. Créez un service email (Gmail, Outlook, etc.) dans le dashboard EmailJS
3. Créez un template d'email avec les variables suivantes :
   - `{{from_name}}` - Nom et prénom
   - `{{from_email}}` - Email de l'expéditeur
   - `{{telephone}}` - Téléphone
   - `{{organisation}}` - Organisation
   - `{{fonction}}` - Fonction
   - `{{domaine}}` - Domaine d'enseignement
   - `{{nombre_etudiants}}` - Nombre d'étudiants
   - `{{nombre_heures}}` - Nombre d'heures
   - `{{format_souhaite}}` - Format souhaité
   - `{{besoins_specifiques}}` - Besoins spécifiques
4. Récupérez vos clés dans le dashboard EmailJS et ajoutez-les dans le fichier `.env`

**Note :** Si les clés EmailJS ne sont pas configurées, le formulaire fonctionnera en mode simulation (les données seront affichées dans la console).

## 🧪 Tests

Les tests sont configurés avec Vitest et Testing Library. Exemple :

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
```

## 📦 Build

Le build de production génère les fichiers optimisés dans le dossier `dist/` :

```bash
npm run build
```

## 🚀 Déploiement sur GitHub Pages

Le site est déployé automatiquement sur **creatio.paris** via GitHub Pages à chaque push sur la branche `main`.

### Configuration initiale (une seule fois)

1. **Activer GitHub Pages dans les paramètres du dépôt :**
   - Allez sur GitHub dans votre dépôt `raphaelbentv/creatio`
   - Cliquez sur **Settings** → **Pages**
   - Sous **Source**, sélectionnez **GitHub Actions**
   - Sous **Custom domain**, entrez : `creatio.paris`
   - Cochez **Enforce HTTPS** (recommandé)
   - Sauvegardez

2. **Configurer le DNS sur IONOS :**
   - Connectez-vous à votre panneau IONOS
   - Allez dans la gestion DNS de votre domaine `paris`
   - Ajoutez un enregistrement pour `creatio.paris` :
     - **Type** : `A` (ou `CNAME` vers `raphaelbentv.github.io`)
     - **Nom** : `creatio` (ou `@` si c'est le domaine racine)
     - **Valeur** : 
       - Pour `A` : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
       - Pour `CNAME` : `raphaelbentv.github.io`
   - Attendez la propagation DNS (peut prendre jusqu'à 48h, généralement quelques minutes)

3. **Le déploiement se fera automatiquement :**
   - À chaque push sur `main`, le workflow GitHub Actions se déclenche
   - Le site sera disponible sur : `https://creatio.paris`

### Déploiement manuel

Si vous souhaitez déclencher un déploiement manuellement :
- Allez dans l'onglet **Actions** de votre dépôt GitHub
- Sélectionnez le workflow "Déploiement sur GitHub Pages"
- Cliquez sur **Run workflow**

### Workflow de déploiement

Le workflow (`.github/workflows/deploy.yml`) :
- ✅ Se déclenche automatiquement à chaque push sur `main`
- ✅ Build l'application avec `npm run build`
- ✅ Déploie automatiquement sur GitHub Pages
- ✅ Utilise le cache npm pour accélérer les builds
- ✅ Supporte le domaine personnalisé `creatio.paris` via le fichier `public/CNAME`

### Configuration du domaine

Le fichier `public/CNAME` contient `creatio.paris` pour indiquer à GitHub Pages d'utiliser votre domaine personnalisé. Ce fichier est automatiquement inclus dans le build et déployé.

## 🤝 Contribution

1. Créez une branche pour votre fonctionnalité
2. Faites vos modifications
3. Vérifiez le linting et les tests
4. Créez une pull request

## 📄 Licence

MIT
