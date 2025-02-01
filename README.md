# Calculateur IMC

Ce projet est un calculateur d'IMC (Indice de Masse Corporelle) développé avec Next.js, TypeScript, CSS et JavaScript. L'application permet aux utilisateurs de calculer leur IMC et fournit des informations en fonction de la valeur calculée.

## Fonctionnalités

- Calculer l'IMC en fonction des entrées de l'utilisateur (poids et taille).
- Afficher le résultat de l'IMC et la catégorie de poids correspondante.
- Conception réactive pour différentes tailles d'écran.

## Démarrage

Suivez les étapes ci-dessous pour configurer et exécuter le projet localement.

### Prérequis

Assurez-vous d'avoir les éléments suivants installés :

- Node.js
- npm ou yarn

### Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/Esscraye/imc-calculator.git
   cd imc-calculator
   ```

2. Installez les dépendances :

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Exécutez le serveur de développement :

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Ouvrez [http://localhost:3000](http://localhost:3000) avec votre navigateur pour voir le résultat.

## Déploiement

Le projet est actuellement déployé sur Vercel et accessible via l'URL suivante : [https://imc-calculator-gilt.vercel.app](https://imc-calculator-gilt.vercel.app).

### Déploiement sur Vercel

1. Installez Vercel CLI :

   ```bash
   npm install -g vercel
   ```

2. Liez votre projet à Vercel :

   ```bash
   vercel
   ```

3. Configurez la base de données Neon Postgres sur Vercel :
   - Connectez-vous à votre tableau de bord Vercel.
   - Accédez aux paramètres du projet.
   - Dans la section "Variables d'environnement", ajoutez les variables suivantes :
     - `DATABASE_URL` : L'URL de votre base de données Neon Postgres.

4. Déployez le projet :

   ```bash
   vercel --prod
   ```

### GitHub OAuth avec Auth.js

Le projet utilise GitHub OAuth pour l'authentification via le framework Auth.js. Suivez ces étapes pour le configurer :

1. Enregistrez une nouvelle application OAuth sur GitHub :
   - Allez sur [GitHub Developer Settings](https://github.com/settings/developers).
   - Cliquez sur "New OAuth App" et remplissez les détails requis.
   - Définissez l'URL de rappel d'autorisation à `https://your-deployment-url/api/auth/callback/github`.

2. Ajoutez les informations d'identification OAuth à vos variables d'environnement :
   - `GITHUB_ID` : L'identifiant client de votre application OAuth GitHub.
   - `GITHUB_SECRET` : Le secret client de votre application OAuth GitHub.

3. Intégrez Auth.js dans votre projet Next.js :

   ```javascript
   // src/auth.ts
   import NextAuth from "next-auth";
   import GitHubProvider from "next-auth/providers/github";

   export default NextAuth({
     providers: [
       GitHubProvider({
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
       }),
     ],
   });
   ```

## Fonctionnement

Le calculateur IMC fonctionne comme suit :

1. **Entrée des données utilisateur :** L'utilisateur saisit son poids et sa taille dans les champs de saisie fournis sur l'interface.
2. **Calcul de l'IMC :** Une fois les données saisies, l'application calcule l'IMC en utilisant la formule suivante :

   ```typescript
   const imc = weight / (height * height);
   ```

   où `weight` est le poids de l'utilisateur en kilogrammes et `height` est la taille de l'utilisateur en mètres.
3. **Affichage du résultat :** L'application affiche le résultat de l'IMC et la catégorie de poids correspondante (ex. : insuffisance pondérale, poids normal, surpoids, obésité).
4. **Stockage des données :** Les données de l'utilisateur sont stockées dans la base de données Neon Postgres pour une consultation future. L'application fait appel à l'API pour insérer et récupérer les données stockées. Par exemple :

   ```typescript
   // Exemple d'appel API pour stocker les données utilisateur
   const response = await fetch('/api/save', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({ weight, height, imc }),
   });
   
   // Exemple d'appel API pour récupérer les données utilisateur
   const response = await fetch('/api/get', {
     method: 'GET',
   });
   const data = await response.json();
   ```

5. **Authentification :** L'utilisateur peut se connecter via GitHub OAuth pour sécuriser et personnaliser son expérience. L'authentification est gérée par le framework Auth.js.

## En savoir plus

Pour en savoir plus sur les technologies utilisées dans ce projet, consultez les ressources suivantes :

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation TypeScript](https://www.typescriptlang.org/docs/)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Auth.js](https://next-auth.js.org/getting-started/introduction)
