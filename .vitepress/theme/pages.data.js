import { createContentLoader } from 'vitepress';

export default createContentLoader('documentation/**/*.md', {
  transform: pages => pages.map(page => page.url.replace(/(^|\/)README\.html$/, '$1'))
});
