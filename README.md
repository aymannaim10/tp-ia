# TP 1 — Introduction à la régression linéaire : Zero to Hero

Guide universitaire en français pour le module **Techniques d’intelligence artificielle avec Python**.

## Principe pédagogique
Le navigateur n’exécute aucun Python. Les étudiants utilisent **Anaconda et Jupyter Notebook**, avec NumPy, Pandas et Matplotlib, sans scikit-learn. Le livrable est un notebook exécuté contenant les interprétations personnelles.

## Parcours
24 questions en six chapitres : environnement, exploration, protocole et référence, moindres carrés, évaluation, limites et autonomie. Chaque étape comporte un objectif, une consigne, le code à copier, un résultat attendu, un indice, une question d’analyse, une correction repliée et une erreur fréquente. Checkpoints aux étapes 8, 16 et 24 ; défi indépendant à l’étape 23.

Les données sont **fictives**. Surfaces en m², prix en milliers de dirhams (kDH). Séparation fixe de 15 logements d’apprentissage et 5 de test. Le faible effectif et le découpage sont discutés explicitement.

## Développement
Site statique HTML/CSS/JavaScript, sans dépendance de production.
- `npm start` : aperçu sur http://127.0.0.1:4173.
- `node build.cjs` : copie uniquement les sept fichiers publics dans dist/.
- `npm install`, puis `npx playwright install chromium` pour les tests.
- `npm test` : tests fonctionnels et audit axe WCAG 2.1 A/AA (serveur local lancé).
- `npm run test:python` : exécute les 24 cellules dans l’ordre avec Python, numpy, pandas et matplotlib ; valide le notebook si nbformat est disponible.

Le script build ne publie ni tests ni dépendances. La configuration Vercel utilise dist/ et ne nécessite aucune clé secrète.

## Contenu et fonctionnalités
- `data.js` : contenu pédagogique des 24 étapes.
- `app.js` : routage par fragment, copie, indices/corrections, progression et navigation.
- `TP1_Regression_Lineaire.ipynb` : 24 emplacements de code, questions et cellules d’analyse ; aucune correction remplie.
- `logements.csv` : jeu identique à l’étape 4.
- Onglets compte rendu (structure et barème sur 20) et ressources.
- Progression stockée localement ; mode dégradé si le stockage ou le presse-papiers ne sont pas disponibles.
- Aucun compte étudiant, aucune collecte des réponses, aucun envoi de notebook.

## Vérification
Voir [VERIFICATION.md](VERIFICATION.md) pour les résultats et limites de la validation.
Les polices sont chargées depuis Google Fonts avec une police système de repli.

## Site publié
https://tp-ia-lake.vercel.app

L’adresse demandée tp-ia.vercel.app est déjà affectée à un projet d’une autre équipe. Son rattachement nécessite l’accès à cette équipe. La version publiée et testée est disponible à l’adresse ci-dessus.
