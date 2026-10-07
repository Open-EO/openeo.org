<template>
	<iframe :src="frameUrl" class="stretch"></iframe>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps(['url', 'version']);
const frameUrl = ref(null);

onMounted(() => {
	let url = props.url.replace('{apiTag}', props.version.apiTag).replace('{processesTag}', props.version.processesTag);
	if (window.location.hash) {
		url += window.location.hash;
	}
	frameUrl.value = url;
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
