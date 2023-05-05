import { expect, test } from '@playwright/test';

test('index page tells the viewer to use the link of the save-the-date card', async ({ page }) => {
	await page.goto('/');
	const infoText = await page.textContent('div');
	expect(infoText).toContain('Bitte scanne den QR-Code');
});

test('index page has a input field for the invitation code which checks if the invitation code exists', async ({
	page
}) => {
	await page.goto('/');
	await page.fill('input', 'some stupid input');
	await page.keyboard.press('Enter');
	expect(await page.textContent('#invitation-code-not-found-error')).toContain('nicht gefunden');
});

test('the admin can create a invitation in the admin panel', async ({ page }) => {
	await page.goto('/admin');
	await page.getByText('Neue Einladung erstellen').click();
	await page.getByPlaceholder('Liebe Erika, lieber Max').fill('Lieber Tom Tester');
	await page.getByPlaceholder('Erika Mustermann').fill('Tom Tester');
	await page.getByText('Speichern').click();
	await page.waitForTimeout(1000);
	await expect(page.locator('tr:has-text("Tom Tester")')).toBeVisible();
});

test('the new user can fill out his invitation code and see the invitation', async ({ page }) => {
	await page.goto('/');
	await page.fill('input', 'tester');
	await page.keyboard.press('Enter');
	await page.waitForURL(/.*\/tester/);
	await expect(page.getByRole('heading', { name: 'Die Hochzeit', exact: true })).toBeVisible();
	await expect(page.getByText('Zusagen')).toBeVisible();
	await expect(page.getByText('Absagen')).toBeVisible();
});

test('the user can decline the invite', async ({ page }) => {
	await page.goto('/tester');
	await page.getByText('Absagen').click();
	await page.waitForTimeout(500);
	await expect(page.getByText('Abgesagt')).toBeVisible();
});

test('the user can still accept the invite after declining it', async ({ page }) => {
	await page.goto('/tester');
	await page.getByRole('button', { name: 'Doch noch zusagen' }).click();
	await page.waitForTimeout(500);
	await expect(page.getByText('Ich esse')).toBeVisible();
	await page.getByPlaceholder('Max hat eine Nussallergie').fill('Testallergy');
	let warningMessage = false;
	page.on('dialog', (dialog) => {
		warningMessage = dialog.message() === 'Bitte gebt auch eure Ernährungsform an.';
		dialog.accept();
	});
	await page.locator('button.bg-black:has-text("Zusagen")').click();
	await page.waitForTimeout(500);
	expect(warningMessage).toBe(true);
	await page.locator('select').selectOption('omnivorisch (Alles)');
	await page.locator('button.bg-black:has-text("Zusagen")').click();
	await page.waitForTimeout(500);
	await expect(page.getByText('Zugesagt')).toBeVisible();
});

test('the admin can delete a invitation in the admin panel', async ({ page }) => {
	await page.goto('/admin');
	page.on('dialog', (dialog) => dialog.accept());
	await page.locator('tr:has-text("Tom Tester")').last().getByRole('button').last().click();
	await page.waitForTimeout(1000);
	await expect(page.locator('tr:has-text("Tom Tester")')).not.toBeVisible();
});
