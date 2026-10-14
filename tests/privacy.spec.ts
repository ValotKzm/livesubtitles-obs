import { expect, test } from '@playwright/test';

// Le plugin promet que rien ne quitte l'ordinateur : la page ne doit charger
// aucune ressource d'un autre domaine (police, script, statistiques, CDN).
for (const path of ['./', 'fr/']) {
	test(`aucune requête vers un autre domaine (${path})`, async ({ page, baseURL }) => {
		const origin = new URL(baseURL!).origin;
		const foreign: string[] = [];
		page.on('request', (request) => {
			const url = request.url();
			if (!url.startsWith('data:') && new URL(url).origin !== origin) foreign.push(url);
		});

		await page.goto(path);
		// Faire défiler jusqu'en bas pour déclencher les images et l'îlot chargés à l'approche.
		await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
		await page.waitForLoadState('networkidle');

		expect(foreign).toEqual([]);
	});
}
