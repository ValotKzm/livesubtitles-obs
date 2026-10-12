# Feuille de route du site LiveSubtitles

Ce fichier suit les jalons du site. Ce n'est pas une preuve que ce qui est décrit existe : vérifier le dépôt avant de changer un statut, et ne déclarer un jalon terminé qu'après avoir vérifié son critère de sortie. Les règles et contraintes sont dans [AGENTS.md](AGENTS.md).

## Cible

Une page bilingue (français, anglais), statique, hébergée sur GitHub Pages, qui présente LiveSubtitles et mène au téléchargement de la dernière version. Stack : Astro, TypeScript, Tailwind CSS, un îlot React, Playwright.

## État courant

Au 2026-10-12, les jalons 0 à 3 sont terminés. Le site affiche ses six sections en anglais et en français, mises en page en thème clair et sombre, avec la démonstration provisoire. Le code est poussé sur https://github.com/ValotKzm/livesubtitles-website (dépôt public) ; GitHub Pages n'est pas encore activé.

**Prochaine étape : démonstration interactive (jalon 4).**

## Jalons

### 0. Cadrage et décisions - Terminé (2026-10-12)

Stack choisie, contraintes et contenu fixés dans `AGENTS.md`, textes de référence identifiés (README du plugin), démonstration provisoire créée.

### 1. Squelette Astro - Terminé (2026-10-12)

Vérifié le 2026-10-12 : `pnpm check` sans erreur, `pnpm build` réussi, serveur de développement répondant 200 pour la page et la démonstration sous `/livesubtitles-website/`. Le dépôt GitHub s'appellera `livesubtitles-website`, comme la valeur de `base`.

Initialiser le dépôt git et le projet Astro avec TypeScript strict, Tailwind CSS et l'intégration React, en vérifiant les versions courantes dans la documentation officielle. Configurer `site` et `base` pour GitHub Pages. Inscrire les commandes de développement dans `AGENTS.md`.

**Sortie attendue :** le serveur de développement démarre, le build statique réussit, la vérification de types passe, une page vide s'affiche sous le sous-chemin configuré.

### 2. Internationalisation et contenu - Terminé (2026-10-12)

Vérifié le 2026-10-12 : `pnpm check` sans erreur, build de deux pages (`/` en anglais, `/fr/` en français), six sections présentes dans les deux, bouton de téléchargement vers `releases/latest`, balises `canonical` et `hreflang` correctes sous le sous-chemin, aucun script dans le HTML produit, rendu de la page française contrôlé sur capture d'écran à 1280 px. La mise en forme est volontairement minimale en attendant le jalon 3.

Mettre en place le routage français et anglais avec un sélecteur de langue et les balises `hreflang`. Ranger les textes dans une source typée unique par langue, de sorte qu'une clé manquante dans une langue fasse échouer la vérification de types. Rédiger les six sections à partir du README du plugin.

**Sortie attendue :** les deux versions affichent les six sections avec le même contenu ; le bouton de téléchargement pointe vers `releases/latest` ; aucune affirmation hors de la liste d'`AGENTS.md`.

### 3. Identité visuelle et mise en page - Terminé (2026-10-12)

Vérifié le 2026-10-12 sur captures d'écran : thème sombre et thème clair à 1440 px, page entière en thème sombre à 360 px, accroche et bouton de téléchargement visibles sans défiler à 1440 x 1000. `pnpm check` et `pnpm build` passent, toujours aucun script dans le HTML produit. Non vérifié : les contrastes à l'outil (prévu avec axe au jalon 5), le rendu dans Firefox et Safari, l'effet réel des animations au défilement.

Définir les couleurs, la typographie (polices hébergées avec le site) et les thèmes clair et sombre, après avoir demandé à l'utilisateur ce que le site doit reprendre de sa charte graphique personnelle (`_private/`). Mettre en page les six sections, du téléphone au grand écran. Ajouter des animations sobres (apparition des sections au défilement, transitions), en CSS d'abord, toutes coupées sous `prefers-reduced-motion`. L'accroche et le bouton de téléchargement restent visibles sans faire défiler.

**Sortie attendue :** page complète et lisible à 360 px et à 1440 px, dans les deux thèmes, sans JavaScript.

### 4. Démonstration - À faire

Intégrer `public/demo/demo-placeholder.svg` à l'emplacement de la future vidéo. Ajouter l'îlot React : un simulateur où le visiteur choisit la langue parlée et celle des sous-titres et voit des phrases d'exemple s'afficher puis s'effacer comme dans OBS, avec le délai réel d'une à deux secondes. Les phrases sont écrites à l'avance ; le simulateur ne capte pas le microphone et ne traduit rien, et il le dit.

**Sortie attendue :** simulateur utilisable au clavier, animations coupées sous `prefers-reduced-motion`, contenu de repli lisible sans JavaScript.

### 5. Tests et qualité - À faire

Tests Playwright : présence des sections dans les deux langues, cible du bouton de téléchargement, changement de langue, simulateur. Contrôle d'accessibilité avec axe. Contrôle qu'aucune requête ne part vers un autre domaine au chargement de la page.

**Sortie attendue :** tous les tests passent en local ; aucune violation axe ; aucune requête tierce.

### 6. Mise en ligne - À faire

Activer GitHub Pages sur le dépôt (déjà créé et public) et écrire le workflow GitHub Actions qui lance la vérification de types, le build et les tests, puis déploie sur GitHub Pages à chaque push sur `main`.

**Sortie attendue :** site accessible à son adresse publique dans les deux langues ; le déploiement échoue si un test échoue.

### 7. Contenu réel et raccordement au plugin - À faire

Remplacer la démonstration provisoire par la vidéo enregistrée par l'utilisateur, avec un équivalent textuel, et ajouter la capture de l'avertissement Windows. Reporter l'adresse du site dans le dépôt du plugin : `buildspec.json`, l'installateur et le README (voir son `NOTES.md`).

**Sortie attendue :** plus aucun fichier provisoire en ligne ; l'adresse du site figure dans le dépôt du plugin.

## Plus tard, si le besoin se confirme

- Nom de domaine propre.
- Page de questions fréquentes ou de dépannage reprenant le tableau « En cas de problème » du README.
