import AutoImport from 'unplugin-auto-import/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export const autoImport = () => {
    return AutoImport({
        imports: [
            // 内置api
            'vue',
            'vue-router',
            'pinia',
            // 自定义api
            {
                '@/common/utils/env': ['env'],
                '@/common/utils/cache': ['localCache'],
                '@/types/cache': ['CacheKey'],
                '@/store': ['store'],
                '@/common/plugins/axios': ['http'],
                '@/api': ['api'],
                '@/common/plugins/validate': ['yup', 'useForms'],
            },
        ],
        resolvers: [ArcoResolver()],
        // 声明文件位置
        dts: 'settings/declare/auto-imports.d.ts',
    });
};
