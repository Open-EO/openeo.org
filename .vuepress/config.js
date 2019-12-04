const apiVersion = '0.4.2';
const versions = [
  {
    folder: 'draft',
    path: '/documentation/draft/',
    title: 'Draft',
    apiTag: 'draft',
    processesTag: 'draft',
    apiVersions: [],
    userNav: [
      {text: 'Introduction', link: 'index.html'},
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
      {text: 'API', link: 'developers/api/reference.html'},
      {text: 'Processes', link: 'processes.html'},
      {text: 'Error Codes', link: 'developers/api/errors.html'},
      {text: 'Examples', link: 'developers/examples/'}
    ]
  },
  {
    folder: '0.4',
    path: '/documentation/0.4/',
    title: 'v0.4.x',
    apiTag: '0.4.2',
    processesTag: '0.4.2',
    apiVersions: [
      '0.4.2',
      '0.4.1',
      '0.4.0'
    ],
    userNav: [
      {text: 'Introduction', link: 'index.html'},
      {text: 'Getting Started', link: 'getting-started.html'},
      {text: 'Glossary', link: 'glossary.html'},
      {text: 'Processes', link: 'processes.html'}
    ],
    devNav: [
      {text: 'Introduction', link: 'developers/index.html'},
      {text: 'Glossary', link: 'glossary.html'},
      {text: 'Documentation', link: 'developers/api/index.html'},
      {text: 'Processes', link: 'processes.html'}
    ]
  },
  {
    folder: '0.3',
    path: '/documentation/0.3/',
    title: 'v0.3.x',
    apiTag: '0.3.1',
    processesTag: null,
    apiVersions: [
      '0.3.0',
      '0.3.1'
    ],
    userNav: [
      {text: 'Introduction', link: 'index.html'},
      {text: 'Getting Started', link: 'getting-started.html'},
      {text: 'Glossary', link: 'glossary.html'}
    ],
    devNav: [
      {text: 'Introduction', link: 'developers/index.html'},
      {text: 'Glossary', link: 'glossary.html'},
      {text: 'Documentation', link: 'developers/api/index.html'}
    ]
  }
];

const defaultVersion = 1;

module.exports = {
  title: 'openEO',
  description: 'openEO develops an open API to connect various clients to big EO cloud back-ends in a simple and unified way.',
  themeConfig: {
    apiVersion: apiVersion,
    versions: versions,
    defaultVersion: defaultVersion,
    docPath: versions[defaultVersion].path,
    logo: '/images/openeo_navbar_logo.png',
    editLinks: true,
    docsRepo: 'Open-EO/openeo.org',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about.html' },
      { text: 'News', link: '/news/' },
      { text: 'Meet us', link: '/meet-us.html' },
      { text: 'Software', items: [
          {text: 'Overview', link: '/software.html'},
          {text: 'JavaScript Client', link: 'https://js.openeo.org'},
          {text: 'Python Client', link: 'https://python.openeo.org'},
          {text: 'QGIS Plug-in', link: 'https://github.com/Open-EO/openeo-qgis-plugin'},
          {text: 'R Client', link: 'https://r.openeo.org'},
          {text: 'Web Editor', link: 'https://editor.openeo.org'}
      ] },
      { text: 'Hub', link: 'https://hub.openeo.org' },
      { text: 'User Documentation', userNav: true, items: [] },
      { text: 'Developers', devNav: true, items: [] },
      { text: 'Contact', link: '/contact.html' }
    ],
    sidebar: 'auto'
  },
  plugins: [
    '@vuepress/register-components',
    'check-md',
    '@vuepress/active-header-links',
    '@vuepress/last-updated',
    'code-switcher',
    ['vuepress-plugin-code-copy', true]
  ],
  serviceWorker: true
};