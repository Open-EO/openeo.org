const https = require('https');
const fs = require('fs');
const config = require('./config.js');

for (var v of config.themeConfig.versions) {
	let folder = '.vuepress/public/assets/documentation/' + v.folder + '/';
	fs.mkdirSync(folder, { recursive: true });
	// Get errors.json from API repo
	copyFromWeb('https://raw.githubusercontent.com/Open-EO/openeo-api/'+v.apiTag+'/errors.json', folder + 'errors.json');
	// Get processes.json from Processes repo
//	if (v.processesTag) {
//		copyFromWeb('https://raw.githubusercontent.com/Open-EO/openeo-processes/gh-pages/'+v.processesTag+'/processes.json', folder + 'processes.json');
//	}
}

function copyFromWeb(from, to) {
	const file = fs.createWriteStream(to);
	https.get(from, response => {
		response.pipe(file);
	});
}