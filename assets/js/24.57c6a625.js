(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{158:function(e,s,t){"use strict";var i={computed:{unreleased(){return null!==this.version.apiTag.match(/(draft|alpha|beta)/i)},versioned(){return null!==this.$page.regularPath.match(/\/documentation\/([^\/]+)\//)},otherVersions(){return this.$site.themeConfig.versions.map((e,s)=>{var t=this.$site.themeConfig.versions[this.versionIndex],i=this.$site.themeConfig.versions[s];return e.regularPath=this.$page.regularPath.replace(t.path,i.path),e}).filter((e,s)=>s!==this.versionIndex&&this.$site.pages.findIndex(s=>s.regularPath==e.regularPath)>=0)},version(){return this.$site.themeConfig.versions[this.versionIndex]},defaultVersion(){return this.$site.themeConfig.versions[this.$site.themeConfig.defaultVersion]},versionIndex(){const{themeConfig:e}=this.$site;var s=this.$page.regularPath.match(/\/documentation\/([^\/]+)\//);if(Array.isArray(s)&&"string"==typeof s[1])for(var t in e.versions)if(e.versions[t].folder===s[1])return parseInt(t);return 0}}},n=t(4),r=Object(n.a)(i,void 0,void 0,!1,null,null,null);s.a=r.exports},425:function(e,s,t){"use strict";t.r(s);var i={name:"ProcessesSpec",mixins:[t(158).a],components:{DocGen:()=>Promise.all([t.e(0),t.e(5)]).then(t.bind(null,418))},data:()=>({notice:"**Note:** This is the list of all processes specified by the openEO project. Back-ends implement a varying set of processes. Thus, the processes you can use at a specific back-end may derive from the specification, may include non-standardized processes and may not implement all processes listed here. Please check each back-end individually for the processes they support. The client libraries usually have a function called `listProcesses` or `list_processes` for that."}),computed:{documentUrl(){return"/documentation/"+this.version.folder+"/processes.json"}}},n=t(4),r=Object(n.a)(i,(function(){var e=this.$createElement;return(this._self._c||e)("DocGen",{attrs:{document:this.documentUrl,apiVersion:this.version.apiTag,notice:this.notice}})}),[],!1,null,null,null);s.default=r.exports}}]);