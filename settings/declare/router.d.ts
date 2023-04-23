import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        auth?: boolean; // 是否开启游客拦截
        guest?: boolean; // 是否开启登录用户拦截
    }
}
