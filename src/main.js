// src/main.js
import { createApp, provide, h } from 'vue';
import App from './App.vue';
import apolloProvider from './vue-apollo';
import { DefaultApolloClient } from '@vue/apollo-composable';
import 'bulma/css/bulma.css';  // Importando Bulma CSS
import * as echarts from 'echarts';  // Importando ECharts

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloProvider.defaultClient);
  },
  render: () => h(App),
});

// Configurando Bulma e ECharts globalmente
app.use(apolloProvider);
app.config.globalProperties.$echarts = echarts;

app.mount('#app');
