<template>
	<DocGen :document="documentUrl" :apiVersion="version.apiTag" />
</template>

<script>
import DocGen from '@openeo/processes-docgen/src/DocGen.vue';
import VersioningMixin from '@theme/components/VersioningMixin.vue';

export default {
	name: 'ProcessesSpec',
	mixins: [ VersioningMixin ],
	components: { DocGen },
	computed: {
		documentUrl() {
			return '/documentation/' + this.version.folder + '/processes.json';
		}
	}
};
</script>

<style lang="stylus">
.docgen .search-box 
	width: 100%
.docgen .search-box .icon
	display none
</style>