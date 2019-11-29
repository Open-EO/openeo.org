<template>
  <div class="news">
    <ul class="posts" v-if="posts.length">
      <li class="post" v-for="post in posts">
        <small>{{post.frontmatter.dateFormatted}}</small><br />
        <router-link :to="post.path">
          {{post.frontmatter.title}}
        </router-link>
      </li>
    </ul>
    <router-link v-if="readMore" to="/news/">Read more...</router-link>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'News',
  props: ["page","limit"],
  data() {
    return {
      readMore: false
    };
  },
  computed: {
    posts() {
      this.readMore = false;
      let currentPage = "/news/";
      let posts = this.$site.pages
        .filter(x => x.frontmatter.news)
        .sort((a, b) => {
          return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
        })
        .map(x => {
          x.frontmatter.dateFormatted = dayjs(x.frontmatter.date).format('MMMM D, YYYY')
          return x;
        });
      if (this.limit > 0 && this.limit < posts.length) {
        posts = posts.slice(0, this.limit);
        this.readMore = true;
      }
      return posts;
    }
  }
};
</script>