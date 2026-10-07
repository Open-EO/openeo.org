<template>
  <Layout>
    <template #doc-before>
      <VersionChooser inline />
      <div v-if="frontmatter.news" class="vp-doc news-header">
        <h1>{{ frontmatter.title }}</h1>
        <p class="news-meta">
          Written
          <template v-if="frontmatter.date">on <em>{{ formatDate(frontmatter.date) }}</em></template>
          <template v-if="frontmatter.author"> by <em>{{ frontmatter.author }}</em></template>.
        </p>
      </div>
    </template>
    <template #aside-top>
      <VersionChooser />
    </template>
    <template #page-top>
      <VersionChooser floating />
      <InlineFrame v-if="frontmatter.iframe" :key="route.path" :url="frontmatter.iframe" :version="version" />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import InlineFrame from './components/InlineFrame.vue';
import VersionChooser from './components/VersionChooser.vue';
import { formatDate } from './dates.js';
import { useVersioning } from './versioning.js';

const { Layout } = DefaultTheme;
const { frontmatter } = useData();
const route = useRoute();
const { version } = useVersioning();
</script>
