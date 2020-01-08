const config = require('./config.js');

export default ({ router, Vue }) => {
	Vue.config.ignoredElements = [
		'redoc'
	];

	router.addRoutes(config.themeConfig.redirects);
}