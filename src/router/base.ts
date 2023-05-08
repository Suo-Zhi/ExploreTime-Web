import { RouteRecordRaw } from 'vue-router';

export const baseRoutes: RouteRecordRaw[] = [
    // 首页
    {
        path: '/',
        name: 'index',
        meta: {
            auth: true,
        },
        redirect: '/camp',
        component: () => import('@/views/camp/Index.vue'),
        children: [],
    },
    // 404页面
    {
        path: '/:any(.*)',
        name: 'not-found',
        component: () => import('@/views/error/404.vue'),
    },
];
