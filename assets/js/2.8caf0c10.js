(window.webpackJsonp=window.webpackJsonp||[]).push([[2,50],{163:function(t,e,n){},164:function(t,e,n){"use strict";n.r(e);var s={computed:{unreleased(){return null!==this.version.apiTag.match(/(draft|alpha|beta)/i)},versioned(){return null!==this.$page.regularPath.match(/\/documentation\/([^\/]+)\//)},otherVersions(){return this.$site.themeConfig.versions.map((t,e)=>{var n=this.$site.themeConfig.versions[this.versionIndex],s=this.$site.themeConfig.versions[e];return t.regularPath=this.$page.regularPath.replace(n.path,s.path),t}).filter((t,e)=>e!==this.versionIndex&&this.$site.pages.findIndex(e=>e.regularPath==t.regularPath)>=0)},version(){return this.$site.themeConfig.versions[this.versionIndex]},defaultVersion(){return this.$site.themeConfig.versions[this.$site.themeConfig.defaultVersion]},versionIndex(){const{themeConfig:t}=this.$site;var e=this.$page.regularPath.match(/\/documentation\/([^\/]+)\//);if(Array.isArray(e)&&"string"==typeof e[1])for(var n in t.versions)if(t.versions[n].folder===e[1])return parseInt(n);return 0}}},r=n(4),a=Object(r.a)(s,void 0,void 0,!1,null,null,null);e.default=a.exports},166:function(t,e){t.exports=function(t){return null==t}},168:function(t,e,n){},169:function(t,e,n){},170:function(t,e,n){},172:function(t,e,n){"use strict";n(163)},173:function(t,e,n){"use strict";n.r(e);var s=n(197),r=n(178),a=n(155);function i(t,e){return"group"===e.type&&e.children.some(e=>"group"===e.type?i(t,e):"page"===e.type&&Object(a.e)(t,e.path))}var o={name:"SidebarLinks",components:{SidebarGroup:s.default,SidebarLink:r.default},props:["items","depth","sidebarDepth"],data:()=>({openGroupIndex:0}),watch:{$route(){this.refreshIndex()}},created(){this.refreshIndex()},methods:{refreshIndex(){const t=function(t,e){for(let n=0;n<e.length;n++){const s=e[n];if(i(t,s))return n}return-1}(this.$route,this.items);t>-1&&(this.openGroupIndex=t)},toggleGroup(t){this.openGroupIndex=t===this.openGroupIndex?-1:t},isActive(t){return Object(a.e)(this.$route,t.regularPath)}}},u=n(4),l=Object(u.a)(o,(function(){var t=this,e=t._self._c;return t.items.length?e("ul",{staticClass:"sidebar-links"},t._l(t.items,(function(n,s){return e("li",{key:s},["group"===n.type?e("SidebarGroup",{attrs:{item:n,open:s===t.openGroupIndex,collapsable:n.collapsable||n.collapsible,depth:t.depth},on:{toggle:function(e){return t.toggleGroup(s)}}}):e("SidebarLink",{attrs:{"sidebar-depth":t.sidebarDepth,item:n}})],1)})),0):t._e()}),[],!1,null,null,null);e.default=l.exports},178:function(t,e,n){"use strict";n.r(e);var s=n(155);function r(t,e,n,s,r){const a={props:{to:e,activeClass:"",exactActiveClass:""},class:{active:s,"sidebar-link":!0}};return r>2&&(a.style={"padding-left":r+"rem"}),t("RouterLink",a,n)}function a(t,e,n,i,o,u=1){return!e||u>o?null:t("ul",{class:"sidebar-sub-headers"},e.map(e=>{const l=Object(s.e)(i,n+"#"+e.slug);return t("li",{class:"sidebar-sub-header"},[r(t,n+"#"+e.slug,e.title,l,e.level-1),a(t,e.children,n,i,o,u+1)])}))}var i={functional:!0,props:["item","sidebarDepth"],render(t,{parent:{$page:e,$site:n,$route:i,$themeConfig:o,$themeLocaleConfig:u},props:{item:l,sidebarDepth:c}}){const d=Object(s.e)(i,l.path),h="auto"===l.type?d||l.children.some(t=>Object(s.e)(i,l.basePath+"#"+t.slug)):d,p="external"===l.type?function(t,e,n){return t("a",{attrs:{href:e,target:"_blank",rel:"noopener noreferrer"},class:{"sidebar-link":!0}},[n,t("OutboundLink")])}(t,l.path,l.title||l.path):r(t,l.path,l.title||l.path,h),f=[e.frontmatter.sidebarDepth,c,u.sidebarDepth,o.sidebarDepth,1].find(t=>void 0!==t),v=u.displayAllHeaders||o.displayAllHeaders;if("auto"===l.type)return[p,a(t,l.children,l.basePath,i,f)];if((h||v)&&l.headers&&!s.d.test(l.path)){return[p,a(t,Object(s.c)(l.headers),l.path,i,f)]}return p}},o=(n(172),n(4)),u=Object(o.a)(i,void 0,void 0,!1,null,null,null);e.default=u.exports},180:function(t,e,n){},183:function(t,e,n){"use strict";n(168)},184:function(t,e,n){var s=n(6),r=n(1),a=n(5);t.exports=function(t){return"string"==typeof t||!r(t)&&a(t)&&"[object String]"==s(t)}},185:function(t,e,n){"use strict";n(169)},186:function(t,e,n){},187:function(t,e,n){"use strict";n(170)},188:function(t,e,n){},189:function(t,e,n){},197:function(t,e,n){"use strict";n.r(e);var s=n(155),r={name:"SidebarGroup",components:{DropdownTransition:n(160).default},props:["item","open","collapsable","depth"],beforeCreate(){this.$options.components.SidebarLinks=n(173).default},methods:{isActive:s.e}},a=(n(187),n(4)),i=Object(a.a)(r,(function(){var t=this,e=t._self._c;return e("section",{staticClass:"sidebar-group",class:[{collapsable:t.collapsable,"is-sub-group":0!==t.depth},"depth-"+t.depth]},[t.item.path?e("RouterLink",{staticClass:"sidebar-heading clickable",class:{open:t.open,active:t.isActive(t.$route,t.item.path)},attrs:{to:t.item.path},nativeOn:{click:function(e){return t.$emit("toggle")}}},[e("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?e("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]):e("p",{staticClass:"sidebar-heading",class:{open:t.open},on:{click:function(e){return t.$emit("toggle")}}},[e("span",[t._v(t._s(t.item.title))]),t._v(" "),t.collapsable?e("span",{staticClass:"arrow",class:t.open?"down":"right"}):t._e()]),t._v(" "),e("DropdownTransition",[t.open||!t.collapsable?e("SidebarLinks",{staticClass:"sidebar-group-items",attrs:{items:t.item.children,"sidebar-depth":t.item.sidebarDepth,depth:t.depth+1}}):t._e()],1)],1)}),[],!1,null,null,null);e.default=i.exports},201:function(t,e,n){"use strict";n.r(e);var s=n(166),r=n.n(s),a=n(155),i={name:"PageEdit",computed:{lastUpdated(){return this.$page.lastUpdated},lastUpdatedText(){return"string"==typeof this.$themeLocaleConfig.lastUpdated?this.$themeLocaleConfig.lastUpdated:"string"==typeof this.$site.themeConfig.lastUpdated?this.$site.themeConfig.lastUpdated:"Last Updated"},editLink(){const t=r()(this.$page.frontmatter.editLink)?this.$site.themeConfig.editLinks:this.$page.frontmatter.editLink,{repo:e,docsDir:n="",docsBranch:s="master",docsRepo:a=e}=this.$site.themeConfig;return t&&a&&this.$page.relativePath?this.createEditLink(e,a,n,s,this.$page.relativePath):null},editLinkText(){return this.$themeLocaleConfig.editLinkText||this.$site.themeConfig.editLinkText||"Edit this page"}},methods:{createEditLink(t,e,n,s,r){if(/bitbucket.org/.test(t)){return(a.i.test(e)?e:t).replace(a.a,"")+"/src"+`/${s}/`+(n?n.replace(a.a,"")+"/":"")+r+`?mode=edit&spa=0&at=${s}&fileviewer=file-view-default`}return(a.i.test(e)?e:"https://github.com/"+e).replace(a.a,"")+"/edit"+`/${s}/`+(n?n.replace(a.a,"")+"/":"")+r}}},o=(n(183),n(4)),u=Object(o.a)(i,(function(){var t=this,e=t._self._c;return e("footer",{staticClass:"page-edit"},[t.editLink?e("div",{staticClass:"edit-link"},[e("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),e("OutboundLink")],1):t._e(),t._v(" "),t.lastUpdated?e("div",{staticClass:"last-updated"},[e("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+":")]),t._v(" "),e("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e()])}),[],!1,null,null,null);e.default=u.exports},202:function(t,e,n){"use strict";n.r(e);var s=n(155),r=n(184),a=n.n(r),i=n(166),o=n.n(i),u={name:"PageNav",props:["sidebarItems"],computed:{prev(){return c(l.PREV,this)},next(){return c(l.NEXT,this)}}};const l={NEXT:{resolveLink:function(t,e){return d(t,e,1)},getThemeLinkConfig:({nextLinks:t})=>t,getPageLinkConfig:({frontmatter:t})=>t.next},PREV:{resolveLink:function(t,e){return d(t,e,-1)},getThemeLinkConfig:({prevLinks:t})=>t,getPageLinkConfig:({frontmatter:t})=>t.prev}};function c(t,{$themeConfig:e,$page:n,$route:r,$site:i,sidebarItems:u}){const{resolveLink:l,getThemeLinkConfig:c,getPageLinkConfig:d}=t,h=c(e),p=d(n),f=o()(p)?h:p;return!1===f?void 0:a()(f)?Object(s.j)(i.pages,f,r.path):l(n,u)}function d(t,e,n){const s=[];!function t(e,n){for(let s=0,r=e.length;s<r;s++)"group"===e[s].type?t(e[s].children||[],n):n.push(e[s])}(e,s);for(let e=0;e<s.length;e++){const r=s[e];if("page"===r.type&&r.path===decodeURIComponent(t.path))return s[e+n]}}var h=u,p=(n(185),n(4)),f=Object(p.a)(h,(function(){var t=this,e=t._self._c;return t.prev||t.next?e("div",{staticClass:"page-nav"},[e("p",{staticClass:"inner"},[t.prev?e("span",{staticClass:"prev"},[t._v("\n      ←\n      "),"external"===t.prev.type?e("a",{staticClass:"prev",attrs:{href:t.prev.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.prev.title||t.prev.path)+"\n\n        "),e("OutboundLink")],1):e("RouterLink",{staticClass:"prev",attrs:{to:t.prev.path}},[t._v("\n        "+t._s(t.prev.title||t.prev.path)+"\n      ")])],1):t._e(),t._v(" "),t.next?e("span",{staticClass:"next"},["external"===t.next.type?e("a",{attrs:{href:t.next.path,target:"_blank",rel:"noopener noreferrer"}},[t._v("\n        "+t._s(t.next.title||t.next.path)+"\n\n        "),e("OutboundLink")],1):e("RouterLink",{attrs:{to:t.next.path}},[t._v("\n        "+t._s(t.next.title||t.next.path)+"\n      ")]),t._v("\n      →\n    ")],1):t._e()])]):t._e()}),[],!1,null,null,null);e.default=f.exports},204:function(t,e,n){"use strict";n(180)},206:function(t,e,n){"use strict";n(186)},207:function(t,e,n){"use strict";n(188)},208:function(t,e,n){"use strict";n(189)},209:function(t,e,n){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",r="minute",a="hour",i="day",o="week",u="month",l="quarter",c="year",d="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),r=n%60;return(e<=0?"+":"-")+m(s,2,"0")+":"+m(r,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),r=e.clone().add(s,u),a=n-r<0,i=e.clone().add(s+(a?-1:1),u);return+(-(s+(n-r)/(a?r-i:i-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:c,w:o,d:i,D:d,h:a,m:r,s:s,ms:n,Q:l}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},b="en",_={};_[b]=v;var $="$isDayjsObject",C=function(t){return t instanceof w||!(!t||!t[$])},k=function t(e,n,s){var r;if(!e)return b;if("string"==typeof e){var a=e.toLowerCase();_[a]&&(r=a),n&&(_[a]=n,r=a);var i=e.split("-");if(!r&&i.length>1)return t(i[0])}else{var o=e.name;_[o]=e,r=o}return!s&&r&&(b=r),r||!s&&b},y=function(t,e){if(C(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new w(n)},S=g;S.l=k,S.i=C,S.w=function(t,e){return y(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var w=function(){function v(t){this.$L=k(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[$]=!0}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(S.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(p);if(s){var r=s[2]-1||0,a=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],r,s[3]||1,s[4]||0,s[5]||0,s[6]||0,a)):new Date(s[1],r,s[3]||1,s[4]||0,s[5]||0,s[6]||0,a)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return S},m.isValid=function(){return!(this.$d.toString()===h)},m.isSame=function(t,e){var n=y(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return y(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<y(t)},m.$g=function(t,e,n){return S.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,l=!!S.u(e)||e,h=S.p(t),p=function(t,e){var s=S.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return l?s:s.endOf(i)},f=function(t,e){return S.w(n.toDate()[t].apply(n.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,g=this.$D,b="set"+(this.$u?"UTC":"");switch(h){case c:return l?p(1,0):p(31,11);case u:return l?p(1,m):p(0,m+1);case o:var _=this.$locale().weekStart||0,$=(v<_?v+7:v)-_;return p(l?g-$:g+(6-$),m);case i:case d:return f(b+"Hours",0);case a:return f(b+"Minutes",1);case r:return f(b+"Seconds",2);case s:return f(b+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,l=S.p(t),h="set"+(this.$u?"UTC":""),p=(o={},o[i]=h+"Date",o[d]=h+"Date",o[u]=h+"Month",o[c]=h+"FullYear",o[a]=h+"Hours",o[r]=h+"Minutes",o[s]=h+"Seconds",o[n]=h+"Milliseconds",o)[l],f=l===i?this.$D+(e-this.$W):e;if(l===u||l===c){var v=this.clone().set(d,1);v.$d[p](f),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](f);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[S.p(t)]()},m.add=function(n,l){var d,h=this;n=Number(n);var p=S.p(l),f=function(t){var e=y(h);return S.w(e.date(e.date()+Math.round(t*n)),h)};if(p===u)return this.set(u,this.$M+n);if(p===c)return this.set(c,this.$y+n);if(p===i)return f(1);if(p===o)return f(7);var v=(d={},d[r]=t,d[a]=e,d[s]=1e3,d)[p]||1,m=this.$d.getTime()+n*v;return S.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var s=t||"YYYY-MM-DDTHH:mm:ssZ",r=S.z(this),a=this.$H,i=this.$m,o=this.$M,u=n.weekdays,l=n.months,c=n.meridiem,d=function(t,n,r,a){return t&&(t[n]||t(e,s))||r[n].slice(0,a)},p=function(t){return S.s(a%12||12,t,"0")},v=c||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(f,(function(t,s){return s||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return S.s(e.$y,4,"0");case"M":return o+1;case"MM":return S.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,l,3);case"MMMM":return d(l,o);case"D":return e.$D;case"DD":return S.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return d(n.weekdaysMin,e.$W,u,2);case"ddd":return d(n.weekdaysShort,e.$W,u,3);case"dddd":return u[e.$W];case"H":return String(a);case"HH":return S.s(a,2,"0");case"h":return p(1);case"hh":return p(2);case"a":return v(a,i,!0);case"A":return v(a,i,!1);case"m":return String(i);case"mm":return S.s(i,2,"0");case"s":return String(e.$s);case"ss":return S.s(e.$s,2,"0");case"SSS":return S.s(e.$ms,3,"0");case"Z":return r}return null}(t)||r.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,h){var p,f=this,v=S.p(d),m=y(n),g=(m.utcOffset()-this.utcOffset())*t,b=this-m,_=function(){return S.m(f,m)};switch(v){case c:p=_()/12;break;case u:p=_();break;case l:p=_()/3;break;case o:p=(b-g)/6048e5;break;case i:p=(b-g)/864e5;break;case a:p=b/e;break;case r:p=b/t;break;case s:p=b/1e3;break;default:p=b}return h?p:S.a(p)},m.daysInMonth=function(){return this.endOf(u).$D},m.$locale=function(){return _[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=k(t,e,!0);return s&&(n.$L=s),n},m.clone=function(){return S.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),x=w.prototype;return y.prototype=x,[["$ms",n],["$s",s],["$m",r],["$H",a],["$W",i],["$M",u],["$y",c],["$D",d]].forEach((function(t){x[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),y.extend=function(t,e){return t.$i||(t(e,w,y),t.$i=!0),y},y.locale=k,y.isDayjs=C,y.unix=function(t){return y(1e3*t)},y.en=_[b],y.Ls=_,y.p={},y}()},223:function(t,e,n){},273:function(t,e,n){"use strict";n.r(e);var s={name:"Home",components:{NavLink:n(158).default},props:["blog","defaultVersion"],computed:{data(){return this.$page.frontmatter}}},r=(n(204),n(4)),a=Object(r.a)(s,(function(){var t=this,e=t._self._c;return e("main",{staticClass:"home",attrs:{"aria-labelledby":"main-title"}},[e("header",{staticClass:"hero"},[e("img",{attrs:{src:"/images/openeo_logo.png",alt:"openEO"}}),t._v(" "),e("p",{staticClass:"description"},[t._v("\n      openEO develops an open API to connect R, Python, JavaScript and other clients to big Earth observation cloud back-ends in a simple and unified way.\n    ")]),t._v(" "),e("p",{staticClass:"action"},[e("NavLink",{staticClass:"action-button",attrs:{item:{link:"/about/",text:"Why?"}}}),t._v(" "),e("NavLink",{staticClass:"action-button",attrs:{item:{link:this.$site.themeConfig.docPath,text:"Get Started!"}}})],1)]),t._v(" "),e("div",{staticClass:"features"},[e("div",{staticClass:"feature"},[e("h2",[t._v("Latest News")]),t._v(" "),e("News",{attrs:{limit:3}})],1),t._v(" "),e("div",{staticClass:"feature"},[e("h2",[t._v("Other Channels")]),t._v(" "),e("Channels")],1)]),t._v(" "),e("Content",{staticClass:"theme-default-content custom"})],1)}),[],!1,null,null,null);e.default=a.exports},274:function(t,e,n){"use strict";n.r(e);var s=n(201),r=n(202),a={components:{PageEdit:s.default,PageNav:r.default},props:["sidebarItems"]},i=(n(206),n(4)),o=Object(i.a)(a,(function(){var t=this._self._c;return t("main",{staticClass:"page"},[this._t("top"),this._v(" "),t("Content",{staticClass:"theme-default-content"}),this._v(" "),t("PageEdit"),this._v(" "),t("PageNav",this._b({},"PageNav",{sidebarItems:this.sidebarItems},!1)),this._v(" "),this._t("bottom")],2)}),[],!1,null,null,null);e.default=o.exports},275:function(t,e,n){"use strict";n.r(e);var s=n(173),r=n(196),a={name:"Sidebar",components:{SidebarLinks:s.default,NavLinks:r.default},props:["items"]},i=(n(207),n(4)),o=Object(i.a)(a,(function(){var t=this._self._c;return t("aside",{staticClass:"sidebar"},[t("NavLinks"),this._v(" "),this._t("top"),this._v(" "),t("SidebarLinks",{attrs:{depth:0,items:this.items}}),this._v(" "),this._t("bottom")],2)}),[],!1,null,null,null);e.default=o.exports},276:function(t,e,n){"use strict";n.r(e);var s=n(158),r=n(164),a={name:"VersionChooser",components:{NavLink:s.default},props:{sidebar:{type:Boolean,default:!1}},mixins:[r.default]},i=(n(208),n(4)),o=Object(i.a)(a,(function(){var t=this,e=t._self._c;return t.versioned?e("div",{attrs:{id:"docVersionChooser"}},[t.sidebar?e("nav",{staticClass:"nav-links"},[e("div",{staticClass:"nav-item"},[e("div",{staticClass:"dropdown-wrapper open"},[t._m(0),t._v(" "),e("ul",{staticClass:"nav-dropdown"},[t.otherVersions.length?t._l(t.otherVersions,(function(t,n){return e("li",{key:n,staticClass:"dropdown-item"},[e("NavLink",{attrs:{item:{link:t.regularPath,text:t.title}}})],1)})):e("li",{staticClass:"dropdown-item"},[e("em",[t._v("Not available")])])],2)])])]):e("div",{staticClass:"dropdown-wrapper"},[e("button",{staticClass:"dropdown-title",attrs:{type:"button","aria-label":"Version"}},[e("span",{staticClass:"title"},[t._v("Version: "+t._s(t.version.title))]),t._v(" "),e("span",{staticClass:"arrow right"})]),t._v(" "),e("ul",{staticClass:"nav-dropdown",staticStyle:{display:"none"}},[e("li",{staticClass:"dropdown-item"},[e("h4",[t._v("Applicable API Versions")]),t._v(" "),e("ul",{staticClass:"dropdown-subitem-wrapper"},[t.unreleased?e("li",{staticClass:"dropdown-subitem"},[e("em",[t._v("Unreleased")])]):t._l(t.version.apiVersions,(function(n){return e("li",{key:n,staticClass:"dropdown-subitem"},[e("span",[t._v(t._s(n))])])}))],2)]),t._v(" "),e("li",{staticClass:"dropdown-item"},[e("h4",[t._v("Other Page Versions")]),t._v(" "),e("ul",{staticClass:"dropdown-subitem-wrapper"},[t.otherVersions.length?t._l(t.otherVersions,(function(t,n){return e("li",{key:n,staticClass:"dropdown-subitem"},[e("NavLink",{attrs:{item:{link:t.regularPath,text:t.title}}})],1)})):e("li",{staticClass:"dropdown-subitem"},[e("em",[t._v("Not available")])])],2)])])])]):t._e()}),[function(){var t=this._self._c;return t("button",{staticClass:"dropdown-title",attrs:{type:"button","aria-label":"Other Versions"}},[t("span",{staticClass:"title"},[this._v("Other Page Versions")])])}],!1,null,null,null);e.default=o.exports},282:function(t,e,n){"use strict";n(223)},434:function(t,e,n){"use strict";n.r(e);var s=n(209),r=n.n(s),a=n(273),i=n(422),o=n(274),u=n(275),l=n(164),c=n(276),d=n(155),h={name:"Layout",components:{Home:a.default,Page:o.default,Sidebar:u.default,Navbar:i.default,VersionChooser:c.default},mixins:[l.default],data:()=>({isSidebarOpen:!1}),computed:{shouldShowFullpage(){return this.$page.frontmatter.iframe||this.$page.frontmatter.fullpage},shouldShowNavbar(){const{themeConfig:t}=this.$site,{frontmatter:e}=this.$page;return!1!==e.navbar&&!1!==t.navbar&&(this.$title||t.logo||t.repo||t.nav)},shouldShowSidebar(){const{frontmatter:t}=this.$page;return!t.home&&!this.shouldShowFullpage&&!t.news&&!1!==t.sidebar&&this.sidebarItems.length},sidebarItems(){return Object(d.k)(this.$page,this.$page.regularPath,this.$site,this.$localePath)},pageClasses(){const t=this.$page.frontmatter.pageClass;return[{"no-navbar":!this.shouldShowNavbar,"sidebar-open":this.isSidebarOpen,"no-sidebar":!this.shouldShowSidebar},t]}},mounted(){this.$router.afterEach(()=>{this.isSidebarOpen=!1})},filters:{date:t=>r()(t).format("MMMM D, YYYY")},methods:{toggleSidebar(t){this.isSidebarOpen="boolean"==typeof t?t:!this.isSidebarOpen,this.$emit("toggle-sidebar",this.isSidebarOpen)},onTouchStart(t){this.touchStart={x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}},onTouchEnd(t){const e=t.changedTouches[0].clientX-this.touchStart.x,n=t.changedTouches[0].clientY-this.touchStart.y;Math.abs(e)>Math.abs(n)&&Math.abs(e)>40&&(e>0&&this.touchStart.x<=80?this.toggleSidebar(!0):this.toggleSidebar(!1))}}},p=(n(282),n(4)),f=Object(p.a)(h,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"theme-container",class:t.pageClasses,on:{touchstart:t.onTouchStart,touchend:t.onTouchEnd}},[t.shouldShowNavbar?e("Navbar",{on:{"toggle-sidebar":t.toggleSidebar}}):t._e(),t._v(" "),e("div",{staticClass:"sidebar-mask",on:{click:function(e){return t.toggleSidebar(!1)}}}),t._v(" "),e("Sidebar",{attrs:{items:t.sidebarItems},on:{"toggle-sidebar":t.toggleSidebar},scopedSlots:t._u([{key:"top",fn:function(){return[e("VersionChooser",{attrs:{sidebar:!0}}),t._v(" "),t._t("sidebar-top")]},proxy:!0},{key:"bottom",fn:function(){return[t._t("sidebar-bottom")]},proxy:!0}],null,!0)}),t._v(" "),e("VersionChooser"),t._v(" "),t.$page.frontmatter.home?e("Home",{attrs:{defaultVersion:t.defaultVersion}}):t.$page.frontmatter.news?e("main",{staticClass:"page"},[e("div",{staticClass:"theme-default-content news"},[e("h1",[t._v(t._s(t.$page.frontmatter.title))]),t._v(" "),e("small",{staticClass:"news-meta"},[t._v("Written\n        "),t.$page.frontmatter.date?[t._v("on "),e("em",[t._v(t._s(t._f("date")(t.$page.frontmatter.date)))])]:t._e(),t._v(" "),t.$page.frontmatter.author?[t._v("by "),e("em",[t._v(t._s(t.$page.frontmatter.author))])]:t._e(),t._v(".\n      ")],2),t._v(" "),e("Content")],1)]):t.shouldShowFullpage?e("main",{staticClass:"fullpage",class:{page:!t.$page.frontmatter.stripCSS}},[t.$page.frontmatter.iframe?e("InlineFrame",{key:t.$page.key,attrs:{url:t.$page.frontmatter.iframe,version:t.version}}):e("Content",{staticClass:"fullpage-content"})],1):t.$page.frontmatter.custom?e("main",{staticClass:"page"},[e("Content",{staticClass:"theme-default-content custom"})],1):e("Page",{attrs:{"sidebar-items":t.sidebarItems}},[t._t("page-top"),t._v(" "),t._t("page-bottom")],2)],1)}),[],!1,null,null,null);e.default=f.exports}}]);