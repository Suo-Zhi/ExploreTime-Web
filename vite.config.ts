import { alias } from './settings/vite/alias';
import { ConfigEnv, loadEnv } from 'vite';
import { parseEnv } from './settings/vite/utils';
import { setupPlugins } from './settings/vite/plugins';
import { css } from './settings/vite/css';
import path from 'path';

export default ({ mode }: ConfigEnv) => {
    const root = path.resolve(__dirname, './settings/env');
    const env = parseEnv(loadEnv(mode, root));

    return {
        plugins: setupPlugins(), // 插件独立管理
        resolve: { alias },
        server: {
            port: env.VITE_PORT, // 设置端口号
        },
        css,
        envDir: './settings/env', // 读取环境变量目录
    };
};
