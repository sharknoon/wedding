export const load: import('./$types').PageLoad = ({ url }) => {
	const id = url.searchParams.get('id') || 'guhl';
	return {
		id
	};
};
