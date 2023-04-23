import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/auth/Index.vue'),
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
