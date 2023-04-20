import vue from '@vitejs/plugin-vue';
import { Plugin } from 'vite';
import { autoImport } from './autoImport';

export const setupPlugins = () => {
    let plugins: Plugin[] = [vue()];

    plugins.push(autoImport()); // 配置API按需导入
    return plugins;
};
