import { getDetails, getInvitationBySlug } from '$lib/server/database';
import type { Details } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const slug: string = params.slug;

	if (!slug) {
		throw error(100, 'Missing invitation slug');
	}

	const details: Details | null = await getDetails();
	const invitation = await getInvitationBySlug(slug);

	if (!details) {
		throw error(500, 'Could not load wedding details');
	}
	if (!invitation) {
		throw redirect(
			302,
			`/?message=${encodeURIComponent(
				'Der Einladungscode ' +
					slug +
					' konnte nicht gefunden werden. Vielleicht hast du dich vertippt?'
			)}`
		);
	}

	return {
		details: details,
		invitation: invitation
	};
};
