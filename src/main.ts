import { createApp } from 'vue';
import App from './App.vue';
import { setupPlugins } from './common/plugins';
import { setupRouter } from './router';
import '@arco-design/web-vue/dist/arco.css';
import '@/common/assets/css/index.scss';

const bootstrap = () => {
    const app = createApp(App);
    setupPlugins(app);
    setupRouter(app);
    app.mount('#app');
};

bootstrap();
