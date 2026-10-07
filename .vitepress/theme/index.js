import DefaultTheme from 'vitepress/theme';
import { useRoute } from 'vitepress';
import mediumZoom from 'medium-zoom';
import { defineAsyncComponent, nextTick, onMounted, watch } from 'vue';
import Layout from './Layout.vue';
import Channels from './components/Channels.vue';
import CodeSwitcher from './components/CodeSwitcher.vue';
import News from './components/News.vue';
import './custom.css';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('ApiSpec', defineAsyncComponent(() => import('./components/ApiSpec.vue')));
    app.component('ErrorCodes', defineAsyncComponent(() => import('./components/ErrorCodes.vue')));
    app.component('Channels', Channels);
    app.component('CodeSwitcher', CodeSwitcher);
    app.component('News', News);
  },
  setup() {
    const route = useRoute();
    let zoom = null;
    const initZoom = () => {
      zoom?.detach();
      zoom = mediumZoom('.vp-doc figure img', { background: 'var(--vp-c-bg)', margin: 24 });
    };
    onMounted(initZoom);
    watch(() => route.path, () => nextTick(initZoom));
  }
};
