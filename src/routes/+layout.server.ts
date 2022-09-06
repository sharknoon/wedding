import { getDetails } from '$lib/database';

export const load: import('./$types').LayoutServerLoad = async () => {
	const details = await getDetails();

	return { details: details };
};
