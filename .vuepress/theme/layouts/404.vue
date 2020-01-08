<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>{{ title }}</h1>
      <blockquote>{{ message }}</blockquote>
      <router-link :to="link">{{ linkTitle }}</router-link>
    </div>
  </div>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
]

export default {
  mounted() {
    if (this.redirect) {
      window.setTimeout(() => {
        window.location.replace(this.redirect);
      }, 1000);
    }
  },
  computed: {
      // Fix https://github.com/vuejs/vuepress/issues/239#issuecomment-446944681
    redirect() {
      var path = this.$route.path.replace(/\/$/, '');
      var redirect = this.$themeConfig.redirects.find(r => r.path == path || r.redirect == path);
      if (redirect) {
        return redirect.redirect;
      }
      else {
        return null;
      }
    },
    link() {
      if (this.redirect) {
        return this.redirect;
      }
      else {
        return '/';
      }
    },
    linkTitle() {
      if (this.redirect) {
        return 'Click here if you are not redirected automatically...';
      }
      else {
        return 'Take me home.';
      }
    },
    title() {
      if (this.redirect) {
        return "New location";
      }
      else {
        return 'Page not found';
      }
    },
    message() {
      if (this.redirect) {
        return "The page you requested has been moved to "+this.redirect+".";
      }
      else {
        return "404 - " + msgs[Math.floor(Math.random() * msgs.length)];
      }
    }
  }
}
</script>
