<template>
	<iframe :src="frameUrl" class="stretch"></iframe>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps(['url', 'version', 'processesVersion']);
const hash = ref(null);

const frameUrl = computed(() => {
	if (hash.value === null) {
		return null;
	}
	const url = props.url.replace('{apiTag}', props.version.apiTag).replace('{processesTag}', props.processesVersion);
	return url + hash.value;
});

onMounted(() => {
	hash.value = window.location.hash;
});
</script>

<style>
iframe.stretch {
	display: block;
	width: 100%;
	height: calc(100vh - var(--vp-nav-height));
	border: 0;
}
</style>
