import { RouteLocationNormalized, Router } from 'vue-router';

export const guard = (router: Router) => {
    // 每次路由跳转时处理
    router.beforeEach((to, from) => {
        return interceptRoute(to, from);
    });
};

const interceptRoute = async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const token = localCache.get('token');

    // 路由是否不允许游客访问
    if (to.meta.auth) {
        // 拦截游客
        if (!token) return { name: 'login' };
        // 获取最新用户信息
        const res = await api.auth.getCurrentUserInfo();
        store.user().userinfo = res.data;
    }
    // 路由不允许登录用户访问则跳转回原页面
    if (to.meta.guest && token) return from;
};
