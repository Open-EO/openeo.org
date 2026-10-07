import { createContentLoader } from 'vitepress';
import { formatDate } from './dates.js';

export default createContentLoader('news/*.md', {
  transform: pages => pages
    .filter(page => page.frontmatter.news)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
    .map(page => ({
      url: page.url,
      title: page.frontmatter.title,
      date: formatDate(page.frontmatter.date)
    }))
});
