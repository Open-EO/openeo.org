import fs from 'node:fs';

const fileRE = /\/documentation\/([^/]+)\/developers\/api\/errors\.json$/;

export default {
  watch: ['../../public/documentation/*/developers/api/errors.json'],
  load(files) {
    const errors = {};
    for (const file of files) {
      const folder = file.match(fileRE)[1];
      errors[folder] = JSON.parse(fs.readFileSync(file, 'utf-8'));
    }
    return errors;
  }
};
