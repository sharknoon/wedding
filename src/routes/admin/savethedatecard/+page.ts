export const load: import('./$types').PageLoad = ({ url }) => {
	const id = url.searchParams.get('id') || 'mustermann';
	return {
		id
	};
};
