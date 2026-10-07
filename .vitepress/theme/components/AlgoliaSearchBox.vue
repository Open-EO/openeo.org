<script setup>
// Replaces VitePress' VPAlgoliaSearchBox.vue (see config.js) as the index also contains other websites:
// No language filter and results from other websites are opened as external links.
import docsearch from '@docsearch/js';
import { useData, useRoute, useRouter } from 'vitepress';
import { nextTick, onMounted } from 'vue';

const props = defineProps({
  algolia: {
    type: Object,
    required: true
  }
});

const router = useRouter();
const route = useRoute();
const { site } = useData();

const internalUrlRE = /^https?:\/\/(www\.)?openeo\.org\//;
const absoluteUrlRE = /^[a-z]+:/i;

onMounted(async () => {
  await nextTick();
  docsearch({
    ...props.algolia,
    container: '#docsearch',

    navigator: {
      navigate({ itemUrl }) {
        if (absoluteUrlRE.test(itemUrl)) {
          window.location.assign(itemUrl);
          return;
        }
        const { pathname: hitPathname } = new URL(window.location.origin + itemUrl);
        // router doesn't handle same-page navigation so we use the native
        // browser location API for anchor navigation
        if (route.path === hitPathname) {
          window.location.assign(window.location.origin + itemUrl);
        } else {
          router.go(itemUrl);
        }
      }
    },

    transformItems(items) {
      return items.map(item => {
        if (absoluteUrlRE.test(item.url) && !internalUrlRE.test(item.url)) {
          return item;
        }
        return Object.assign({}, item, { url: getRelativePath(item.url) });
      });
    },

    hitComponent({ hit, children }) {
      return {
        __v: null,
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: { href: hit.url, children }
      };
    }
  });
});

function getRelativePath(url) {
  const { pathname, hash } = new URL(url, location.origin);
  return pathname.replace(/\.html$/, site.value.cleanUrls ? '' : '.html') + hash;
}
</script>

<template>
  <div id="docsearch" />
</template>
