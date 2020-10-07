const https = require('https');
const fs = require('fs');
const config = require('./config.js');

for (var v of config.themeConfig.versions) {
	let folder = '.vuepress/public/assets/documentation/' + v.folder + '/';
	fs.mkdirSync(folder, { recursive: true });

	// Get processes.json from Processes repo
	if (v.processesTag) {
		copyFromWeb(
			'https://raw.githubusercontent.com/Open-EO/openeo-processes/gh-pages/'+v.processesTag+'/processes.json',
			folder + 'processes.json'
		);
	}
}
	
copyFromWeb(
	'https://raw.githubusercontent.com/Open-EO/PSC/main/README.md',
	'psc.md'
);

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