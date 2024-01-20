import { expect, test } from '@playwright/test';

test('user can access the images', async ({ page }) => {
	await page.goto('/bilder');
	await expect(page.getByRole('heading', { name: 'Danke!', exact: true })).toBeVisible();
});

test('user can upload images', async ({ page }) => {
	await page.goto('/bilder');
	await page.setInputFiles('input[type=file]', 'tests/testimage.png');
	//await page.getByRole("button", { name: "Bilder hochladen" }).click();
	//await page.waitForTimeout(1000);
	//await expect(page.locator('img')).toBeVisible();
});
