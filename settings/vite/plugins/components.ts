import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export const setupComponent = () => {
    return Components({
        // 第三方组件自动注册
        resolvers: [
            ArcoResolver({
                sideEffect: true,
            }),
            (componentName) => {
                if (componentName.startsWith('Icon')) {
                    return { name: componentName.slice(4), from: '@icon-park/vue-next' };
                }
            },
        ],
        // 需要自动注册的组件目录
        dirs: ['src/components'],
        // 声明文件位置
        dts: 'settings/declare/components.d.ts',
    });
};
