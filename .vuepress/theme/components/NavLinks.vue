<template>
  <nav class="nav-links" v-if="userLinks.length">
    <!-- user links -->
    <div class="nav-item" v-for="item in userLinks" :key="item.index || item.link">
      <DropdownLink v-if="item.type === 'links'" :item="item" />
      <NavLink v-else :item="item" />
    </div>
  </nav>
</template>

<script>
import DropdownLink from '@theme/components/DropdownLink.vue'
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'NavLinks',

  components: {
    NavLink,
    DropdownLink
  },

  computed: {
    userLinks () {
      return this.$site.themeConfig.nav.map(link => {
        if (link.userNav) {
          link.items = this.getNav('userNav');
          link.index = Math.random();
        }
        else if (link.devNav) {
          link.items = this.getNav('devNav');
          link.index = Math.random();
        }
        return Object.assign(this.resolveNavLinkItem(link), {
          items: (link.items || []).map(l => this.resolveNavLinkItem(l))
        })
      })
    }
  },
  methods: {
    resolveNavLinkItem (linkItem) {
      return Object.assign(linkItem, {
        type: linkItem.items && linkItem.items.length ? 'links' : 'link'
      });
    },
    prepareNavLinks(o, base) {
      if (Array.isArray(o)) {
        return o.map(x => this.prepareNavLinks(x, base));
      }
      
      var x = Object.assign({}, o);
      for(var i in x) {
        if (x[i] && typeof x[i] === 'object') {
          x[i] = this.prepareNavLinks(x[i], base);
        }
        else if (i === 'link' && !x.link.match(/^(\/|[\w\d]+:)/i)) {
          x.link = base + x.link;
        }
      }
      return x;
    },
    getNav(key) {
      const { versions, defaultVersion } = this.$site.themeConfig;
      // Find current version
      var ix = versions.findIndex(v => this.$page.regularPath.startsWith(v.path));
      if (ix < 0) {
        ix = defaultVersion;
      }
      // build links
      var links = this.prepareNavLinks(versions[ix][key], versions[ix].path);
      // Append version info to menus
      links.push({ text: 'Versions', items: versions.map(v => { return {text: v.title, link: v.path }; }) });
      return links;

    }
  }
}
</script>

<style lang="stylus">
.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    &:first-child
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>
