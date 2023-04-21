import { createApp } from 'vue';
import App from './App.vue';
import { setupPlugins } from './common/plugins';

const bootstrap = () => {
    const app = createApp(App);
    setupPlugins(app);
    app.mount('#app');
};

bootstrap();
