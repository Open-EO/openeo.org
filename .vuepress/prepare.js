const https = require('https');
const fs = require('fs');
const config = require('./config.js');

for (var v of config.themeConfig.versions) {
	let folder = '.vuepress/public/assets/documentation/' + v.folder + '/';
	fs.mkdirSync(folder, { recursive: true });
	// Get errors.json from API repo
	copyFromWeb(
		'https://raw.githubusercontent.com/Open-EO/openeo-api/'+v.apiTag+'/errors.json',
		folder + 'errors.json'
	);
	// Get subtype-schemas.json from API repo
	copyFromWeb(
		'https://raw.githubusercontent.com/Open-EO/openeo-api/'+v.apiTag+'/subtype-schemas.json',
		folder + 'subtype-schemas.json'
	);
	// Get openapi.yaml/json from API repo
	if (!v.apiFormat) {
		v.apiFormat = 'yaml';
	}
	copyFromWeb(
		'https://raw.githubusercontent.com/Open-EO/openeo-api/'+v.apiTag+'/openapi.' + v.apiFormat,
		folder + 'openapi.' + v.apiFormat
	);
	// Get processes.json from Processes repo
	if (v.processesTag) {
		copyFromWeb(
			'https://raw.githubusercontent.com/Open-EO/openeo-processes/gh-pages/'+v.processesTag+'/processes.json',
			folder + 'processes.json'
		);
	}
}

function copyFromWeb(from, to) {
	var file = fs.createWriteStream(to);
	https.get(from, response => {
		response.pipe(file);
		file.on('finish', () => {
			file.close();
			console.log("Downloaded file " + from + " and saved to " + to);
		});
	}).on('error', (err) => { 
		fs.unlink(to);
		console.warn("Downloading file " + from + "failed:", err);
	});
}