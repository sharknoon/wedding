import { getDetails, getInvitation, updateInvitation } from '$lib/database';
import { GOOGLE_MAPS_API_KEY } from '$lib/env';

export const GET: import('./__types/index').RequestHandler = async ({ params }) => {
	const invitationId: string = params.id;

	if (!invitationId) {
		return {
			status: 400,
			body: { message: 'Missing invitation id' }
		};
	}

	const invitation = await getInvitation(invitationId);
	const details = await getDetails();

	if (!invitation) {
		return {
			status: 303,
			headers: {
				location: `/`
			}
		};
	}

	return {
		body: { invitation: invitation, details: details, googleMapsApiKey: GOOGLE_MAPS_API_KEY }
	};
};

export const PUT: import('./__types/index').RequestHandler = async ({ params, request }) => {
	const invitationId: string = params.id;

	if (!invitationId) {
		return {
			status: 400,
			body: { message: 'Missing invitation id' }
		};
	}

	const result = await updateInvitation(invitationId, await request.json());

	if (result.matchedCount != 1) {
		return {
			status: 404,
			body: { message: 'Invitation not found' }
		};
	}
	return {
		status: 200,
		body: { message: 'Ok' }
	};
};
