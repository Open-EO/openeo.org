<template>
  <div class="channels">
    <ul v-if="contact" class="contact">
      <!-- Thankfully provided by https://simpleicons.org/ -->
      <li><a v-if="email" href="mailto:openeo.psc@uni-muenster.de" target="_blank" class="mail"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/maildotru.svg" alt="Email the PSC" title="Email the PSC" /> Email</a></li>
      <li><a v-if="github" href="https://github.com/Open-EO" target="_blank" class="github"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/github.svg" alt="GitHub: Open-EO" title="GitHub: Open-EO" /> GitHub</a></li>
      <li><a v-if="linkedin" href="https://www.linkedin.com/company/openeospec/" target="_blank" class="linkedin"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/linkedin.svg" alt="LinkedIn" title="LinkedIn" /> LinkedIn</a></li>
      <li><a v-if="bluesky" href="https://bsky.app/profile/openeo.org" target="_blank" class="bluesky"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/bluesky.svg" alt="Bluesky: openeo.org" title="Bluesky: openeo.org" /> Bluesky</a></li>
      <li><a v-if="youtube" href="https://www.youtube.com/channel/UCMJQil8j9sHBQkcSlSaEsvQ" target="_blank" class="youtube"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/youtube.svg" alt="YouTube: openEO" title="YouTube: openEO" /> YouTube</a></li>
    </ul>
    <ul v-if="code" class="code">
      <li><a v-if="cran" href="https://cran.r-project.org/package=openeo" target="_blank" class="r"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/r.svg" alt="CRAN" title="CRAN" /> CRAN / R</a></li>
      <li><a v-if="npm" href="https://www.npmjs.com/search?q=%40openeo%2F" target="_blank" class="npm"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/npm.svg" alt="npm: @openeo" title="npm: @openeo" /> npm / JS</a></li>
      <li><a v-if="pypi" href="https://pypi.org/project/openeo/" target="_blank" class="pypi"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/pypi.svg" alt="PyPI" title="PyPI" /> PyPI / Python</a></li>
      <li><a v-if="conda" href="https://anaconda.org/conda-forge/openeo" target="_blank" class="conda"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/anaconda.svg" alt="Conda Forge" title="Conda Forge" /> Conda Forge / Python</a></li>
      <li><a v-if="julia" href="https://github.com/Open-EO/openeo-julia-client" target="_blank" class="julia"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/julia.svg" alt="Julia" title="Julia" /> Julia</a></li>
      <li><a v-if="qgis" href="https://plugins.qgis.org/plugins/openeo-qgis-plugin-master/" target="_blank" class="qgis"><img src="https://cdn.jsdelivr.net/npm/simple-icons@13/icons/qgis.svg" alt="QGIS" title="QGIS" /> QGIS</a></li>
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
    bluesky: {
      type: Boolean,
      default: true
    },
    linkedin: {
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
    julia: {
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

.channels .gitter img
  background-color #12e69a

.channels .julia img
  background-color #6aa74d

.channels .github img
  background-color #E7E8E8

.channels .linkedin img
  background-color #ff884a

.channels .youtube img
  background-color #00FFFF

.channels .bluesky img
  background-color #fd7a00

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
