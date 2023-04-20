/// <reference types="vite/client" />

// 声明环境变量类型
declare interface MetaEnv {
    VITE_PORT: number;
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
