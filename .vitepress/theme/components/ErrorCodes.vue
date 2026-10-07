<template>
	<div class="error-codes">
		<p>The whole table of error codes is available as <a :href="withBase(jsonUrl)" target="_blank">JSON file</a>, which can be used by implementors to automatically generate error responses.</p>
		<div v-for="tag in tags" :key="tag">
			<h2 :id="slugify(tag)" tabindex="-1">{{ tag }} <a class="header-anchor" :href="'#' + slugify(tag)" :aria-label="'Permalink to ' + tag">&#8203;</a></h2>
			<table>
				<thead>
					<tr>
						<th width="20%">openEO Error Code</th>
						<th width="40%">Description</th>
						<th width="35%">Example Message</th>
						<th width="5%">HTTP Status Code</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(error, name) in errors[tag]" :key="name">
						<td>{{ name }}</td>
						<td>{{ error.description }}</td>
						<td>{{ error.message }}</td>
						<td>{{ error.http }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { data as errorsByVersion } from '../errors.data.js';
import { useVersioning } from '../versioning.js';

const { version } = useVersioning();

const jsonUrl = computed(() => '/documentation/' + version.value.folder + '/developers/api/errors.json');

// Group by tag in a dict
const errors = computed(() => {
	const grouped = {};
	const errorData = errorsByVersion[version.value.folder] || {};
	for (const key in errorData) {
		const val = { description: '', ...errorData[key] };
		for (const tag of val.tags || []) {
			grouped[tag] ??= {};
			grouped[tag][key] = val;
		}
	}
	return grouped;
});

const tags = computed(() => Object.keys(errors.value).sort());

const slugify = title => title.toLowerCase().replace(' ', '_');
</script>
