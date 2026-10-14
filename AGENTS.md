# Site LiveSubtitles : consignes du projet

## Objectif et priorités

Ce dépôt contient le site vitrine de [LiveSubtitles](https://github.com/ValotKzm/livesubtitles), un plugin OBS Studio qui affiche en direct les sous-titres de ce que dit le streamer, traduits ou non (français et anglais). Le site a deux rôles : présenter le plugin et le faire télécharger. Il sert aussi de pièce de portfolio : la stack doit être moderne et le code soigné, sans que cela dégrade le site pour le visiteur.

Deux publics à qui parler : le streamer qui veut être compris dans une autre langue, et celui qui veut rendre son stream accessible aux personnes sourdes et malentendantes (sous-titres sans traduction).

Priorités, dans l'ordre : exactitude de ce qui est affirmé, simplicité pour un streamer non technique, accessibilité, rapidité, effets visuels.

## Stack

- **Astro** en sortie statique, **TypeScript** strict.
- **Tailwind CSS** pour les styles.
- **Un îlot React** pour la démonstration interactive (`src/components/SubtitleSimulator.tsx`, chargé avec `client:visible`) : un simulateur à phrases préparées, qui ne capte pas le microphone et ne traduit rien, et qui le dit. Son rendu initial doit rester lisible sans JavaScript ; tout le reste est rendu en HTML sans JavaScript. La page doit rester lisible et le bouton de téléchargement utilisable si JavaScript est désactivé.
- **Routage i18n d'Astro** : anglais à la racine, français sous `/fr/`, mêmes sections dans les deux langues. Tous les textes sont dans `src/i18n/en.ts` et `src/i18n/fr.ts` ; l'anglais sert de référence de type, donc une clé oubliée en français fait échouer `pnpm check`. Aucun texte visible n'est écrit en dur dans un composant. Les adresses externes sont dans `src/i18n/links.ts`, les liens internes passent par `astro:i18n`.
- **Playwright** avec **axe** pour les tests de bout en bout et d'accessibilité.
- **pnpm** comme gestionnaire de paquets ; **GitHub Actions** pour vérifier et déployer sur **GitHub Pages**.

Versions installées le 2026-10-12 : Astro 7, React 19, Tailwind CSS 4 (plugin Vite, importé dans `src/styles/global.css`), TypeScript 6. Rester sur TypeScript 6 : `astro check` refuse TypeScript 7. Playwright 1.64 et `@axe-core/playwright` 4.13 ajoutés le 2026-10-14. En local, les tests tournent dans Edge (`channel: 'msedge'`), le téléchargement du Chromium de Playwright ayant bloqué ; en intégration continue (`CI` défini), ils utilisent Chromium.

## Commandes

```
pnpm install                  # dépendances
pnpm astro dev --background   # serveur de développement en arrière-plan
pnpm astro dev status         # état du serveur ; `stop` pour l'arrêter, `logs` pour son journal
pnpm check                    # vérification de types (astro check)
pnpm build                    # build statique dans dist/
pnpm preview                  # sert dist/ en local
pnpm test                     # build, puis tests Playwright et axe sur le port 4322
```

Ne pas lancer `pnpm build` pendant que le serveur de développement tourne : le build remplace le cache des dépendances et l'îlot React plante ensuite en développement (`_jsxDEV is not a function`). Si cela arrive, arrêter puis relancer le serveur.

À cause de `base`, le site local est à l'adresse http://localhost:4321/livesubtitles-website/ et non à la racine.

Documentation d'Astro : https://docs.astro.build. Astro 7 est récent : consulter le guide concerné (routage, composants de framework, styles, internationalisation) avant de s'appuyer sur une API de mémoire.

## Identité visuelle

- Les couleurs sont des variables CSS définies dans `src/styles/global.css`, en clair et en sombre, puis exposées à Tailwind (`bg-bg`, `bg-surface`, `text-ink`, `text-muted`, `text-accent`, `bg-cta`, `border-line`). Utiliser ces noms, jamais une couleur de la palette Tailwind ni un code écrit en dur, sinon un des deux thèmes casse.
- Le thème suit `prefers-color-scheme` par défaut. Le bouton de l'en-tête pose `data-theme` sur `<html>` et retient le choix dans `localStorage` (deux petits scripts en ligne dans `src/layouts/Base.astro`, les seuls de la page hors îlot React). Sans JavaScript, le bouton reste caché. Les valeurs du thème sombre existent en deux exemplaires dans `global.css` (système et choix manuel) : modifier les deux.
- La palette vient de la charte personnelle de l'utilisateur : bleu nuit `#0A0F14`, blanc cassé `#E8E8E8`, cyan `#00E5FF` en accent. Le cyan n'étant pas lisible sur fond clair, le thème clair utilise un bleu-vert foncé. L'imagerie gothique de la charte n'est pas reprise. Ce choix est provisoire : l'utilisateur a dit vouloir y revenir.
- `src/assets/logo-ys-cyan.png` est le logo personnel de l'utilisateur, en version à reflets cyan sur fond transparent, copiée de `_private/logo-ys-cyan.png` à sa demande. Il sert de signature dans le pied de page, toujours sur une pastille sombre car il est illisible sur fond clair. La signature affiche « Yannick Souza », à la demande de l'utilisateur (le site figure dans son portfolio), avec un lien vers son profil GitHub.
- Police : Montserrat variable, fournie par le paquet `@fontsource-variable/montserrat` et servie avec le site.
- Animations en CSS uniquement, toutes dans `@media (prefers-reduced-motion: no-preference)` : `.enter` à l'arrivée, `.reveal` au défilement (seulement si le navigateur connaît `animation-timeline`), `.lift` au survol. Le contenu doit rester visible quand elles ne jouent pas.

## Contraintes qui ne dépendent pas de la stack

- **Site entièrement statique** : pas de serveur, de base de données ni de compte.
- **Aucune statistique, aucun traceur, aucune ressource tierce chargée par le navigateur** (polices, scripts, lecteurs vidéo intégrés, CDN). Les polices sont hébergées avec le site. Le plugin promet que rien ne quitte l'ordinateur ; le site ne doit pas contredire cette promesse ni exiger de bandeau de cookies.
- **L'installateur n'est jamais stocké dans le site** (environ 300 Mo). Le bouton de téléchargement pointe vers `https://github.com/ValotKzm/livesubtitles/releases/latest`.
- **Le site doit fonctionner sous un sous-chemin** (`valotkzm.github.io/<dépôt>/`) comme à la racine d'un futur nom de domaine : passer par la configuration `base` d'Astro, jamais de chemin absolu écrit en dur.
- **Accessibilité** : le site présente un outil d'accessibilité, il doit être exemplaire. Contrastes suffisants, navigation au clavier, respect de `prefers-reduced-motion`, texte alternatif, et toute vidéo de démonstration accompagnée d'un équivalent textuel.

## Ce que le site peut affirmer

Les textes viennent du `README.md` du plugin, qui existe en français et en anglais. Ne rien promettre que le plugin ne tient pas.

- Gratuit, logiciel libre (GPL version 2 ou ultérieure), sans compte, clé API ni serveur. La voix ne quitte pas l'ordinateur et rien n'est enregistré.
- Français et anglais uniquement, dans les deux sens, ou sous-titres sans traduction.
- Windows 10 ou 11 (64 bits) et OBS Studio 31.1 ou plus récent. Environ 300 Mo sur le disque et 500 Mo de mémoire pendant l'écoute.
- Les sous-titres apparaissent une à deux secondes après chaque phrase : ne pas parler de sous-titrage instantané ou mot à mot.
- La traduction convient à la conversation courante, sans être parfaite, et connaît mal le vocabulaire du streaming.
- Un seul microphone ; une seule langue de sous-titres à la fois, incrustée dans l'image.
- L'installateur n'est pas signé : Windows affiche « Windows a protégé votre ordinateur ». La page d'installation doit montrer où cliquer (Informations complémentaires, puis Exécuter quand même).
- Les performances n'ont été mesurées que sur une machine puissante : ne donner aucune garantie pour un PC modeste.

## Contenu de la page, dans l'ordre

1. Phrase d'accroche et bouton de téléchargement, visibles sans faire défiler.
2. Démonstration.
3. Les trois arguments : gratuit, tout reste sur l'ordinateur, sans compte ni clé API.
4. Installation en trois étapes, avec capture d'écran de l'avertissement Windows.
5. Configuration requise et langues disponibles.
6. Lien vers le dépôt GitHub : code source, licences, signalement de bugs.

## Fichiers provisoires et privés

`public/demo/demo-cartoon.svg` est une illustration animée en SVG et CSS, au format 16:9 : un streamer dessiné, un jeu de tir cartoon et les sous-titres traduits qui arrivent une à deux secondes après chaque phrase. Elle porte la mention « ILLUSTRATION » et la légende précise que ce n'est pas une capture réelle. L'utilisateur pourra la remplacer plus tard par une vraie vidéo. Ne pas fabriquer de fausse capture d'OBS présentée comme réelle.



## Règles de travail

- Fais le changement minimal qui répond à la tâche. N'ajoute pas de dépendance sans besoin démontré.
- Ne suppose pas qu'une API, une option de configuration ou une commande existe : vérifie-la dans le dépôt ou la documentation officielle.
- Après chaque changement, lance la vérification ciblée disponible, puis le build si le risque le justifie. Rapporte exactement ce qui a été vérifié.
- Ne crée pas de commit sans demande explicite.
- Travaille sur une branche par étape (`feat/...`, `fix/...`, `docs/...`), fusionnée dans `main` avec un commit de merge une fois l'étape vérifiée, puis supprimée.
- Les messages de commit et de merge ne mentionnent aucun outil d'IA et ne portent aucune ligne de co-auteur automatique.
- Ne lance pas tout le plan d'un seul coup : un jalon de `PLAN.md` à la fois, marqué terminé seulement après vérification de son critère de sortie.
