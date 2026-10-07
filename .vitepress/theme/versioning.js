import { computed, ref } from 'vue';
import { useData, useRoute } from 'vitepress';
import { data as pages } from './pages.data.js';

const versionPathRE = /\/documentation\/([^/]+)\//;
const processesQueryParam = 'version';

// Requested processes version, shared by all components
const requestedProcessesVersion = ref(null);

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

export function useProcessesVersioning() {
  const { version } = useVersioning();

  const processesVersions = computed(() => version.value.processesVersions || [version.value.processesTag]);

  const processesVersion = computed(() => {
    const requested = requestedProcessesVersion.value;
    return processesVersions.value.includes(requested) ? requested : version.value.processesTag;
  });

  function readProcessesVersion() {
    requestedProcessesVersion.value = new URLSearchParams(window.location.search).get(processesQueryParam);
  }

  function selectProcessesVersion(processesTag) {
    requestedProcessesVersion.value = processesTag;
    const url = new URL(window.location.href);
    if (processesTag === version.value.processesTag) {
      url.searchParams.delete(processesQueryParam);
    }
    else {
      url.searchParams.set(processesQueryParam, processesTag);
    }
    window.history.replaceState(window.history.state, '', url);
  }

  return { processesVersions, processesVersion, readProcessesVersion, selectProcessesVersion };
}
