<template>
  <main
    class="home"
    aria-labelledby="main-title"
  >
    <header class="hero">
      <img src="/images/openeo_logo.png" alt="openEO">

      <p class="description">
        openEO develops an API that allows users to connect to Earth observation cloud back-ends in a simple and unified way.
      </p>

      <p class="description">
        The project maintains the API and process specifications, and an open-source ecosystem with clients and server implementations.
      </p>

      <p class="description small">
        openEO is not to be confused with independant services that implement the specifications such as <a href="https://openeo.cloud" target="_blank">openEO Platform</a> or <a href="https://dataspace.copernicus.eu/" title="Copernicus Data Space Ecosystem" target="_blank">CDSE</a>.<br />For a list of services built on top of openEO, please visit the <a href="https://hub.openeo.org" target="_blank">openEO Hub</a>.
      </p>

      <p class="action">
        <NavLink class="action-button" :item="{link: '/about/', text: 'Why?'}"/>
        <NavLink class="action-button" :item="{link: this.$site.themeConfig.docPath, text: 'Get Started!'}"/>
      </p>
    </header>

    <div class="features">
      <div class="feature">
        <h2>Latest News</h2>
        <News :limit="3" />
      </div>
      <div class="feature">
        <h2>Other Channels</h2>
        <Channels />
      </div>
    </div>

    <Content class="theme-default-content custom"/>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'

export default {
  name: 'Home',

  components: { NavLink },

  props: ['blog', 'defaultVersion'],

  computed: {
    data () {
      return this.$page.frontmatter
    }
  }
}
</script>

<style lang="stylus">
.home
  padding-top $navbarHeight
  max-width $homePageWidth
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 179px
      display block
      margin 1.5rem auto
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 42rem
      font-size 1.4rem
      line-height 1.3
      color lighten($textColor, 40%)
      &.small
        font-size 1.1rem
      a
        text-decoration: underline
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 49%
    max-width 49%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
