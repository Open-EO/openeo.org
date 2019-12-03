<template>
	<div id="docVersionChooser" v-if="versioned">
		<div class="dropdown-wrapper" v-if="!sidebar">
			<button type="button" aria-label="Version" class="dropdown-title">
				<span class="title">Version: {{ version.title }}</span> <span class="arrow right"></span>
			</button>
			<ul class="nav-dropdown" style="display: none;">
				<li class="dropdown-item">
					<h4>Applicable API Versions</h4>
					<ul class="dropdown-subitem-wrapper">
						<template v-if="version.apiVersions.length">
							<li class="dropdown-subitem" v-for="v in version.apiVersions" :key="v">
								<span>{{ v }}</span>
							</li>
						</template>
						<li v-else class="dropdown-subitem">
							<em>Unreleased</em>
						</li>
					</ul>
				</li>
				<li class="dropdown-item">
					<h4>Other Page Versions</h4>
					<ul class="dropdown-subitem-wrapper">
						<template v-if="otherVersions.length">
							<li class="dropdown-subitem" v-for="(v, i) in otherVersions" :key="i">
								<NavLink :item="{ link: v.regularPath, text: v.title }" />
							</li>
						</template>
						<li v-else class="dropdown-subitem">
							<em>Not available</em>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<nav class="nav-links" v-else>
			<div class="nav-item">
				<div class="dropdown-wrapper open">
					<button type="button" aria-label="Other Versions" class="dropdown-title">
						<span class="title">Other Page Versions</span>
					</button>
					<ul class="nav-dropdown">
						<template v-if="otherVersions.length">
							<li class="dropdown-item" v-for="(v, i) in otherVersions" :key="i">
								<NavLink :item="{ link: v.regularPath, text: v.title }" />
							</li>
						</template>
						<li v-else class="dropdown-item">
							<em>Not available</em>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</template>


<script>
import NavLink from '@vuepress/theme-default/components/NavLink.vue';
import VersioningMixin from '@theme/components/VersioningMixin.vue';

export default {
	name: 'VersionChooser',
	components: { NavLink },
	props: {
		sidebar: {
			type: Boolean,
			default: false
		}
	},
	mixins: [VersioningMixin]
}
</script>

<style lang="stylus">
@media (min-width: $MQMobile)
	#docVersionChooser
		display inline-block
		z-index 10
		position fixed
		top 4.6rem
		right 2rem
		border-radius 0.5em
		border 1px solid $borderColor
		background-color white
		font-size 0.9rem

	#docVersionChooser button 
		margin 0.3rem 0.6rem

@media (max-width: $MQMobile)
	#docVersionChooser .dropdown-wrapper .dropdown-title:hover
		color $textColor

#docVersionChooser
	a
		color $textColor
	a:hover
		color $accentColor
</style>