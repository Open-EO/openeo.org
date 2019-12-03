<template>
	<div class="error-codes">
		<p>The whole table of error codes is available as <a :href="'/assets/documentation/' + version.folder + '/errors.json'" target="_blank">JSON file</a>, which can be used by implementors to automatically generate error responses.</p>
		<div v-for="tag in tags">
			<a :name="tag | slugify"></a>
			<h2>{{ tag }}</h2>
			<table>
				<tr>
					<th width="20%">openEO Error Code</th>
					<th width="40%">Description</th>
					<th width="35%">Example Message</th>
					<th width="5%">HTTP Status Code</th>
				</tr>
				<tr v-for="(error, name) in errors[tag]">
					<td>{{ name }}</td>
					<td>{{ error.description }}</td>
					<td>{{ error.message }}</td>
					<td>{{ error.http }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import VersioningMixin from '@theme/components/VersioningMixin.vue';

export default {
	name: 'ErrorCodes',
	mixins: [VersioningMixin],
	props: ['file'],
	data() {
		return {
			errors: {},
			tags: []
		};
	},
	filters: {
		slugify(title) {
			return title.toLowerCase().replace(' ', '_');
		}
	},
	created() {
		var errorData = require('../public/assets/documentation/' + this.version.folder + '/errors.json');
		// Group by tag in a dict
		for (var key in errorData) {
			var val = errorData[key];
			if (!val.description) {
				val.description = "";
			}
			if (!val.message) {
				console.log("No message specified for error: " + key);
			}
			if (!val.http) {
				console.log("No HTTP status code specified for error: " + key);
			}
			if (!val.tags || !Array.isArray(val.tags) || val.tags.length === 0) {
				console.warn("No tags specified for error: " + key);
			}
			for(var i in val.tags) {
				var tag = val.tags[i];
				if (typeof this.errors[tag] === 'undefined') {
					this.errors[tag] = {};
				}
				this.errors[tag][key] = val;
			}
		}

		this.tags = Object.keys(this.errors);
		this.tags.sort();
	}
};
</script>