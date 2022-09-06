export const load: import('./$types').PageLoad = ({ url }) => {
	const salutation = url.searchParams.get('salutation') || 'Liebe Familie Mustermann';
	return {
		salutation
	};
};
