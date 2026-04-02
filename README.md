# ISI E-Learning

Plateforme e-learning pour la gestion de cours, quiz, devoirs et suivi de progression pour etudiants et enseignants.

## Tech Stack

- **React 19** avec Vite
- **React Router 7** pour le routing
- **Tailwind CSS 4** pour le styling
- **Radix UI** pour les composants accessibles
- **Lucide React** pour les icones

## Scripts

```bash
# Installation
npm install

# Developpement
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## Structure

```
src/
├── components/     # Composants reutilisables
│   ├── auth/       # Authentification
│   ├── landing/    # Page d'accueil
│   ├── layouts/    # Layouts (Student, Teacher)
│   └── ui/         # Composants UI (shadcn)
├── pages/          # Pages de l'application
│   ├── student/    # Dashboard etudiant
│   └── teacher/    # Dashboard enseignant
├── lib/            # Utilitaires
├── App.tsx         # Routes principales
└── main.tsx        # Point d'entree
``` 
