import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('div')).toBe(
		'Bitte scanne den QR-Code oder gebe den Link der Save-the-Date Karte ein um die Einladung anzusehen'
	);
});
