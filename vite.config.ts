import { alias } from './settings/vite/alias';
import { ConfigEnv, loadEnv } from 'vite';
import { parseEnv } from './settings/vite/utils';
import { setupPlugins } from './settings/vite/plugins';

export default ({ mode }: ConfigEnv) => {
    const root = process.cwd();
    const env = parseEnv(loadEnv(mode, root));

    return {
        plugins: setupPlugins(), // 插件独立管理
        resolve: { alias },
        server: {
            port: env.VITE_PORT, // 设置端口号
        },
    };
};
