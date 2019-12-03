<template>
  <main class="home" aria-labelledby="main-title">
    <header class="hero">
      <img src="/images/openeo_logo.png" alt="openEO">

      <p class="description">
        openEO develops an open API to connect R, Python, JavaScript and other clients to big Earth observation cloud back-ends in a simple and unified way.
      </p>

      <p class="action">
        <NavLink class="action-button" :item="{link: '/about/', text: 'Why?'}"/>
        <NavLink class="action-button" :item="{link: this.$site.themeConfig.docPath + 'getting-started.html', text: 'Get Started!'}"/>
      </p>
    </header>

    <div class="features">
      <div class="feature">
        <h2>Latest News</h2>
        <News :limit="2" />
      </div>
      <div class="feature">
        <h2>Other Channels</h2>
        <Channels />
      </div>
      <div class="feature">
        <h2>
          <img align="right" src="https://openeo.org/images/eu.jpg" alt="EU flag" style="height: 1.8rem" />
          Funding
        </h2>
        <p>
          openEO is an H2020 project funded under call EO-2-2017: EO Big Data Shift, under grant number <a href="http://cordis.europa.eu/projects/776242" target="_blank">776242</a>. The project runs from Oct 2017 to Sept 2020.
        </p>
      </div>
    </div>

    <Content class="theme-default-content custom"/>
  </main>
</template>

<script>
import NavLink from '@vuepress/theme-default/components/NavLink.vue'

export default {
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
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 40rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
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
    flex-basis 30%
    max-width 30%
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
