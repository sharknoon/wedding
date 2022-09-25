import { getDetails, getInvitationByPath, setDetails } from '$lib/server/database';
import type { Details } from '$lib/types';
import { error, redirect } from '@sveltejs/kit';

export const load: import('./$types').PageServerLoad = async ({ params }) => {
	const invitationPath: string = params.slug;

	if (!invitationPath) {
		throw error(100, 'Missing invitation slug');
	}

	let details: Details | null = await getDetails();
	const invitation = await getInvitationByPath(invitationPath);

	if (!details) {
		details = {
			date: '2042-01-01T00:00:42.000',
			locationName: 'locationName',
			street: 'street',
			city: 'city',
			text: ['This is some example invitation text.', 'Change me in the database.'],
			deadline: '2042-01-01T00:00:42.000',
			program: [
				{
					time: '2042-01-01T00:00:42.000',
					title: 'Program item no. 1',
					background: 'some-image.jpg',
					description: ['This is a example text for a program item.', 'Change me in the database.']
				}
			],
			faqs: [
				{
					question: 'Example question no. 1',
					answer: ['This is a example answer for a faq item.', 'Change me in the database.']
				}
			],
			privateStreet: 'privateStreet',
			privateCity: 'privateCity',
			milestones: [{ date: '2042-01-01T00:00:42.000', title: 'title', image: 'heart' }]
		};
		await setDetails(details);

		console.info(
			'Database has been freshly initialized. Please fill in the required informations in the details collection in the database.'
		);
	}
	if (!invitation) {
		throw redirect(302, '/');
	}

	return {
		details: details,
		invitation: invitation
	};
};
