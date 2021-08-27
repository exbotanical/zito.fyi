import pkg from '@pkg';

const appSettings = {
	appName: pkg.appName,
	version: pkg.version,
	author: pkg.author,
	dateFmt: { year: 'numeric', month: 'long', day: 'numeric' }
};

export default () => ({
	...cacheState(),
	...appSettings
});

export function cacheState () {
	return {
		cachedViews: []
	};
}
