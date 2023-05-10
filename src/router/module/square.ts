import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/square',
    name: 'square',
    component: () => import('@/views/square/Index.vue'),
    redirect: '/square/knowledge',
    children: [
        {
            path: 'knowledge',
            name: 'knowledge',
            component: () => import('@/views/square/knowledge/Index.vue'),
        },
        {
            path: 'article',
            name: 'article',
            component: () => import('@/views/square/article/Index.vue'),
        },
        {
            path: 'exercise',
            name: 'exercise',
            component: () => import('@/views/square/exercise/Index.vue'),
        },
    ],
} as RouteRecordRaw;
