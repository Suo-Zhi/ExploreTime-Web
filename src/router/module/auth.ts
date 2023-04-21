import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/auth',
    name: 'auth',
    redirect: 'auth/login',
    children: [
        {
            path: 'login',
            name: 'login',
            component: () => import('@/views/auth/Login.vue'),
        },
        {
            path: 'register',
            name: 'register',
            component: () => import('@/views/auth/Register.vue'),
        },
    ],
} as RouteRecordRaw;
