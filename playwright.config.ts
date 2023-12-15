import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview:development',
		port: 4173
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	reporter: process.env.CI ? 'github' : 'list',
	use: {
		extraHTTPHeaders: {
			Authorization: `Basic ${Buffer.from('admin:admin').toString('base64')}`
		}
	},
	projects: [
		{
			name: 'setup',
			testMatch: /global\.setup\.ts/
		},
		{
			name: 'tests',
			dependencies: ['setup']
		}
	]
};

export default config;
