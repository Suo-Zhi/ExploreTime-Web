import { createApp } from 'vue';
import App from './App.vue';
import { setupPlugins } from './common/plugins';
import '@arco-design/web-vue/dist/arco.css';

const bootstrap = () => {
    const app = createApp(App);
    setupPlugins(app);
    app.mount('#app');
};

bootstrap();
