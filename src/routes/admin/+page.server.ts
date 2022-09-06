import { redirect } from '@sveltejs/kit';

export const load: import('./$types').PageServerLoad = () => {
	throw redirect(302, '/admin/invitations');
};
