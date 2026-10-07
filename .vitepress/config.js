import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitepress';
import { versions, defaultVersion } from './versions.js';

const docPath = versions[defaultVersion].path;

const nav = [
  { text: 'Home', link: '/' },
  { text: 'About', link: '/about.html' },
  { text: 'News', link: '/news/' },
  { text: 'Meetings', link: '/meetings.html' },
  { text: 'Software', link: '/software.html' },
  { text: 'Services', link: 'https://hub.openeo.org' },
  { text: 'User Documentation', versionNav: 'userNav' },
  { text: 'Developers', versionNav: 'devNav' },
  { text: 'PSC', link: '/psc.html' },
  { text: 'Contact', link: '/contact.html' }
];

function resolveLinks(items, base) {
  return items.map(item => {
    if (item.items) {
      return { ...item, items: resolveLinks(item.items, base) };
    }
    if (/^(\/|\w+:)/.test(item.link)) {
      return item;
    }
    return { ...item, link: base + item.link.replace(/(^|\/)index\.html$/, '$1') };
  });
}

function navForVersion(version) {
  const versionLinks = { text: 'Versions', items: versions.map(v => ({ text: v.title, link: v.path })) };
  return nav.map(({ versionNav, ...item }) => {
    if (!versionNav) {
      return item;
    }
    return { ...item, items: [...resolveLinks(version[versionNav], version.path), versionLinks] };
  });
}

// Locales without a label are used to switch the versioned nav menus, no language menu is shown.
const locales = { root: { lang: 'en-US' } };
versions.forEach((version, i) => {
  if (i !== defaultVersion) {
    locales[version.path.slice(1, -1)] = { lang: 'en-US', themeConfig: { nav: navForVersion(version) } };
  }
});

export default defineConfig({
  title: 'openEO',
  description: 'openEO develops an open API to connect various clients to big EO cloud back-ends in a simple and unified way.',
  lang: 'en-US',
  locales,
  rewrites: id => id.replace(/(^|\/)README\.md$/, '$1index.md'),
  srcExclude: ['public/**'],
  lastUpdated: true,
  appearance: false,
  themeConfig: {
    versions,
    defaultVersion,
    docPath,
    logo: '/images/openeo_navbar_logo.png',
    logoLink: '/',
    nav: navForVersion(versions[defaultVersion]),
    outline: [2, 4],
    externalLinkIcon: true,
    editLink: {
      pattern: 'https://github.com/Open-EO/openeo.org/edit/master/:path'
    },
    search: {
      provider: 'algolia',
      options: {
        appId: '3J2STFK847',
        apiKey: 'b12d6cb143c2ddadfa8989c962d1a049',
        indexName: 'openeo'
      }
    },
    footer: {
      message: 'This documentation is licensed under the <a href="https://github.com/Open-EO/openeo.org/blob/master/LICENSE" target="_blank" rel="noreferrer">Apache License, Version 2.0</a>.'
    }
  },
  transformPageData(pageData) {
    const fm = pageData.frontmatter;
    if (fm.news) {
      fm.aside ??= false;
    }
    if (fm.hero?.actions) {
      fm.hero.actions.forEach(action => action.link = action.link.replace('{docPath}', docPath));
    }
  },
  vite: {
    resolve: {
      alias: [
        {
          // The index also contains pages from other websites, which the default component can't handle
          find: /^.*\/VPAlgoliaSearchBox\.vue$/,
          replacement: fileURLToPath(new URL('./theme/components/AlgoliaSearchBox.vue', import.meta.url))
        }
      ]
    }
  }
});
