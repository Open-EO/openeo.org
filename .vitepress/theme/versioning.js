import { computed } from 'vue';
import { useData, useRoute } from 'vitepress';
import { data as pages } from './pages.data.js';

const versionPathRE = /\/documentation\/([^/]+)\//;

export function useVersioning() {
  const { theme } = useData();
  const route = useRoute();

  const versions = computed(() => theme.value.versions);

  const versioned = computed(() => versionPathRE.test(route.path));

  const versionIndex = computed(() => {
    const match = route.path.match(versionPathRE);
    const index = match ? versions.value.findIndex(v => v.folder === match[1]) : -1;
    return index >= 0 ? index : theme.value.defaultVersion;
  });

  const version = computed(() => versions.value[versionIndex.value]);

  const unreleased = computed(() => /(draft|alpha|beta)/i.test(version.value.apiTag));

  const otherVersions = computed(() => {
    const path = route.path.replace(/index\.html$/, '');
    return versions.value
      .map((v, i) => ({ index: i, title: v.title, link: path.replace(version.value.path, v.path) }))
      .filter(v => v.index !== versionIndex.value && pages.includes(v.link));
  });

  return { versions, versioned, version, unreleased, otherVersions };
}
