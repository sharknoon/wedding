import { test as setup, expect } from '@playwright/test';

setup('check health of app, database and blobstorage', async ({ request }) => {
	const health = await request.get('/health');
	expect(health.ok()).toBeTruthy();
});
