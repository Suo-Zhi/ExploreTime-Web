import { createApp } from 'vue';
import App from './App.vue';
import { setupPlugins } from './common/plugins';
import '@arco-design/web-vue/dist/arco.css';
import { setupRouter } from './router';
import 'animate.css';

const bootstrap = () => {
    const app = createApp(App);
    setupPlugins(app);
    setupRouter(app);
    app.mount('#app');
};

bootstrap();
