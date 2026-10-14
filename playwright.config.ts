import { defineConfig, devices } from '@playwright/test';

// Les tests tournent sur le build statique servi par `astro preview`, sous le
// même sous-chemin que sur GitHub Pages. Port distinct du serveur de développement.
const port = 4322;
// Doit correspondre à `base` dans astro.config.mjs.
const base = '/livesubtitles-obs/';

export default defineConfig({
	testDir: 'tests',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 1 : 0,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		baseURL: `http://localhost:${port}${base}`,
		trace: 'on-first-retry'
	},
	// En local, Edge déjà installé sur Windows ; en intégration continue, le
	// Chromium de Playwright (`playwright install chromium`).
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'], channel: process.env.CI ? undefined : 'msedge' }
		}
	],
	webServer: {
		command: `pnpm build && pnpm preview --port ${port}`,
		url: `http://localhost:${port}${base}`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000
	}
});
