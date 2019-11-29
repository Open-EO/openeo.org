<template>
	<iframe :src="frameUrl" class="fullpage"></iframe>
</template>

<script>
export default {
	name: 'InlineFrame',
	props: ['src'],
	computed: {
		frameUrl() {
			var url = this.src;
			if (window.location.hash) {
				url += window.location.hash;
			}
			return url;
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