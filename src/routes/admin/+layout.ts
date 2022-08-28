export const load: import('./$types').LayoutLoad = ({ url }) => {
	return {
		path: url.pathname
	};
};
