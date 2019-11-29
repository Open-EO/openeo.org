---
news: true
title:  "First week of intensive collaboration: Dec 4-6, 2017"
date:   2017-12-18
author: Edzer Pebesma
---

On Dec 4-6, VITO's [remote sensing
lab](https://remotesensing.vito.be/) hosted the first
openEO _week of intensive collaboration_, in Mol,
Belgium. Thirteen developers from 8 different partners
gathered to discuss, and work on realising the [first three use
cases](https://appelmar.github.io/openeo-api-docs/poc/index.html),
which are planned to be delivered in Month 6 (March 2018):

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">First week of intense collaboration for <a href="https://twitter.com/hashtag/openEO?src=hash&amp;ref_src=twsrc%5Etfw">#openEO</a> <a href="https://twitter.com/VITO_RS_?ref_src=twsrc%5Etfw">@VITO_RS_</a>, drafting a first API and doing use cases. <a href="https://twitter.com/MundialisInfo?ref_src=twsrc%5Etfw">@MundialisInfo</a> <a href="https://twitter.com/EODC_GmbH?ref_src=twsrc%5Etfw">@EODC_GmbH</a> <a href="https://twitter.com/hashtag/ifgi?src=hash&amp;ref_src=twsrc%5Etfw">#ifgi</a> <a href="https://twitter.com/CopernicusEU?ref_src=twsrc%5Etfw">@CopernicusEU</a> <a href="https://twitter.com/sinergise?ref_src=twsrc%5Etfw">@sinergise</a> <a href="https://twitter.com/EURAC?ref_src=twsrc%5Etfw">@EURAC</a> <a href="https://twitter.com/hashtag/JRC?src=hash&amp;ref_src=twsrc%5Etfw">#JRC</a> <a href="https://t.co/9uCYd9A96S">pic.twitter.com/9uCYd9A96S</a></p>&mdash; openEO (@open_EO) <a href="https://twitter.com/open_EO/status/938000627078230016?ref_src=twsrc%5Etfw">December 5, 2017</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>


We worked on the following back-ends:

* Sentinel hub
* EODC file-based
* Rasdaman
* GRASS
* GeoTrellis

and on the R and python clients, and started working on a [glossary](/documentation/glossary.md).

Among the many insights we gathered by sitting together and talk, we found that

* the "core API" as described in the proposal is not so much a software layer on itself, but rather an API in front of every compute back-end; this simplifies the whole architecture pretty much
* OpenSearch should have the ability to describe _collections_ of granules (or images, tiles) in addition to describing individual granules
* band can be seen as array dimension as well as attributes of array records, but seeing it as a dimension may make life easier
* use case 1 can be described as a sequence of filter operations (on image collection, bounding box, date range, and bands) followed by two aggregate operations (compute division over bands, compute mininum over time)

Intermediate results can be found in a bunch of repositories, mostly proof-of-concept, on the openEO [Github organisation](https://github.com/Open-EO/).

