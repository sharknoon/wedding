import { ping as bsPing } from '$lib/server/blobstorage';
import { ping as dbPing } from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const dbPingResult = await dbPing();
	const bsPingResult = await bsPing();
	if (!dbPingResult.ok) {
		error(500, 'Database is not reachable');
	}
	if (!bsPingResult) {
		error(500, 'Blobstorage is not reachable');
	}
	return new Response();
};
