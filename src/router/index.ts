import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes } from './base';
import { setupModuleRoutes } from './module';

export const router = createRouter({
    history: createWebHistory(),
    routes: baseRoutes,
});

export const setupRouter = (app: App) => {
    setupModuleRoutes(router); // 加载模块路由
    app.use(router); // 注册路由
};
