#!/bin/bash
cd /Users/raphaelbentvelzen/Dev/Creatio

# Initialiser git si nécessaire
if [ ! -d .git ]; then
  git init
fi

# Configurer le remote
git remote remove origin 2>/dev/null || true
git remote add origin git@github.com:raphaelbentv/creatio.git

# Ajouter tous les fichiers
git add .

# Faire le commit initial
git commit -m "Initial commit: React app with Vite, TypeScript, Tailwind CSS - Complete Creatio website with pricing calculator, contact form, and blog"

# Renommer la branche en main
git branch -M main

# Pousser vers GitHub
git push -u origin main

echo "✅ Commit initial effectué avec succès!"

