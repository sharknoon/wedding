export const load: import('./$types').PageLoad = ({ url }) => {
	const slug = url.searchParams.get('slug') || 'mustermann';
	return {
		slug
	};
};
