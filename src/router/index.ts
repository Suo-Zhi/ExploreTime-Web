import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes } from './base';

export const router = createRouter({
    history: createWebHistory(),
    routes: baseRoutes,
});

export const setupRouter = (app: App) => {
    app.use(router); // 注册路由
};
