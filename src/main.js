// src/main.js
import { createApp, provide, h } from 'vue';
import App from './App.vue';
import apolloProvider from './vue-apollo';
import { DefaultApolloClient } from '@vue/apollo-composable';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloProvider.defaultClient);
  },
  render: () => h(App),
});

app.use(apolloProvider);
app.mount('#app');
