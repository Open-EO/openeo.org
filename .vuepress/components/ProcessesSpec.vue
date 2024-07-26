<template>
	<DocGen :document="documentUrl" :apiVersion="version.apiTag" :notice="notice" showExperimentalByDefault />
</template>

<script>

import VersioningMixin from '@theme/components/VersioningMixin.vue';

export default {
	name: 'ProcessesSpec',
	mixins: [ VersioningMixin ],
	components: {
		DocGen: () => import('@openeo/processes-docgen/src/DocGen.vue') 
	},
	data() {
		return {
			notice: '**Note:** This is the list of all processes specified by the openEO project. Back-ends implement a varying set of processes. Thus, the processes you can use at a specific back-end may derive from the specification, may include non-standardized processes and may not implement all processes listed here. Please check each back-end individually for the processes they support. The client libraries usually have a function called `listProcesses` or `list_processes` for that.'
		};
	},
	computed: {
		documentUrl() {
			// Only works in production. Prepend `/assets`  in dev
			return '/documentation/' + this.version.folder + '/processes.json';
		}
	}
};
</script>

<style>
.docgen section.action-bar {
	display: none !important;
}
</style>