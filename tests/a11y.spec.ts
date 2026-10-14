import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { getDictionary, locales } from '../src/i18n';

const paths = { en: './', fr: 'fr/' } as const;

// Thème suivi depuis le système, puis choisi avec le bouton contre l'avis du
// système : les valeurs du thème sombre existent en deux exemplaires dans le CSS.
const themes = [
	{ name: 'clair', colorScheme: 'light' },
	{ name: 'sombre', colorScheme: 'dark' },
	{ name: 'sombre choisi', colorScheme: 'light', saved: 'dark' },
	{ name: 'clair choisi', colorScheme: 'dark', saved: 'light' }
] as const;

for (const locale of locales) {
	for (const theme of themes) {
		test.describe(`${locale}, thème ${theme.name}`, () => {
			// Sans animation, axe mesure les couleurs finales et non un fondu en cours.
			test.use({ colorScheme: theme.colorScheme, reducedMotion: 'reduce' });

			test('aucune violation axe', async ({ page }) => {
				if ('saved' in theme) {
					await page.addInitScript((value) => localStorage.setItem('theme', value), theme.saved);
				}
				await page.goto(paths[locale]);
				// Attendre l'hydratation du simulateur pour analyser son état interactif.
				const s = getDictionary(locale).demo.simulator;
				await page.getByRole('group', { name: s.settings }).scrollIntoViewIfNeeded();
				await expect(page.getByRole('radio', { name: s.languages.fr }).first()).toBeEnabled();

				const { violations } = await new AxeBuilder({ page })
					.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
					.analyze();
				const summary = violations.map((v) => ({
					rule: v.id,
					impact: v.impact,
					targets: v.nodes.map((n) => n.target.join(' '))
				}));
				expect(summary).toEqual([]);
			});
		});
	}
}
