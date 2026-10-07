---
layout: home
hero:
  image:
    src: /images/openeo_logo.png
    alt: openEO
  tagline: openEO develops an API that allows users to connect to Earth observation cloud back-ends in a simple and unified way.<br><br>The project maintains the API and process specifications, and an open-source ecosystem with clients and server implementations.
  actions:
    - text: Why?
      link: /about.html
      theme: alt
    - text: Get Started!
      link: '{docPath}'
---

<p class="home-note">openEO is not to be confused with independant services that implement the specifications such as <a href="https://openeo.cloud" target="_blank">openEO Platform</a> or <a href="https://dataspace.copernicus.eu/" title="Copernicus Data Space Ecosystem" target="_blank">CDSE</a>.<br />For a list of services built on top of openEO, please visit the <a href="https://hub.openeo.org" target="_blank">openEO Hub</a>.</p>

<div class="home-columns">
  <div class="home-column">
    <h2>Latest News</h2>
    <News :limit="3" />
  </div>
  <div class="home-column">
    <h2>Other Channels</h2>
    <Channels />
  </div>
</div>
