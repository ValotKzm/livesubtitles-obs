import { expect, test } from '@playwright/test';
import { getDictionary } from '../src/i18n';

test.use({ colorScheme: 'light' });

test('le bouton de thème bascule et le choix est retenu', async ({ page }) => {
	await page.goto('./');
	const html = page.locator('html');
	await expect(html).not.toHaveAttribute('data-theme', /.*/);

	await page.getByRole('button', { name: getDictionary('en').nav.theme }).click();
	await expect(html).toHaveAttribute('data-theme', 'dark');

	await page.reload();
	await expect(html).toHaveAttribute('data-theme', 'dark');

	await page.goto('fr/');
	await expect(html).toHaveAttribute('data-theme', 'dark');

	await page.getByRole('button', { name: getDictionary('fr').nav.theme }).click();
	await expect(html).toHaveAttribute('data-theme', 'light');
});
