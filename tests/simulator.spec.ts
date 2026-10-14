import { expect, test, type Page } from '@playwright/test';
import { getDictionary } from '../src/i18n';

const s = getDictionary('en').demo.simulator;

// Le simulateur est un îlot hydraté quand il devient visible (`client:visible`) :
// on le fait défiler à l'écran, puis on attend que les choix de langue soient actifs.
async function openSimulator(page: Page) {
	await page.goto('./');
	await page.getByRole('group', { name: s.settings }).scrollIntoViewIfNeeded();
	const spoken = page.getByRole('group', { name: s.spokenLabel });
	const subtitle = page.getByRole('group', { name: s.subtitleLabel });
	await expect(spoken.getByRole('radio', { name: s.languages.fr })).toBeEnabled();
	return { spoken, subtitle };
}

test('la lecture démarre seule et le bouton Pause l’arrête', async ({ page }) => {
	await openSimulator(page);
	const toggle = page.getByRole('button', { name: s.pause });
	await expect(toggle).toHaveAttribute('aria-pressed', 'true');
	// La phrase suivante commence après l'affichage du sous-titre.
	await expect(page.getByText(s.statusSpeaking)).toBeVisible({ timeout: 8_000 });

	await toggle.click();
	const play = page.getByRole('button', { name: s.play });
	await expect(play).toHaveAttribute('aria-pressed', 'false');
});

test('choisir la même langue des deux côtés annonce des sous-titres sans traduction', async ({ page }) => {
	const { subtitle } = await openSimulator(page);
	await expect(page.getByText(s.sameLanguage)).toBeHidden();
	await subtitle.getByText(s.languages.fr).click();
	await expect(subtitle.getByRole('radio', { name: s.languages.fr })).toBeChecked();
	await expect(page.getByText(s.sameLanguage)).toBeVisible();
});

test('les choix de langue se pilotent au clavier', async ({ page }) => {
	const { spoken } = await openSimulator(page);
	const fr = spoken.getByRole('radio', { name: s.languages.fr });
	const en = spoken.getByRole('radio', { name: s.languages.en });
	await fr.focus();
	await page.keyboard.press('ArrowRight');
	await expect(en).toBeChecked();
	await expect(en).toBeFocused();
});

test.describe('avec prefers-reduced-motion', () => {
	test.use({ reducedMotion: 'reduce' });

	test('pas de lecture automatique', async ({ page }) => {
		await openSimulator(page);
		await expect(page.getByRole('button', { name: s.play })).toHaveAttribute('aria-pressed', 'false');
		await expect(page.getByText(s.statusShown)).toBeVisible();
	});
});
