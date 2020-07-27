<template>
	<component v-if="docgenComponent" :is="docgenComponent" :document="documentUrl" :apiVersion="version.apiTag" />
</template>

<script>

import VersioningMixin from '@theme/components/VersioningMixin.vue';

export default {
	name: 'ProcessesSpec',
	mixins: [ VersioningMixin ],
	data() {
		return {
			docgenComponent: null
		};
	},
	computed: {
		documentUrl() {
			return '/documentation/' + this.version.folder + '/processes.json';
		}
	},
	beforeMount() {
		// See https://vuepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions
		import('@openeo/processes-docgen/dist/DocGen.css');
		import('@openeo/processes-docgen/dist/DocGen.umd.min.js').then(module => {
      		this.docgenComponent = module.default;
    	});
	}
};
</script>

<style lang="stylus">
.docgen .search-box 
	width: 100%
.docgen .search-box .icon
	display none
</style>