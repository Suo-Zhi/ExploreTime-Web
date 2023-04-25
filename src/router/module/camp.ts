import { RouteRecordRaw } from 'vue-router';

export default {
    path: '/camp',
    name: 'camp',
    component: () => import('@/views/camp/Index.vue'),
    redirect: '/camp/workbench',
    children: [
        {
            path: 'dashboard',
            name: 'dashboard',
            meta: {
                auth: true,
            },
            component: () => import('@/views/camp/Dashboard.vue'),
        },
        {
            path: 'workbench',
            name: 'workbench',
            meta: {
                auth: true,
            },
            component: () => import('@/views/camp/Workbench.vue'),
        },
        {
            path: 'mark',
            name: 'mark',
            meta: {
                auth: true,
            },
            component: () => import('@/views/camp/Mark.vue'),
        },
    ],
} as RouteRecordRaw;
