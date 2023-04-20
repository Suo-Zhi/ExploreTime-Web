import vue from '@vitejs/plugin-vue';
import { alias } from './settings/vite/alias';

export default () => {
    return {
        plugins: [vue()],
        resolve: { alias }, // 设置别名
    };
};
