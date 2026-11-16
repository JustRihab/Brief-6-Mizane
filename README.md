# Mizan – Tableau de bord des cours de l'or

## Présentation
Mizan est une application web qui permet de consulter les prix de l'or et de l'argent, suivre leur évolution et estimer la valeur d'un métal selon son poids.

## Fonctionnalités
- Affichage des prix de l'or et de l'argent.
- Conversion des prix en MAD, USD et EUR.
- Consultation de l'historique sur 7 ou 30 jours.
- Graphique d'évolution des prix.
- Calcul de la valeur estimée selon le poids.
- Gestion des états : chargement, succès et erreurs.
- Sauvegarde de la devise choisie.

## Technologies utilisées
- HTML5
- Tailwind CSS
- JavaScript (ES6 Modules)
- Fetch API
- LocalStorage

## Installation
1. Cloner le dépôt :
   `git clone https://github.com/JustRihab/Brief-6-Mizane.git`
2. Ouvrir le projet dans VS Code.
3. Lancer le projet avec Live Server.

## Structure du projet
- `index.html` : structure de l'application.
- `src/js/api.js` : communication avec l'API.
- `src/js/calculs.js` : fonctions de calcul.
- `src/js/render.js` : affichage des données.
- `src/js/storage.js` : sauvegarde de la devise.
- `src/js/main.js` : logique principale.
- `samples/` : exemples de réponses JSON de l'API.

## API
L'application utilise une API externe pour récupérer les prix actuels et les données historiques des métaux.

## Démo
https://justrihab.github.io/Brief-6-Mizane/