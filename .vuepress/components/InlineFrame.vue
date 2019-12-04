<template>
	<iframe :src="frameUrl" class="fullpage"></iframe>
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
iframe.fullpage
	width 100%
	padding-top 3.6rem
	height calc(100vh - 3.6rem - 4px)
	border 0
</style>