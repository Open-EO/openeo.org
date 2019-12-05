<template>
	<iframe :src="frameUrl" class="stretch"></iframe>
</template>

<script>
export default {
	name: 'InlineFrame',
	props: ['url', 'version'],
	data() {
		return {
			frameUrl: null
		};
	},
	beforeMount() {
		this.frameUrl = this.url.replace('{apiTag}', this.version.apiTag).replace('{processesTag}', this.version.processesTag);
		if (window.location.hash) {
			this.frameUrl += window.location.hash;
		}
	}
};
</script>

<style lang="stylus">
iframe.stretch
	width 100%
	height 100%
	border 0
</style>