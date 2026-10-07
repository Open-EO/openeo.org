<template>
  <div class="news">
    <ul class="posts" v-if="posts.length">
      <li class="post" v-for="post in posts" :key="post.url">
        <small>{{ post.date }}</small><br />
        <a :href="withBase(post.url)">{{ post.title }}</a>
      </li>
    </ul>
    <a v-if="readMore" :href="withBase('/news/')">Read more...</a>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { withBase } from 'vitepress';
import { data as allPosts } from '../news.data.js';

const props = defineProps(['limit']);

const readMore = computed(() => props.limit > 0 && props.limit < allPosts.length);
const posts = computed(() => readMore.value ? allPosts.slice(0, props.limit) : allPosts);
</script>
