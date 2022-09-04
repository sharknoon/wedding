export const load: import('./$types').PageLoad = ({ url }) => {
	const salutation = url.searchParams.get('salutation') || 'Liebe Doris, lieber Hartmut';
	return {
		salutation
	};
};
