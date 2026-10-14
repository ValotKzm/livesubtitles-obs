// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages : le site est servi sous /<dépôt>/. Avec un nom de domaine
  // propre, changer `site` et supprimer `base`.
  site: 'https://valotkzm.github.io',
  base: '/livesubtitles-obs',

  // Anglais à la racine, français sous /fr/.
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en'
  },

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
