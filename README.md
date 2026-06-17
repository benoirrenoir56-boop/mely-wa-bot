# 🤖 Bot WhatsApp Melly Shop

Ce bot WhatsApp est conçu pour automatiser les ventes de recharges gaming (Free Fire, PUBG, Blood Strike) et de services numériques pour **Melly Shop**.

## 🚀 Fonctionnalités

- **Accueil automatique** : Message de bienvenue personnalisé.
- **Menu interactif** : Navigation simple par numéros.
- **Tarifs à jour** : Affichage des prix pour toutes les catégories.
- **Prise de commande** : Guide le client et enregistre les détails.
- **Notifications** : Alerte le propriétaire en temps réel pour chaque nouvelle commande ou demande d'assistance.
- **FAQ** : Réponses aux questions courantes sur la sécurité et les délais.
- **Paiements** : Informations sur Wave, MTN et Orange Money.

## 🛠️ Installation

### Prérequis
- [Node.js](https://nodejs.org/) (version 16 ou supérieure) installé sur votre ordinateur ou serveur.
- Un compte WhatsApp fonctionnel.

### Étapes d'installation
1. **Téléchargez ou copiez** les fichiers du bot dans un dossier sur votre ordinateur.
2. **Ouvrez un terminal** (Invite de commande ou PowerShell) dans ce dossier.
3. **Installez les dépendances** en tapant la commande suivante :
   ```bash
   npm install
   ```

## 🏃 Lancement

Pour démarrer le bot, lancez la commande suivante dans votre terminal :
```bash
node index.js
```

### Connexion à WhatsApp
1. Lors du premier lancement, un **QR Code** s'affichera dans votre terminal.
2. Ouvrez WhatsApp sur votre téléphone.
3. Allez dans **Paramètres > Appareils connectés > Connecter un appareil**.
4. Scannez le QR code affiché à l'écran.
5. Une fois connecté, le message "Le bot Melly Shop est prêt !" apparaîtra.

## 📁 Structure des fichiers
- `index.js` : Le code principal du bot (logique et gestion des messages).
- `data.js` : Contient tous les tarifs, produits et informations de la boutique. Modifiez ce fichier pour changer les prix.
- `package.json` : Liste des bibliothèques nécessaires.
- `.wwebjs_auth/` : Dossier créé automatiquement pour garder votre session connectée (ne pas supprimer).

## 📝 Personnalisation
Pour modifier les tarifs ou ajouter des produits, ouvrez le fichier `data.js` avec un éditeur de texte (comme le Bloc-notes ou VS Code) et modifiez les valeurs.

## ⚠️ Notes importantes
- **Garder le bot actif** : Pour que le bot réponde, l'ordinateur ou le serveur où il est lancé doit rester allumé et connecté à Internet.
- **Hébergement** : Pour un fonctionnement 24h/24, il est recommandé d'utiliser un VPS (serveur virtuel) ou un service comme Heroku, Railway ou Render.
- **Sécurité** : Ne partagez jamais le dossier `.wwebjs_auth` car il contient vos accès de session WhatsApp.

---
*Développé pour Melly Shop - Recharge rapide, fiable et sécurisée.*
