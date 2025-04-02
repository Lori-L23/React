# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Application de Gestion de Clients (React CRUD)

![React](https://img.shields.io/badge/React-18.2.0-blue)
![React Router](https://img.shields.io/badge/React_Router-6.3.0-orange)
![Axios](https://img.shields.io/badge/Axios-1.1.3-yellowgreen)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.1.8-blueviolet)

## Fonctionnalités

- **CRUD complet** pour la gestion des clients
- **Interface moderne** avec Tailwind CSS
- **Navigation fluide** entre les vues
- **Gestion d'état** avec Context API
- **Validation des formulaires**
- **Feedback utilisateur** (chargements, erreurs, confirmations)

## Structure des Composants
src/
├── components/
│ ├── ClientList.jsx # Liste des clients avec actions
│ ├── ClientDetails.jsx # Détails d'un client spécifique
│ ├── CreateClient.jsx # Formulaire de création
│ ├── UpdateClient.jsx # Formulaire de modification
├── App.js # Configuration des routes
└── index.js # Point d'entrée


## Routes API

| Méthode | Endpoint                | Description                     |
|---------|-------------------------|---------------------------------|
| GET     | /clients                | Liste tous les clients          |
| GET     | /clients/:id            | Détails d'un client             |
| POST    | /clients                | Crée un nouveau client          |
| PUT     | /clients/:id            | Met à jour un client            |
| DELETE  | /clients/:id            | Supprime un client              |

## Installation

1. Cloner le dépôt :
```bash
git clone https://github.com/react/crud_app.git
cd crud_app



