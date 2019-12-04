const config = require('./config.js');

const defaultVersion = config.themeConfig.versions[config.themeConfig.defaultVersion];

export default ({ router }) => {
	router.addRoutes([
		// Redirect to latest docs
		{ path: '/documentation', redirect: defaultVersion.path },
		// Redirect from old openeo.org links to new links
		{ path: '/about', redirect: 'about.html' },
		{ path: '/meet-us', redirect: 'meet-us.html' },
		{ path: '/software', redirect: 'software.html' },
		{ path: '/contact', redirect: 'contact.html' },
		{ path: '/glossary', redirect: defaultVersion.path + 'glossary.html' }
	])
}