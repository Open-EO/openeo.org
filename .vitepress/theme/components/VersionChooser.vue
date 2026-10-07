<template>
  <component
    v-if="versioned"
    :is="floating ? 'details' : 'div'"
    class="version-chooser"
    :class="{ floating, inline }"
  >
    <component :is="floating ? 'summary' : 'p'" class="title">Version: {{ version.title }}</component>
    <p>
      <span class="label">Applicable API versions:</span>&#32;<em v-if="unreleased">Unreleased</em><template v-else>{{ version.apiVersions.join(', ') }}</template>
    </p>
    <p>
      <span class="label">Other page versions:</span>&#32;<template v-if="otherVersions.length">
        <template v-for="(v, i) in otherVersions" :key="v.link"><template v-if="i">, </template><a :href="withBase(v.link)">{{ v.title }}</a></template>
      </template>
      <em v-else>Not available</em>
    </p>
  </component>
</template>

<script setup>
import { withBase } from 'vitepress';
import { useVersioning } from '../versioning.js';

defineProps({
  floating: {
    type: Boolean,
    default: false
  },
  inline: {
    type: Boolean,
    default: false
  }
});

const { versioned, version, unreleased, otherVersions } = useVersioning();
</script>

<style>
.version-chooser {
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.version-chooser p {
  margin: 0;
}

.version-chooser .title {
  font-size: 14px;
  font-weight: 600;
  line-height: 32px;
  color: var(--vp-c-text-1);
}

.version-chooser .label {
  font-weight: 500;
}

.version-chooser a {
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

.version-chooser a:hover {
  color: var(--vp-c-brand-2);
}

.version-chooser:not(.floating):not(.inline) {
  margin-bottom: 24px;
  padding-left: 16px;
  border-left: 1px solid var(--vp-c-divider);
}

.version-chooser.inline {
  margin-bottom: 24px;
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

@media (min-width: 1280px) {
  .VPDoc.has-aside .version-chooser.inline {
    display: none;
  }
}

.version-chooser.floating {
  position: fixed;
  top: calc(var(--vp-nav-height) + 16px);
  right: 32px;
  z-index: 10;
  max-width: 300px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  box-shadow: var(--vp-shadow-2);
}

.version-chooser.floating[open] {
  padding-bottom: 8px;
}

.version-chooser.floating summary {
  cursor: pointer;
}
</style>
