opconst config = require('./config.js');

const defaultVersion = config.themeConfig.versions[config.themeConfig.defaultVersion];

export default ({ router, Vue }) => {
	Vue.config.ignoredElements = [
		'redoc'
	];

	// Currently not working, see https://github.com/vuejs/vuepress/issues/1803
	// Places html files instead, can be removed once 1803 is fixed.
	router.addRoutes([
		// Redirect to latest docs
		{ path: '/documentation', redirect: defaultVersion.path },
		// Redirect from old openeo.org links to new links
		{ path: '/about', redirect: 'about.html' },
		{ path: '/software', redirect: 'software.html' },
		{ path: '/contact', redirect: 'contact.html' },
		{ path: '/glossary', redirect: defaultVersion.path + 'glossary.html' },
		{ path: '/documentation/1.0/developers/backends/opendatacube.html', redirect: '/documentation/1.0/developers/backends/xarray.html' }
	]);
}
