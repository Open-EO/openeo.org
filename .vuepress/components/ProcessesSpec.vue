<template>
	<DocGen :document="documentUrl" :apiVersion="version.apiTag" />
</template>

<script>

import VersioningMixin from '@theme/components/VersioningMixin.vue';

export default {
	name: 'ProcessesSpec',
	mixins: [ VersioningMixin ],
	components: {
		DocGen: () => import('@openeo/processes-docgen/src/DocGen.vue') 
	},
	computed: {
		documentUrl() {
			// Only works in production. Prepend `/assets`  in dev
			return '/documentation/' + this.version.folder + '/processes.json';
		}
	}
};
</script>