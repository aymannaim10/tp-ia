# Vérification — 9 octobre 2026

## Exemples Python
Les 24 extraits ont été exécutés successivement dans un même contexte, sans erreur. Le notebook est valide selon nbformat. Versions de vérification : Python 3.12, NumPy 2.4.2, Pandas 2.2.3, Matplotlib 3.10.0.
- Pente : 8.1059602649 kDH/m² ; constante : 130.5430463576 kDH.
- MSE d’essai : 1650 ; MSE d’apprentissage ajustée : 145.4701986755 kDH².
- Test : MAE 23.9801324503 kDH ; RMSE 24.1784687470 kDH.
- MAE baseline : 206.6 kDH ; R² test : 0.9890001439.
- Ensembles disjoints ; paramètres appris uniquement sur train.
- Les résultats du défi ne sont volontairement pas fournis aux étudiants.

## Tests navigateur
Chromium, Playwright. Tests réussis :
- 24 étapes accessibles ; consignes, code, analyse, correction masquée.
- Copie réelle et lecture du presse-papiers.
- Indices et corrections dépliables.
- Validation/dévalidation, persistance après rechargement.
- Checkpoint requis avant validation.
- Réinitialisation avec annulation et confirmation.
- Téléchargement du notebook et contrôle du CSV.
- Parcours mobile, fermeture du menu après navigation.
- Absence de débordement horizontal à 390 et 320 pixels.
- Lien d’évitement au clavier et fonctionnement sans stockage local.
- Aucune erreur JavaScript observée.

## Accessibilité
Audit axe-core sur sept vues représentatives (accueil bureau/mobile, étapes 1/13/mobile, compte rendu et ressources), règles WCAG 2 A/AA et 2.1 AA : **zéro violation détectée** après correction des contrastes.
Inspection des rendus bureau et mobile, langue française déclarée, titres, labels, focus visible, lien d’évitement et respect de la réduction des animations.
Un audit automatisé ne constitue pas une certification complète : aucune session avec un utilisateur de lecteur d’écran n’a été réalisée.

## Limites pédagogiques
Jeux fictifs et très petits, séparation fixe volontaire. Aucune estimation de l’incertitude, causalité ou valeur immobilière réelle n’est revendiquée. L’étape 23 reste autonome.
