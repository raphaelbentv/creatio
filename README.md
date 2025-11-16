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
# Démarrer le serveur de développement
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

## 📝 Variables d'Environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

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

## 🤝 Contribution

1. Créez une branche pour votre fonctionnalité
2. Faites vos modifications
3. Vérifiez le linting et les tests
4. Créez une pull request

## 📄 Licence

MIT
