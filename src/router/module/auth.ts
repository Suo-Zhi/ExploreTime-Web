import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/auth/Index.vue'),
    children: [
        {
            path: 'login',
            name: 'login',
            meta: {
                guest: true,
            },
            component: () => import('@/views/auth/Login.vue'),
        },
        {
            path: 'register',
            name: 'register',
            meta: {
                guest: true,
            },
            component: () => import('@/views/auth/Register.vue'),
        },
    ],
} as RouteRecordRaw;
