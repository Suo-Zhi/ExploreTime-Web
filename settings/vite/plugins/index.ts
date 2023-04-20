import vue from '@vitejs/plugin-vue';
import { Plugin } from 'vite';

export const setupPlugins = () => {
    let plugins: Plugin[] = [vue()];

    return plugins;
};
