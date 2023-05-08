import { RouteLocationNormalized, Router } from 'vue-router';

export const guard = (router: Router) => {
    // 每次路由跳转时处理
    router.beforeEach((to, from) => {
        return interceptRoute(to, from);
    });
};

const interceptRoute = async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    const token = localCache.get('token');

    // 如果已登录则获取最新用户信息
    if (token) {
        await api.auth.getCurrentUserInfo().then((res) => {
            store.user().userinfo = res.data;
        });
    }

    // 路由是否不允许游客访问
    if (to.meta.auth && !token) return { name: 'login' };
    // 路由不允许登录用户访问则跳转回原页面
    if (to.meta.guest && token) return from;
};
