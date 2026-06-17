# 🚀 Guide de Déploiement du Bot WhatsApp Melly Shop sur Render (depuis Mobile)

Ce guide vous expliquera comment déployer votre bot WhatsApp sur un service cloud gratuit appelé Render, directement depuis votre téléphone mobile. Vous n'aurez pas besoin d'un ordinateur.

## Étape 0 : Préparer votre code sur GitHub

Pour déployer votre bot sur Render, le code doit être hébergé sur GitHub. Si vous n'avez pas de compte GitHub, créez-en un gratuitement.

1.  **Créez un compte GitHub** : Allez sur [github.com](https://github.com/) et suivez les instructions pour créer un compte.
2.  **Créez un nouveau dépôt (repository)** : Une fois connecté, cliquez sur le bouton `+` en haut à droite, puis sur `New repository`.
    *   Donnez un nom à votre dépôt (par exemple, `melly-shop-bot`).
    *   Choisissez `Public` ou `Private` (Public est plus simple pour ce guide).
    *   Cochez `Add a README file`.
    *   Cliquez sur `Create repository`.
3.  **Uploadez les fichiers du bot** :
    *   Dans votre nouveau dépôt, cliquez sur `Add file` puis `Upload files`.
    *   Glissez-déposez ou sélectionnez les fichiers `index.js`, `data.js`, `package.json` et `README.md` (ceux que je vous ai fournis) depuis votre téléphone.
    *   Cliquez sur `Commit changes` en bas de page.

Votre code est maintenant sur GitHub, prêt à être déployé !

## Étape 1 : Créer un compte Render

Render est un service cloud qui permet d'héberger des applications gratuitement (pour les petits projets).

1.  **Ouvrez votre navigateur mobile** (Chrome, Safari, etc.) et allez sur [render.com](https://render.com/).
2.  Cliquez sur `Get Started Free` ou `Sign Up`.
3.  Choisissez de vous inscrire avec votre compte **GitHub**. C'est le plus simple car votre code y est déjà.
4.  **Autorisez Render** à accéder à votre compte GitHub. Suivez les étapes de connexion et d'autorisation.

Votre compte Render est maintenant créé et lié à GitHub.

## Étape 2 : Déployer votre bot sur Render

Maintenant, nous allons dire à Render de prendre votre code GitHub et de le lancer.

1.  Une fois connecté à Render, vous devriez voir un tableau de bord. Cliquez sur `New` puis `Web Service`.
2.  **Connectez votre dépôt GitHub** : Render vous demandera de choisir un dépôt. Sélectionnez le dépôt `melly-shop-bot` que vous avez créé à l'étape 0.
3.  **Configurez votre service** :
    *   **Name** : Donnez un nom à votre service (par exemple, `melly-shop-bot`).
    *   **Region** : Laissez par défaut ou choisissez la plus proche de vous.
    *   **Branch** : Laissez `main`.
    *   **Root Directory** : Laissez vide.
    *   **Runtime** : Sélectionnez `Node`.
    *   **Build Command** : Entrez `npm install`
    *   **Start Command** : Entrez `npm start`
    *   **Plan Type** : Choisissez `Free`.
4.  Cliquez sur `Create Web Service`.

Render va maintenant commencer à déployer votre bot. Cela peut prendre quelques minutes. Vous verrez des logs de déploiement s'afficher.

## Étape 3 : Connecter votre WhatsApp (Scanner le QR Code)

Une fois le déploiement terminé, votre bot sera en ligne, mais il aura besoin d'être connecté à votre compte WhatsApp.

1.  Sur la page de votre service Render, cherchez l'**URL publique** de votre bot (elle ressemble à `https://melly-shop-bot-xxxx.onrender.com`).
2.  **Ouvrez cette URL dans un nouvel onglet de votre navigateur mobile.**
3.  Vous devriez voir une page avec un **QR Code** géant.
4.  **Ouvrez WhatsApp sur votre téléphone** (le téléphone dont le numéro sera utilisé par le bot).
5.  Allez dans **Paramètres > Appareils connectés > Connecter un appareil**.
6.  **Scannez le QR code** affiché sur la page Render dans votre navigateur mobile.
7.  Une fois le scan réussi, la page Render devrait afficher "Le bot Melly Shop est prêt !" et votre bot sera connecté !

**Important** : Le QR code ne reste affiché que quelques secondes. Si vous le manquez, actualisez la page Render pour en générer un nouveau.

## Étape 4 : Garder le bot actif 24h/24

Render offre un plan gratuit qui peut mettre en veille votre service après 15 minutes d'inactivité. Pour un bot WhatsApp, il est crucial qu'il reste actif en permanence.

Le code du bot a été modifié pour inclure un petit serveur web. Cela aide Render à le considérer comme un service web actif.

**Pour assurer une activité continue (sans garantie à 100% avec le plan gratuit) :**

*   **Visitez régulièrement l'URL de votre bot** : Ouvrez l'URL publique de votre service Render de temps en temps dans votre navigateur mobile. Cela peut aider à maintenir le service "éveillé".
*   **Mettre à niveau le plan (optionnel)** : Si le bot se met trop souvent en veille et que cela impacte votre activité, vous pouvez envisager de passer à un plan payant sur Render. Même le plus petit plan payant garantit un fonctionnement 24h/24.

--- 

Félicitations ! Votre bot WhatsApp Melly Shop est maintenant déployé et fonctionne sur le cloud. Vous pouvez tester en envoyant un message "menu" à votre numéro WhatsApp.
