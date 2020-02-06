<script>
export default {
  computed: {
    unreleased() {
      return (this.version.apiTag.match(/(draft|alpha|beta)/i) !== null);
    },

    versioned() {
      return this.$page.regularPath.match(/\/documentation\/([^\/]+)\//) !== null;
    },

    otherVersions() {
      return this.$site.themeConfig.versions
        .map((v, vix) => {
          var current = this.$site.themeConfig.versions[this.versionIndex];
          var next = this.$site.themeConfig.versions[vix];
          v.regularPath = this.$page.regularPath.replace(current.path, next.path);
          return v;
        })
        .filter((v, vix) => (vix !== this.versionIndex && this.$site.pages.findIndex(p => p.regularPath == v.regularPath) >= 0));
    },

    version() {
      return this.$site.themeConfig.versions[this.versionIndex];
    },

    defaultVersion() {
      return this.$site.themeConfig.versions[this.$site.themeConfig.defaultVersion];
    },

    versionIndex() {
      const { themeConfig } = this.$site;
      var match = this.$page.regularPath.match(/\/documentation\/([^\/]+)\//);
      if (Array.isArray(match) && typeof match[1] === 'string') {
        for(var i in themeConfig.versions) {
          if (themeConfig.versions[i].folder === match[1]) {
            return parseInt(i);
          }
        }
      }
      return 0;
    }
  }
};
</script>