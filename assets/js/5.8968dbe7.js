(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{17:function(e,t,n){"use strict";var s={computed:{unreleased(){return null!==this.version.apiTag.match(/(draft|alpha|beta)/i)},versioned(){return null!==this.$page.regularPath.match(/\/documentation\/([^\/]+)\//)},otherVersions(){return this.$site.themeConfig.versions.map((e,t)=>{var n=this.$site.themeConfig.versions[this.versionIndex],s=this.$site.themeConfig.versions[t];return e.regularPath=this.$page.regularPath.replace(n.path,s.path),e}).filter((e,t)=>t!==this.versionIndex&&this.$site.pages.findIndex(t=>t.regularPath==e.regularPath)>=0)},version(){return this.$site.themeConfig.versions[this.versionIndex]},defaultVersion(){return this.$site.themeConfig.versions[this.$site.themeConfig.defaultVersion]},versionIndex(){const{themeConfig:e}=this.$site;var t=this.$page.regularPath.match(/\/documentation\/([^\/]+)\//);if(Array.isArray(t)&&"string"==typeof t[1])for(var n in e.versions)if(e.versions[n].folder===t[1])return parseInt(n);return 0}}},r=n(0),i=Object(r.a)(s,void 0,void 0,!1,null,null,null);t.a=i.exports},172:function(e,t,n){"use strict";var s=n(62);n.n(s).a},182:function(e,t,n){"use strict";n.r(t);var s=n(174),r={name:"ProcessesSpec",mixins:[n(17).a],components:{DocGen:s.a},computed:{documentUrl(){return"/assets/documentation/"+this.version.folder+"/processes.json"}}},i=(n(172),n(0)),o=Object(i.a)(r,(function(){var e=this.$createElement;return(this._self._c||e)("DocGen",{attrs:{document:this.documentUrl,apiVersion:this.version.apiTag}})}),[],!1,null,null,null);t.default=o.exports},62:function(e,t,n){}}]);