import vue from '@vitejs/plugin-vue';
import { Plugin } from 'vite';
import { autoImport } from './autoImport';
import { setupComponent } from './components';

export const setupPlugins = () => {
    let plugins: Plugin[] = [vue()];

    plugins.push(autoImport()); // 配置API按需导入
    plugins.push(setupComponent()); // 配置组件按需导入
    return plugins;
};
