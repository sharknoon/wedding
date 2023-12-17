import { getUploads } from '$lib/server/database';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	return { uploads: await getUploads() };
}) satisfies PageServerLoad;
