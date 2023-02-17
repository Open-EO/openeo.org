<template>
  <div class="channels">
    <ul v-if="contact" class="contact">
      <!-- Thankfully provided by https://simpleicons.org/ -->
      <li><a v-if="email" href="mailto:openeo.psc@uni-muenster.de" target="_blank" class="mail"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/mail-dot-ru.svg" alt="Email the PSC" title="Email the PSC" /> Email</a></li>
      <li><a v-if="chat" href="https://gitter.im/Open-EO/community" target="_blank" class="chat"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/hipchat.svg" alt="Public chat on Gitter" title="Public chat on Gitter" /> Chat</a></li>
      <li><a v-if="github && !code" href="https://github.com/Open-EO" target="_blank" class="github"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/github.svg" alt="GitHub: Open-EO" title="GitHub: Open-EO" /> GitHub</a></li>
      <li><a v-if="twitter" href="https://twitter.com/Open_EO" target="_blank" class="twitter"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/twitter.svg" alt="Twitter: Open_EO" title="Twitter: Open_EO" /> Twitter</a></li>
      <li><a v-if="youtube" href="https://www.youtube.com/channel/UCMJQil8j9sHBQkcSlSaEsvQ" target="_blank" class="youtube"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/youtube.svg" alt="YouTube: openEO" title="YouTube: openEO" /> YouTube</a></li>
    </ul>
    <ul v-if="code" class="code">
      <li><a v-if="github" href="https://github.com/Open-EO" target="_blank" class="github"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/github.svg" alt="GitHub: Open-EO" title="GitHub: Open-EO" /> GitHub</a></li>
      <li><a v-if="cran" href="https://cran.r-project.org/package=openeo" target="_blank" class="r"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/r.svg" alt="CRAN" title="CRAN" /> CRAN / R</a></li>
      <li><a v-if="npm" href="https://www.npmjs.com/search?q=%40openeo%2F" target="_blank" class="npm"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/npm.svg" alt="npm: @openeo" title="npm: @openeo" /> npm / JS</a></li>
      <li><a v-if="pypi" href="https://pypi.org/project/openeo/" target="_blank" class="pypi"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/pypi.svg" alt="PyPI" title="PyPI" /> PyPI / Python</a></li>
      <li><a v-if="conda" href="https://anaconda.org/conda-forge/openeo" target="_blank" class="conda"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/anaconda.svg" alt="Conda Forge" title="Conda Forge" /> Conda Forge / Python</a></li>
      <li><a v-if="qgis" href="https://plugins.qgis.org/plugins/openeo-qgis-plugin-master/" target="_blank" class="qgis"><img src="https://cdn.jsdelivr.net/npm/simple-icons@1.20/icons/qgis.svg" alt="QGIS" title="QGIS" /> QGIS</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Channels',
  props: {
    contact: {
      type: Boolean,
      default: true
    },
    code: {
      type: Boolean,
      default: true
    },
    chat: {
      type: Boolean,
      default: true
    },
    email: {
      type: Boolean,
      default: true
    },
    chat: {
      type: Boolean,
      default: true
    },
    youtube: {
      type: Boolean,
      default: true
    },
    twitter: {
      type: Boolean,
      default: true
    },
    github: {
      type: Boolean,
      default: true
    },
    cran: {
      type: Boolean,
      default: true
    },
    pypi: {
      type: Boolean,
      default: true
    },
    conda: {
      type: Boolean,
      default: true
    },
    npm: {
      type: Boolean,
      default: true
    },
    qgis: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus">
.channels
  display flex

.channels ul
  margin 0 1em 0 0
  padding 0
  list-style-type none
  line-height 1.9
  flex-grow 1

.channels img 
  vertical-align middle
  height 20px

.channels a 
  text-decoration none

.channels a:hover
  text-decoration none

// The colors below are all inverted due to the use of "filter invert(1)."
.channels img 
  vertical-align middle
  height 20px
  width 20px
  filter invert(1)
  background-color #D3C1AF
  padding 2px
  margin-top: -2px
  border-radius 3px

.channels .github img
  background-color #E7E8E8

.channels .linkedin img
  background-color #FF884A

.channels .youtube img
  background-color #00FFFF

.channels .twitter img
  background-color #E25E0D

.channels .r img 
  background-color #D8923C

.channels .pypi img 
  background-color #C88A56

.channels .conda img 
  background-color #BB57CC

.channels .npm img 
  background-color #34C7C8

.channels .qgis img 
  background-color #A769CD
</style>
