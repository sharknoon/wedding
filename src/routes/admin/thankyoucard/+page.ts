export const load: import('./$types').PageLoad = ({ url }) => {
	const salutation = url.searchParams.get('salutation') || 'Liebe Familie Mustermann';
	const slug = url.searchParams.get('slug') || 'mustermann';
	return {
		salutation,
		slug
	};
};
