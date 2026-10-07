import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import semver from 'semver';

export const defaultVersion = 0;
export const versions = [
  {
    folder: '1.0',
    path: '/documentation/1.0/',
    title: '1.x',
    // The applicable versions are read from the tags of the openeo-api and openeo-processes repositories
    apiRange: '1.x',
    processesRange: '>=1.0.0',
    userNav: [
      {text: 'Introduction', link: 'index.html'},
      {text: 'Glossary', link: 'glossary.html'},
      {text: 'Datacubes', link: 'datacubes.html'},
      {text: 'Getting Started', items: [
        {text: 'JavaScript', link: 'javascript/index.html'},
        {text: 'Python', link: 'python/index.html'},
        {text: 'QGIS', link: 'qgis/index.html'},
        {text: 'R', link: 'r/index.html'},
        {text: 'Client-Side Processing (Python)', link: 'python/client-side-processing.html'},
      ]},
      {text: 'Processes', link: 'processes.html'},
      {text: 'Cookbook', link: 'cookbook/index.html'},
      {text: 'Authentication', link: 'authentication.html'},
      {text: 'UDFs', link: 'udfs.html'}
    ],
    devNav: [
      {text: 'Introduction', link: 'developers/index.html'},
      {text: 'Glossary', link: 'glossary.html'},
      {text: 'Architecture', link: 'developers/arch.html'},
      {text: 'Service Providers', items: [
          {text: 'Getting Started', link: 'developers/backends/getting-started.html'},
          {text: 'Performance Guide', link: 'developers/backends/performance.html'},
          {text: 'Xarray / Dask Guide', link: 'developers/backends/xarray.html'},
          {text: 'Profiles', link: 'developers/profiles/index.html'}
      ]},
      {text: 'Client Developers', items: [
          {text: 'Getting Started', link: 'developers/clients/getting-started.html'},
          {text: 'Library Guidelines', link: 'developers/clients/library-guidelines.html'}
      ]},
      {text: 'API', items: [
          {text: 'Reference', link: 'developers/api/reference.html'},
          {text: 'Profiles', link: 'developers/profiles/api.html'}
      ]},
      {text: 'Processes', items: [
          {text: 'Reference', link: 'processes.html'},
          {text: 'Profiles', link: 'developers/profiles/processes.html'}
      ]},
      {text: 'Error Codes', link: 'developers/api/errors.html'},
      {text: 'Authentication', link: 'authentication.html'},
      {text: 'UDFs', link: 'udfs.html'},
    ]
  },
  // Remove 0.4 once we start with 2.0
  {
    folder: '0.4',
    path: '/documentation/0.4/',
    title: '0.4',
    apiFormat: 'json',
    apiRange: '0.4.x',
    processesRange: '0.4.2', // 0.4.0 and 0.4.1 are broken on processes.openeo.org
    userNav: [
      {text: 'Getting Started', link: 'getting-started.html'},
      {text: 'Glossary', link: 'glossary.html'},
      {text: 'Processes', link: 'processes.html'},
      {text: 'UDFs', link: 'udfs.html'}
    ],
    devNav: [
      {text: 'Introduction', link: 'developers/index.html'},
      {text: 'Glossary', link: 'glossary.html'},
      {text: 'Architecture', link: 'developers/arch.html'},
      {text: 'Service Providers', items: [
          {text: 'Getting Started', link: 'developers/backends/getting-started.html'},
          {text: 'UDFs', link: 'developers/backends/udfs.html'}
      ]},
      {text: 'Client Developers', items: [
          {text: 'Getting Started', link: 'developers/clients/getting-started.html'},
          {text: 'Library Guidelines', link: 'developers/clients/library-guidelines.html'}
      ]},
      {text: 'API', items: [
          {text: 'Specification', link: 'developers/api/reference.html'},
          {text: 'Further documentation', link: 'developers/api/index.html'}
      ]},
      {text: 'Processes', link: 'processes.html'},
      {text: 'Error Codes', link: 'developers/api/errors.html'},
      {text: 'Examples', link: 'developers/examples/'}
    ]
  }
];

function getTags(repo) {
  const output = execFileSync('git', ['ls-remote', '--tags', '--refs', `https://github.com/Open-EO/${repo}.git`], { encoding: 'utf-8' });
  return output.split('\n')
    .map(line => line.split('refs/tags/')[1])
    .filter(tag => semver.valid(tag));
}

// All releases in the range, plus pre-releases that are newer than the latest release
function selectVersions(tags, range) {
  const matching = tags
    .filter(tag => semver.satisfies(tag, range, { includePrerelease: true }))
    .sort(semver.compare);
  const latestRelease = matching.filter(tag => !semver.prerelease(tag)).at(-1);
  return matching.filter(tag => !semver.prerelease(tag) || !latestRelease || semver.gt(tag, latestRelease));
}

function readApiVersion(version) {
  const format = version.apiFormat || 'yaml';
  const file = new URL(`../public/documentation/${version.folder}/developers/api/openapi.${format}`, import.meta.url);
  if (!fs.existsSync(file)) {
    throw new Error(`API specification for ${version.folder} not found, run: git submodule update --init --recursive`);
  }
  const content = fs.readFileSync(file, 'utf-8');
  if (format === 'json') {
    return JSON.parse(content).info.version;
  }
  return content.match(/^info:\s*\n(?:[ \t]+.*\n)*?[ \t]+version:\s*['"]?([^'"\s]+)/m)[1];
}

const apiTags = getTags('openeo-api');
const processesTags = getTags('openeo-processes');
for (const version of versions) {
  version.apiTag = readApiVersion(version);
  version.apiVersions = selectVersions(apiTags, version.apiRange);
  version.processesVersions = selectVersions(processesTags, version.processesRange);
  version.processesTag = version.processesVersions.filter(tag => !semver.prerelease(tag)).at(-1) || version.processesVersions.at(-1);
  if (!version.processesTag) {
    throw new Error(`No processes version found for ${version.folder} in range ${version.processesRange}`);
  }
}
