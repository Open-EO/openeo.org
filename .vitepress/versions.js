export const defaultVersion = 0;
export const versions = [
  {
    folder: '1.0',
    path: '/documentation/1.0/',
    title: '1.x',
    apiTag: '1.3.0', // Don't forget to update the submodules in public/documentation/...
    processesTag: '1.2.0',
    apiVersions: [
      '1.0.0',
      '1.0.1',
      '1.1.0',
      '1.2.0',
      '1.3.0'
    ],
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
    apiTag: '0.4.2',
    apiFormat: 'json',
    processesTag: '0.4.2',
    apiVersions: [
      '0.4.0',
      '0.4.1',
      '0.4.2'
    ],
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
