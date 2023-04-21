import { App } from 'vue';
import { setupTailwindcss } from './tailwindcss';
import { setupPinia } from './pinia';

export const setupPlugins = (app: App) => {
    setupTailwindcss();
    setupPinia(app);
};
