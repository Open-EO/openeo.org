<template>
	<div class="apiSpec" ref="container"></div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { withBase } from 'vitepress';
import { useVersioning } from '../versioning.js';

const REDOC_URL = 'https://cdn.jsdelivr.net/npm/redoc/bundles/redoc.standalone.js';

const { version } = useVersioning();
const container = ref(null);

const specUrl = computed(() => '/documentation/' + version.value.folder + '/developers/api/openapi.' + (version.value.apiFormat ? version.value.apiFormat : 'yaml'));

function loadRedoc() {
	if (window.Redoc) {
		return Promise.resolve(window.Redoc);
	}
	return new Promise((resolve, reject) => {
		const scriptTag = document.createElement('script');
		scriptTag.src = REDOC_URL;
		scriptTag.onload = () => resolve(window.Redoc);
		scriptTag.onerror = reject;
		document.head.appendChild(scriptTag);
	});
}

onMounted(async () => {
	const Redoc = await loadRedoc();
	// This is a workaround for issue https://github.com/Redocly/redoc/issues/1129
	const yOffset = Math.round(document.querySelector('.VPNav').getBoundingClientRect().bottom);
	Redoc.init(withBase(specUrl.value), {
		pathInMiddlePanel: true,
		expandResponses: '200,201,202,203,204',
		scrollYOffset: yOffset
	}, container.value);
});
</script>
