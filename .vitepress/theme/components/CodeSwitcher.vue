<template>
  <div class="code-switcher">
    <div class="tabs" role="tablist">
      <button
        v-for="(label, key) in actualLanguages"
        :key="key"
        type="button"
        role="tab"
        :aria-selected="key === selected"
        :class="{ active: key === selected }"
        @click="select(key)"
      >{{ label }}</button>
    </div>
    <div
      v-for="(label, key) in actualLanguages"
      :key="key"
      v-show="key === selected"
      class="tab-content"
      role="tabpanel"
    >
      <slot :name="key" />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

const GROUPS = {
  default: { py: 'Python', r: 'R', js: 'JavaScript' }
};

// Shared across all switchers so that they show the same language
const selections = reactive({});
</script>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  name: {
    type: String,
    default: 'default'
  },
  isolated: {
    type: Boolean,
    default: false
  },
  languages: {
    type: Object,
    required: false
  }
});

const localSelection = ref(null);

const actualLanguages = computed(() => props.languages || GROUPS[props.name] || {});
const storageKey = computed(() => `vuepress-plugin-code-switcher@${props.name}`);
const selected = computed(() => {
  const value = props.isolated ? localSelection.value : selections[props.name];
  return value in actualLanguages.value ? value : Object.keys(actualLanguages.value)[0];
});

function select(key) {
  if (props.isolated) {
    localSelection.value = key;
    return;
  }
  selections[props.name] = key;
  try {
    localStorage.setItem(storageKey.value, key);
  } catch (e) {}
}

onMounted(() => {
  if (props.isolated || selections[props.name]) {
    return;
  }
  try {
    const stored = localStorage.getItem(storageKey.value);
    if (stored) {
      selections[props.name] = stored;
    }
  } catch (e) {}
});
</script>

<style>
.code-switcher {
  margin: 16px 0;
}

.code-switcher .tabs {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--vp-c-divider);
}

.code-switcher .tabs button {
  padding: 0 12px;
  line-height: 40px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color 0.25s, border-color 0.25s;
}

.code-switcher .tabs button:hover {
  color: var(--vp-c-text-1);
}

.code-switcher .tabs button.active {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-brand-1);
}
</style>
