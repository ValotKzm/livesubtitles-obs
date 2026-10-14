import { expect, test } from '@playwright/test';
import { getDictionary, links, localeNames, locales } from '../src/i18n';

// Adresses relatives à `baseURL`, qui contient déjà le sous-chemin du site.
const paths = { en: './', fr: 'fr/' } as const;

for (const locale of locales) {
	const t = getDictionary(locale);

	test.describe(`page ${locale}`, () => {
		test('affiche les six sections dans la bonne langue', async ({ page }) => {
			await page.goto(paths[locale]);
			await expect(page.locator('html')).toHaveAttribute('lang', locale);
			await expect(page).toHaveTitle(t.meta.title);
			await expect(page.getByRole('heading', { level: 1 })).toHaveText(t.hero.title);
			for (const title of [
				t.demo.title,
				t.arguments.title,
				t.install.title,
				t.requirements.title,
				t.source.title
			]) {
				await expect(page.getByRole('heading', { level: 2, name: title })).toBeVisible();
			}
		});

		test('le bouton de téléchargement pointe vers la dernière version', async ({ page }) => {
			await page.goto(paths[locale]);
			const download = page.locator('#download');
			await expect(download).toHaveText(t.hero.download);
			await expect(download).toHaveAttribute('href', links.download);
		});

		test('les langues à venir renvoient vers le suivi des demandes', async ({ page }) => {
			await page.goto(paths[locale]);
			await expect(page.getByText(t.requirements.upcoming)).toBeVisible();
			await expect(page.getByRole('link', { name: t.requirements.upcomingLink })).toHaveAttribute(
				'href',
				links.issues
			);
		});

		test('le lien d’évitement mène au contenu', async ({ page }) => {
			await page.goto(paths[locale]);
			await page.keyboard.press('Tab');
			const skip = page.getByRole('link', { name: t.nav.skip });
			await expect(skip).toBeFocused();
			await page.keyboard.press('Enter');
			await expect(page).toHaveURL(/#main$/);
		});
	});
}

test('le sélecteur de langue passe d’une langue à l’autre', async ({ page }) => {
	await page.goto(paths.en);
	await page.getByRole('link', { name: localeNames.fr }).click();
	await expect(page).toHaveURL(/\/livesubtitles-website\/fr\/$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(getDictionary('fr').hero.title);
	await expect(page.getByRole('link', { name: localeNames.fr })).toHaveAttribute('aria-current', 'page');

	await page.getByRole('link', { name: localeNames.en }).click();
	await expect(page).toHaveURL(/\/livesubtitles-website\/$/);
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(getDictionary('en').hero.title);
});

for (const viewport of [
	{ width: 1440, height: 900 },
	{ width: 360, height: 740 }
]) {
	test.describe(`fenêtre de ${viewport.width} px`, () => {
		test.use({ viewport });

		test('accroche et téléchargement visibles sans défiler, sans défilement horizontal', async ({
			page
		}) => {
			await page.goto(paths.en);
			await expect(page.getByRole('heading', { level: 1 })).toBeInViewport();
			await expect(page.locator('#download')).toBeInViewport();
			const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
			expect(scrollWidth).toBeLessThanOrEqual(viewport.width);
		});
	});
}

test.describe('sans JavaScript', () => {
	test.use({ javaScriptEnabled: false });

	test('la page reste lisible et le téléchargement utilisable', async ({ page }) => {
		const t = getDictionary('en');
		await page.goto(paths.en);
		await expect(page.locator('#download')).toHaveAttribute('href', links.download);
		// Le bouton de thème a besoin de JavaScript : il reste caché.
		await expect(page.getByRole('button', { name: t.nav.theme })).toBeHidden();
		// Le rendu initial du simulateur montre une phrase et son sous-titre.
		const demo = page.locator('#demo');
		await expect(demo.getByText('Bonjour à tous, bienvenue sur le stream !')).toBeVisible();
		await expect(demo.getByText('Hello everyone, welcome to the stream!')).toBeVisible();
	});
});
