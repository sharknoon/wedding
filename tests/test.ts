import { expect, test } from '@playwright/test';

test('index page tells the viewer to use the link of the save-the-date card', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('div')).toContain('Bitte scanne den QR-Code');
});
