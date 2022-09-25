import { getAllInvitations, getDetails, setDetails } from '$lib/server/database';
import type { Details } from '$lib/types';

export const load: import('./$types').LayoutServerLoad = async ({ url }) => {
	let details: Details | null = await getDetails();
	const invitations = await getAllInvitations();

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

	return { details: details, invitations: invitations, path: url.pathname };
};
