module.exports = {
  title: 'openEO',
  description: 'openEO develops an open API to connect various clients to big EO cloud back-ends in a simple and unified way.',
  themeConfig: {
    logo: '/images/openeo_navbar_logo.png',
    editLinks: true,
    docsRepo: 'Open-EO/openeo.org',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
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
      { text: 'User Documentation', items: [
          {text: 'Getting Started', link: '/documentation/getting-started.html'},
          {text: 'Glossary', link: '/documentation/glossary.html'},
          {text: 'Processes', link: '/documentation/processes.html'},
          {text: 'UDFs', link: '/documentation/udfs.html'}
      ] },
      { text: 'Developers', items: [
          {text: 'Introduction', link: '/documentation/developers/'},
          {text: 'Glossary', link: '/documentation/glossary.html'},
          {text: 'Architecture', link: '/documentation/developers/arch.html'},
          {text: 'Service Providers', items: [
              {text: 'Getting Started', link: '/documentation/developers/backends/getting-started.html'},
              {text: 'UDFs', link: '/documentation/developers/backends/udfs.html'}
          ]},
          {text: 'Client Developers', items: [
              {text: 'Getting Started', link: '/documentation/developers/clients/getting-started.html'},
              {text: 'Library Guidelines', link: '/documentation/developers/clients/library-guidelines.html'},
          ]},
          {text: 'API', link: '/documentation/developers/api/'},
          {text: 'Processes', link: '/documentation/processes.html'},
          {text: 'Error Codes', link: '/documentation/developers/api/errors.html'},
          {text: 'Examples', link: '/documentation/developers/examples/'}
      ] },
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