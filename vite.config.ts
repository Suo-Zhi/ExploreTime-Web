import vue from '@vitejs/plugin-vue';
import { alias } from './settings/vite/alias';
import { ConfigEnv, loadEnv } from 'vite';
import { parseEnv } from './settings/vite/utils';

export default ({ mode }: ConfigEnv) => {
    const root = process.cwd();
    const env = parseEnv(loadEnv(mode, root));

    return {
        plugins: [vue()],
        resolve: { alias },
        server: {
            port: env.VITE_PORT, // 设置端口号
        },
    };
};
