(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{136:function(t,e,s){"use strict";var n=s(36);s.n(n).a},137:function(t,e,s){"use strict";var n=s(37);s.n(n).a},139:function(t,e,s){"use strict";var n=s(38);s.n(n).a},140:function(t,e,s){"use strict";var n=s(39);s.n(n).a},141:function(t,e,s){"use strict";var n=s(40);s.n(n).a},142:function(t,e,s){"use strict";var n=s(41);s.n(n).a},144:function(t,e,s){"use strict";var n=s(42);s.n(n).a},145:function(t,e,s){"use strict";var n=s(43);s.n(n).a},146:function(t,e,s){"use strict";var n=s(44);s.n(n).a},147:function(t,e,s){"use strict";var n=s(45);s.n(n).a},148:function(t,e,s){"use strict";var n=s(46);s.n(n).a},149:function(t,e,s){"use strict";var n=s(47);s.n(n).a},150:function(t,e,s){"use strict";var n=s(48);s.n(n).a},17:function(t,e,s){"use strict";var n={computed:{unreleased(){return null!==this.version.apiTag.match(/(draft|alpha|beta)/i)},versioned(){return null!==this.$page.regularPath.match(/\/documentation\/([^\/]+)\//)},otherVersions(){return this.$site.themeConfig.versions.map((t,e)=>{var s=this.$site.themeConfig.versions[this.versionIndex],n=this.$site.themeConfig.versions[e];return t.regularPath=this.$page.regularPath.replace(s.path,n.path),t}).filter((t,e)=>e!==this.versionIndex&&this.$site.pages.findIndex(e=>e.regularPath==t.regularPath)>=0)},version(){return this.$site.themeConfig.versions[this.versionIndex]},defaultVersion(){return this.$site.themeConfig.versions[this.$site.themeConfig.defaultVersion]},versionIndex(){const{themeConfig:t}=this.$site;var e=this.$page.regularPath.match(/\/documentation\/([^\/]+)\//);if(Array.isArray(e)&&"string"==typeof e[1])for(var s in t.versions)if(t.versions[s].folder===e[1])return parseInt(s);return 0}}},i=s(0),a=Object(i.a)(n,void 0,void 0,!1,null,null,null);e.a=a.exports},18:function(t,e,s){"use strict";s.d(e,"d",(function(){return n})),s.d(e,"a",(function(){return a})),s.d(e,"i",(function(){return r})),s.d(e,"f",(function(){return l})),s.d(e,"g",(function(){return c})),s.d(e,"h",(function(){return u})),s.d(e,"b",(function(){return h})),s.d(e,"e",(function(){return p})),s.d(e,"j",(function(){return d})),s.d(e,"k",(function(){return f})),s.d(e,"c",(function(){return m}));const n=/#.*$/,i=/\.(md|html)$/,a=/\/$/,r=/^[a-z]+:/i;function o(t){return decodeURI(t).replace(n,"").replace(i,"")}function l(t){return r.test(t)}function c(t){return/^mailto:/.test(t)}function u(t){return/^tel:/.test(t)}function h(t){if(l(t))return t;const e=t.match(n),s=e?e[0]:"",i=o(t);return a.test(i)?t:i+".html"+s}function p(t,e){const s=t.hash,i=function(t){const e=t.match(n);if(e)return e[0]}(e);return(!i||s===i)&&o(t.path)===o(e)}function d(t,e,s){if(l(e))return{type:"external",path:e};s&&(e=function(t,e,s){const n=t.charAt(0);if("/"===n)return t;if("?"===n||"#"===n)return e+t;const i=e.split("/");s&&i[i.length-1]||i.pop();const a=t.replace(/^\//,"").split("/");for(let t=0;t<a.length;t++){const e=a[t];".."===e?i.pop():"."!==e&&i.push(e)}""!==i[0]&&i.unshift("");return i.join("/")}(e,s));const n=o(e);for(let e=0;e<t.length;e++)if(o(t[e].regularPath)===n)return Object.assign({},t[e],{type:"page",path:h(t[e].path)});return console.error(`[vuepress] No matching page found for sidebar item "${e}"`),{}}function f(t,e,s,n){const{pages:i,themeConfig:a}=s,r=n&&a.locales&&a.locales[n]||a;if("auto"===(t.frontmatter.sidebar||r.sidebar||a.sidebar))return function(t){const e=m(t.headers||[]);return[{type:"group",collapsable:!1,title:t.title,path:null,children:e.map(e=>({type:"auto",title:e.title,basePath:t.path,path:t.path+"#"+e.slug,children:e.children||[]}))}]}(t);const o=r.sidebar||a.sidebar;if(o){const{base:t,config:s}=function(t,e){if(Array.isArray(e))return{base:"/",config:e};for(const n in e)if(0===(s=t,/(\.html|\/)$/.test(s)?s:s+"/").indexOf(encodeURI(n)))return{base:n,config:e[n]};var s;return{}}(e,o);return s?s.map(e=>function t(e,s,n,i=1){if("string"==typeof e)return d(s,e,n);if(Array.isArray(e))return Object.assign(d(s,e[0],n),{title:e[1]});{i>3&&console.error("[vuepress] detected a too deep nested sidebar group.");const a=e.children||[];return 0===a.length&&e.path?Object.assign(d(s,e.path,n),{title:e.title}):{type:"group",path:e.path,title:e.title,sidebarDepth:e.sidebarDepth,children:a.map(e=>t(e,s,n,i+1)),collapsable:!1!==e.collapsable}}}(e,i,t)):[]}return[]}function m(t){let e;return(t=t.map(t=>Object.assign({},t))).forEach(t=>{2===t.level?e=t:e&&(e.children||(e.children=[])).push(t)}),t.filter(t=>2===t.level)}},221:function(t,e,s){"use strict";s.r(e);var n=s(29),i=s.n(n),a=s(18),r={props:{item:{required:!0}},computed:{link(){return Object(a.b)(this.item.link)},exact(){return this.$site.locales?Object.keys(this.$site.locales).some(t=>t===this.link):"/"===this.link}},methods:{isExternal:a.f,isMailto:a.g,isTel:a.h,focusoutAction(){this.$emit("focusout")}}},o=s(0),l=Object(o.a)(r,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.isExternal(t.link)?s("a",{staticClass:"nav-link external",attrs:{href:t.link,target:t.isMailto(t.link)||t.isTel(t.link)?null:"_blank",rel:t.isMailto(t.link)||t.isTel(t.link)?null:"noopener noreferrer"},on:{focusout:t.focusoutAction}},[t._v("\n  "+t._s(t.item.text)+"\n  "),s("OutboundLink")],1):s("router-link",{staticClass:"nav-link",attrs:{to:t.link,exact:t.exact},nativeOn:{focusout:function(e){return t.focusoutAction(e)}}},[t._v(t._s(t.item.text))])}),[],!1,null,null,null).exports,c={components:{NavLink:l},props:["blog","defaultVersion"],computed:{data(){return this.$page.frontmatter}}},u=(s(93),Object(o.a)(c,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("main",{staticClass:"home page",attrs:{"aria-labelledby":"main-title"}},[s("header",{staticClass:"hero"},[s("img",{attrs:{src:"/images/openeo_logo.png",alt:"openEO"}}),t._v(" "),s("p",{staticClass:"description"},[t._v("\n      openEO develops an open API to connect R, Python, JavaScript and other clients to big Earth observation cloud back-ends in a simple and unified way.\n    ")]),t._v(" "),s("p",{staticClass:"action"},[s("NavLink",{staticClass:"action-button",attrs:{item:{link:"/about/",text:"Why?"}}}),t._v(" "),s("NavLink",{staticClass:"action-button",attrs:{item:{link:this.$site.themeConfig.docPath+"getting-started.html",text:"Get Started!"}}})],1)]),t._v(" "),s("div",{staticClass:"features"},[s("div",{staticClass:"feature"},[s("h2",[t._v("Latest News")]),t._v(" "),s("News",{attrs:{limit:2}})],1),t._v(" "),s("div",{staticClass:"feature"},[s("h2",[t._v("Other Channels")]),t._v(" "),s("Channels")],1),t._v(" "),t._m(0)]),t._v(" "),s("Content",{staticClass:"theme-default-content custom"})],1)}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"feature"},[e("h2",[e("img",{staticStyle:{height:"1.8rem"},attrs:{align:"right",src:"https://openeo.org/images/eu.jpg",alt:"EU flag"}}),this._v("\n        Funding\n      ")]),this._v(" "),e("p",[this._v("\n        openEO is an H2020 project funded under call EO-2-2017: EO Big Data Shift, under grant number "),e("a",{attrs:{href:"http://cordis.europa.eu/projects/776242",target:"_blank"}},[this._v("776242")]),this._v(". The project runs from Oct 2017 to Sept 2020.\n      ")])])}],!1,null,null,null).exports),h=s(220),p=(s(136),Object(o.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"sidebar-button",on:{click:function(e){return t.$emit("toggle-sidebar")}}},[s("svg",{staticClass:"icon",attrs:{xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true",role:"img",viewBox:"0 0 448 512"}},[s("path",{attrs:{fill:"currentColor",d:"M436 124H12c-6.627 0-12-5.373-12-12V80c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12zm0 160H12c-6.627 0-12-5.373-12-12v-32c0-6.627 5.373-12 12-12h424c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12z"}})])])}),[],!1,null,null,null).exports),d=s(88),f=s(138),m=s.n(f),v={components:{NavLink:l,DropdownTransition:d.a},data:()=>({open:!1}),props:{item:{required:!0}},computed:{dropdownAriaLabel(){return this.item.ariaLabel||this.item.text}},methods:{toggle(){this.open=!this.open},isLastItemOfArray:(t,e)=>m()(e)===t},watch:{$route(){this.open=!1}}},g=(s(139),{components:{NavLink:l,DropdownLink:Object(o.a)(v,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"dropdown-wrapper",class:{open:t.open}},[s("button",{staticClass:"dropdown-title",attrs:{type:"button","aria-label":t.dropdownAriaLabel},on:{click:t.toggle}},[s("span",{staticClass:"title"},[t._v(t._s(t.item.text))]),t._v(" "),s("span",{staticClass:"arrow",class:t.open?"down":"right"})]),t._v(" "),s("DropdownTransition",[s("ul",{directives:[{name:"show",rawName:"v-show",value:t.open,expression:"open"}],staticClass:"nav-dropdown"},t._l(t.item.items,(function(e,n){return s("li",{key:e.link||n,staticClass:"dropdown-item"},["links"===e.type?s("h4",[t._v(t._s(e.text))]):t._e(),t._v(" "),"links"===e.type?s("ul",{staticClass:"dropdown-subitem-wrapper"},t._l(e.items,(function(n){return s("li",{key:n.link,staticClass:"dropdown-subitem"},[s("NavLink",{attrs:{item:n},on:{focusout:function(s){t.isLastItemOfArray(n,e.items)&&t.isLastItemOfArray(e,t.item.items)&&t.toggle()}}})],1)})),0):s("NavLink",{attrs:{item:e},on:{focusout:function(s){t.isLastItemOfArray(e,t.item.items)&&t.toggle()}}})],1)})),0)])],1)}),[],!1,null,null,null).exports},computed:{userLinks(){return this.$site.themeConfig.nav.map(t=>(t.userNav?(t.items=this.getNav("userNav"),t.index=Math.random()):t.devNav&&(t.items=this.getNav("devNav"),t.index=Math.random()),Object.assign(this.resolveNavLinkItem(t),{items:(t.items||[]).map(t=>this.resolveNavLinkItem(t))})))}},methods:{resolveNavLinkItem:t=>Object.assign(t,{type:t.items&&t.items.length?"links":"link"}),prepareNavLinks(t,e){if(Array.isArray(t))return t.map(t=>this.prepareNavLinks(t,e));var s=Object.assign({},t);for(var n in s)s[n]&&"object"==typeof s[n]?s[n]=this.prepareNavLinks(s[n],e):"link"!==n||s.link.match(/^(\/|[\w\d]+:)/i)||(s.link=e+s.link);return s},getNav(t){const{versions:e,defaultVersion:s}=this.$site.themeConfig;var n=e.findIndex(t=>this.$page.regularPath.startsWith(t.path));n<0&&(n=s);var i=this.prepareNavLinks(e[n][t],e[n].path);return i.push({text:"Versions",items:e.map(t=>({text:t.title,link:t.path}))}),i}}}),b=(s(140),Object(o.a)(g,(function(){var t=this.$createElement,e=this._self._c||t;return this.userLinks.length?e("nav",{staticClass:"nav-links"},this._l(this.userLinks,(function(t){return e("div",{key:t.index||t.link,staticClass:"nav-item"},["links"===t.type?e("DropdownLink",{attrs:{item:t}}):e("NavLink",{attrs:{item:t}})],1)})),0):this._e()}),[],!1,null,null,null).exports);function _(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null)[e]}var C={components:{SidebarButton:p,NavLinks:b,SearchBox:h.a,AlgoliaSearchBox:{}},data:()=>({linksWrapMaxWidth:null}),mounted(){const t=parseInt(_(this.$el,"paddingLeft"))+parseInt(_(this.$el,"paddingRight")),e=()=>{document.documentElement.clientWidth<719?this.linksWrapMaxWidth=null:this.linksWrapMaxWidth=this.$el.offsetWidth-t-(this.$refs.siteName&&this.$refs.siteName.offsetWidth||0)};e(),window.addEventListener("resize",e,!1)},computed:{algolia(){return this.$themeLocaleConfig.algolia||this.$site.themeConfig.algolia||{}},isAlgoliaSearch(){return this.algolia&&this.algolia.apiKey&&this.algolia.indexName}}},k=(s(141),Object(o.a)(C,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("header",{staticClass:"navbar"},[s("SidebarButton",{on:{"toggle-sidebar":function(e){return t.$emit("toggle-sidebar")}}}),t._v(" "),s("router-link",{staticClass:"home-link",attrs:{to:t.$localePath}},[t.$site.themeConfig.logo?s("img",{staticClass:"logo",attrs:{src:t.$withBase(t.$site.themeConfig.logo),alt:t.$siteTitle}}):t._e(),t._v(" "),t.$siteTitle?s("span",{ref:"siteName",staticClass:"site-name",class:{"can-hide":t.$site.themeConfig.logo}},[t._v(t._s(t.$siteTitle))]):t._e()]),t._v(" "),s("div",{staticClass:"links",style:t.linksWrapMaxWidth?{"max-width":t.linksWrapMaxWidth+"px"}:{}},[t.isAlgoliaSearch?s("AlgoliaSearchBox",{attrs:{options:t.algolia}}):!1!==t.$site.themeConfig.search&&!1!==t.$page.frontmatter.search?s("SearchBox"):t._e(),t._v(" "),s("NavLinks",{staticClass:"can-hide"})],1)],1)}),[],!1,null,null,null).exports),$=s(75),x=s.n($),w={name:"PageEdit",computed:{lastUpdated(){return this.$page.lastUpdated},lastUpdatedText(){return"string"==typeof this.$themeLocaleConfig.lastUpdated?this.$themeLocaleConfig.lastUpdated:"string"==typeof this.$site.themeConfig.lastUpdated?this.$site.themeConfig.lastUpdated:"Last Updated"},editLink(){const t=x()(this.$page.frontmatter.editLink)?this.$site.themeConfig.editLinks:this.$page.frontmatter.editLink,{repo:e,docsDir:s="",docsBranch:n="master",docsRepo:i=e}=this.$site.themeConfig;return t&&i&&this.$page.relativePath?this.createEditLink(e,i,s,n,this.$page.relativePath):null},editLinkText(){return this.$themeLocaleConfig.editLinkText||this.$site.themeConfig.editLinkText||"Edit this page"}},methods:{createEditLink(t,e,s,n,i){if(/bitbucket.org/.test(t)){return(a.i.test(e)?e:t).replace(a.a,"")+"/src"+`/${n}/`+(s?s.replace(a.a,"")+"/":"")+i+`?mode=edit&spa=0&at=${n}&fileviewer=file-view-default`}return(a.i.test(e)?e:"https://github.com/"+e).replace(a.a,"")+"/edit"+`/${n}/`+(s?s.replace(a.a,"")+"/":"")+i}}},L=(s(142),Object(o.a)(w,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",{staticClass:"page-edit"},[t.editLink?s("div",{staticClass:"edit-link"},[s("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),s("OutboundLink")],1):t._e(),t._v(" "),t.lastUpdated?s("div",{staticClass:"last-updated"},[s("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+":")]),t._v(" "),s("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()])}),[],!1,null,null,null).exports),y=s(143),O=s.n(y),S={name:"PageNav",props:["sidebarItems"],computed:{prev(){return j(N.PREV,this)},next(){return j(N.NEXT,this)}}};const N={NEXT:{resolveLink:function(t,e){return E(t,e,1)},getThemeLinkConfig:({nextLinks:t})=>t,getPageLinkConfig:({frontmatter:t})=>t.next},PREV:{resolveLink:function(t,e){return E(t,e,-1)},getThemeLinkConfig:({prevLinks:t})=>t,getPageLinkConfig:({frontmatter:t})=>t.prev}};function j(t,{$themeConfig:e,$page:s,$route:n,$site:i,sidebarItems:r}){const{resolveLink:o,getThemeLinkConfig:l,getPageLinkConfig:c}=t,u=l(e),h=c(s),p=x()(h)?u:h;return!1===p?void 0:O()(p)?Object(a.j)(i.pages,p,n.path):o(s,r)}function E(t,e,s){const n=[];!function t(e,s){for(let n=0,i=e.length;n<i;n++)"group"===e[n].type?t(e[n].children||[],s):s.push(e[n])}(e,n);for(let e=0;e<n.length;e++){const i=n[e];if("page"===i.type&&i.path===decodeURIComponent(t.path))return n[e+s]}}var I=S,P=(s(144),{components:{PageEdit:L,PageNav:Object(o.a)(I,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.prev||t.next?s("div",{staticClass:"page-nav"},[s("p",{staticClass:"inner"},[t.prev?s("span",{staticClass:"prev"},[t._v("\n      ←\n      "),t.prev?s("router-link",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v(t._s(t.prev.title||t.prev.path))]):t._e()],1):t._e(),t._v(" "),t.next?s("span",{staticClass:"next"},[t.next?s("router-link",{attrs:{to:t.next.path}},[t._v(t._s(t.next.title||t.next.path))]):t._e(),t._v("\n      →\n    ")],1):t._e()])]):t._e()}),[],!1,null,null,null).exports},props:["sidebarItems"]}),T=(s(145),Object(o.a)(P,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("main",{staticClass:"page"},[t._t("top"),t._v(" "),s("Content",{staticClass:"theme-default-content"}),t._v(" "),s("PageEdit"),t._v(" "),s("PageNav",t._b({},"PageNav",{sidebarItems:t.sidebarItems},!1)),t._v(" "),t._t("bottom")],2)}),[],!1,null,null,null).exports),A={name:"Sidebar",components:{SidebarLinks:s(87).default,NavLinks:b},props:["items"]},V=(s(148),Object(o.a)(A,(function(){var t=this.$createElement,e=this._self._c||t;return e("aside",{staticClass:"sidebar"},[e("NavLinks"),this._v(" "),this._t("top"),this._v(" "),e("SidebarLinks",{attrs:{depth:0,items:this.items}}),this._v(" "),this._t("bottom")],2)}),[],!1,null,null,null).exports),D=s(17),M={name:"VersionChooser",components:{NavLink:l},props:{sidebar:{type:Boolean,default:!1}},mixins:[D.a]},U=(s(149),{components:{Home:u,Page:T,Sidebar:V,Navbar:k,VersionChooser:Object(o.a)(M,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.versioned?s("div",{attrs:{id:"docVersionChooser"}},[t.sidebar?s("nav",{staticClass:"nav-links"},[s("div",{staticClass:"nav-item"},[s("div",{staticClass:"dropdown-wrapper open"},[t._m(0),t._v(" "),s("ul",{staticClass:"nav-dropdown"},[t.otherVersions.length?t._l(t.otherVersions,(function(t,e){return s("li",{key:e,staticClass:"dropdown-item"},[s("NavLink",{attrs:{item:{link:t.regularPath,text:t.title}}})],1)})):s("li",{staticClass:"dropdown-item"},[s("em",[t._v("Not available")])])],2)])])]):s("div",{staticClass:"dropdown-wrapper"},[s("button",{staticClass:"dropdown-title",attrs:{type:"button","aria-label":"Version"}},[s("span",{staticClass:"title"},[t._v("Version: "+t._s(t.version.title))]),t._v(" "),s("span",{staticClass:"arrow right"})]),t._v(" "),s("ul",{staticClass:"nav-dropdown",staticStyle:{display:"none"}},[s("li",{staticClass:"dropdown-item"},[s("h4",[t._v("Applicable API Versions")]),t._v(" "),s("ul",{staticClass:"dropdown-subitem-wrapper"},[t.unreleased?s("li",{staticClass:"dropdown-subitem"},[s("em",[t._v("Unreleased")])]):t._l(t.version.apiVersions,(function(e){return s("li",{key:e,staticClass:"dropdown-subitem"},[s("span",[t._v(t._s(e))])])}))],2)]),t._v(" "),s("li",{staticClass:"dropdown-item"},[s("h4",[t._v("Other Page Versions")]),t._v(" "),s("ul",{staticClass:"dropdown-subitem-wrapper"},[t.otherVersions.length?t._l(t.otherVersions,(function(t,e){return s("li",{key:e,staticClass:"dropdown-subitem"},[s("NavLink",{attrs:{item:{link:t.regularPath,text:t.title}}})],1)})):s("li",{staticClass:"dropdown-subitem"},[s("em",[t._v("Not available")])])],2)])])])]):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("button",{staticClass:"dropdown-title",attrs:{type:"button","aria-label":"Other Versions"}},[e("span",{staticClass:"title"},[this._v("Other Page Versions")])])}],!1,null,null,null).exports},mixins:[D.a],data:()=>({isSidebarOpen:!1}),computed:{shouldShowFullpage(){return this.$page.frontmatter.iframe||this.$page.frontmatter.fullpage},shouldShowNavbar(){const{themeConfig:t}=this.$site,{frontmatter:e}=this.$page;return!1!==e.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav)},shouldShowSidebar(){const{frontmatter:t}=this.$page;return!t.home&&!this.shouldShowFullpage&&!t.news&&!1!==t.sidebar&&this.sidebarItems.length},sidebarItems(){return Object(a.k)(this.$page,this.$page.regularPath,this.$site,this.$localePath)},pageClasses(){const t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar,"sidebar-open":this.isSidebarOpen,"no-sidebar":!this.shouldShowSidebar},t]}},mounted(){this.$router.afterEach(()=>{this.isSidebarOpen=!1})},filters:{date:t=>i()(t).format("MMMM D, YYYY")},methods:{toggleSidebar(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen,this.$emit("toggle-sidebar",this.isSidebarOpen)},onTouchStart(t){this.touchStart={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}},onTouchEnd(t){const e=t.changedTouches[0].clientX-this.touchStart.x,s=t.changedTouches[0].clientY-this.touchStart.y;Math.abs(e)>Math.abs(s)&&Math.abs(e)>40&&(e>0&&this.touchStart.x<=80?this.toggleSidebar(!0):this.toggleSidebar(!1))}}}),W=(s(150),Object(o.a)(U,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"theme-container",class:t.pageClasses,on:{touchstart:t.onTouchStart,touchend:t.onTouchEnd}},[t.shouldShowNavbar?s("Navbar",{on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),s("div",{staticClass:"sidebar-mask",on:{click:function(e){return t.toggleSidebar(!1)}}}),t._v(" "),s("Sidebar",{attrs:{items:t.sidebarItems},on:{"toggle-sidebar":t.toggleSidebar},scopedSlots:t._u([{key:"top",fn:function(){return[s("VersionChooser",{attrs:{sidebar:!0}}),t._v(" "),t._t("sidebar-top")]},proxy:!0}],null,!0)},[t._v(" "),t._t("sidebar-bottom")],2),t._v(" "),s("VersionChooser"),t._v(" "),t.$page.frontmatter.home?s("Home",{attrs:{defaultVersion:t.defaultVersion}}):t.$page.frontmatter.news?s("main",{staticClass:"page"},[s("div",{staticClass:"theme-default-content news"},[s("h1",[t._v(t._s(t.$page.frontmatter.title))]),t._v(" "),s("small",{staticClass:"news-meta"},[t._v("Written\n        "),t.$page.frontmatter.date?[t._v("on "),s("em",[t._v(t._s(t._f("date")(t.$page.frontmatter.date)))])]:t._e(),t._v(" "),t.$page.frontmatter.author?[t._v("by "),s("em",[t._v(t._s(t.$page.frontmatter.author))])]:t._e(),t._v(".\n      ")],2),t._v(" "),s("Content")],1)]):t.shouldShowFullpage?s("main",{staticClass:"fullpage",class:{page:!t.$page.frontmatter.stripCSS}},[t.$page.frontmatter.iframe?s("InlineFrame",{key:t.$page.key,attrs:{url:t.$page.frontmatter.iframe,version:t.version}}):s("Content",{staticClass:"fullpage-content"})],1):t.$page.frontmatter.custom?s("main",{staticClass:"page"},[s("Content",{staticClass:"theme-default-content custom"})],1):s("Page",{attrs:{"sidebar-items":t.sidebarItems}},[t._t("page-top"),t._v(" "),t._t("page-bottom")],2)],1)}),[],!1,null,null,null));e.default=W.exports},30:function(t,e,s){},36:function(t,e,s){},37:function(t,e,s){},38:function(t,e,s){},39:function(t,e,s){},40:function(t,e,s){},41:function(t,e,s){},42:function(t,e,s){},43:function(t,e,s){},44:function(t,e,s){},45:function(t,e,s){},46:function(t,e,s){},47:function(t,e,s){},48:function(t,e,s){},87:function(t,e,s){"use strict";s.r(e);var n=s(18),i={name:"SidebarGroup",props:["item","open","collapsable","depth"],components:{DropdownTransition:s(88).a},beforeCreate(){this.$options.components.SidebarLinks=s(87).default},methods:{isActive:n.e}},a=(s(146),s(0)),r=Object(a.a)(i,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"sidebar-group",class:[{collapsable:t.collapsable,"is-sub-group":0!==t.depth},"depth-"+t.depth]},[t.item.path?s("router-link",{staticClass:"sidebar-heading clickable",class:{open:t.open,active:t.isActive(t.$route,t.item.path)},attrs:{to:t.item.path},nativeOn:{click:function(e){return t.$emit("toggle")}}},[s("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?s("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]):s("p",{staticClass:"sidebar-heading",class:{open:t.open},on:{click:function(e){return t.$emit("toggle")}}},[s("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?s("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]),t._v(" "),s("DropdownTransition",[t.open||!t.collapsable?s("SidebarLinks",{staticClass:"sidebar-group-items",attrs:{items:t.item.children,sidebarDepth:t.item.sidebarDepth,depth:t.depth+1}}):t._e()],1)],1)}),[],!1,null,null,null).exports;function o(t,e,s,n){return t("router-link",{props:{to:e,activeClass:"",exactActiveClass:""},class:{active:n,"sidebar-link":!0}},s)}function l(t,e,s,i,a,r=1){return!e||r>a?null:t("ul",{class:"sidebar-sub-headers"},e.map(e=>{const c=Object(n.e)(i,s+"#"+e.slug);return t("li",{class:"sidebar-sub-header"},[o(t,s+"#"+e.slug,e.title,c),l(t,e.children,s,i,a,r+1)])}))}var c={functional:!0,props:["item","sidebarDepth"],render(t,{parent:{$page:e,$site:s,$route:i,$themeConfig:a,$themeLocaleConfig:r},props:{item:c,sidebarDepth:u}}){const h=Object(n.e)(i,c.path),p="auto"===c.type?h||c.children.some(t=>Object(n.e)(i,c.basePath+"#"+t.slug)):h,d="external"===c.type?function(t,e,s){return t("a",{attrs:{href:e,target:"_blank",rel:"noopener noreferrer"},class:{"sidebar-link":!0}},[s,t("OutboundLink")])}(t,c.path,c.title||c.path):o(t,c.path,c.title||c.path,p),f=[e.frontmatter.sidebarDepth,u,r.sidebarDepth,a.sidebarDepth,1].find(t=>void 0!==t),m=r.displayAllHeaders||a.displayAllHeaders;if("auto"===c.type)return[d,l(t,c.children,c.basePath,i,f)];if((p||m)&&c.headers&&!n.d.test(c.path)){return[d,l(t,Object(n.c)(c.headers),c.path,i,f)]}return d}};s(147);function u(t,e){return"group"===e.type&&e.children.some(e=>"group"===e.type?u(t,e):"page"===e.type&&Object(n.e)(t,e.path))}var h={name:"SidebarLinks",components:{SidebarGroup:r,SidebarLink:Object(a.a)(c,void 0,void 0,!1,null,null,null).exports},props:["items","depth","sidebarDepth"],data:()=>({openGroupIndex:0}),created(){this.refreshIndex()},watch:{$route(){this.refreshIndex()}},methods:{refreshIndex(){const t=function(t,e){for(let s=0;s<e.length;s++){const n=e[s];if(u(t,n))return s}return-1}(this.$route,this.items);t>-1&&(this.openGroupIndex=t)},toggleGroup(t){this.openGroupIndex=t===this.openGroupIndex?-1:t},isActive(t){return Object(n.e)(this.$route,t.regularPath)}}},p=Object(a.a)(h,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.items.length?s("ul",{staticClass:"sidebar-links"},t._l(t.items,(function(e,n){return s("li",{key:n},["group"===e.type?s("SidebarGroup",{attrs:{item:e,open:n===t.openGroupIndex,collapsable:e.collapsable||e.collapsible,depth:t.depth},on:{toggle:function(e){return t.toggleGroup(n)}}}):s("SidebarLink",{attrs:{sidebarDepth:t.sidebarDepth,item:e}})],1)})),0):t._e()}),[],!1,null,null,null);e.default=p.exports},88:function(t,e,s){"use strict";var n={name:"DropdownTransition",methods:{setHeight(t){t.style.height=t.scrollHeight+"px"},unsetHeight(t){t.style.height=""}}},i=(s(137),s(0)),a=Object(i.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("transition",{attrs:{name:"dropdown"},on:{enter:this.setHeight,"after-enter":this.unsetHeight,"before-leave":this.setHeight}},[this._t("default")],2)}),[],!1,null,null,null);e.a=a.exports},93:function(t,e,s){"use strict";var n=s(30);s.n(n).a}}]);