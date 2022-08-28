
export const load: import('./$types').Load = ({ url }) => {
	const id = url.searchParams.get('id') || 'guhl';
	return {
		id
	};
};
