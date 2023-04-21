import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { baseRoutes } from './base';
import { setupModuleRoutes } from './module';
import { guard } from './guard';

export const router = createRouter({
    history: createWebHistory(),
    routes: baseRoutes,
});

export const setupRouter = (app: App) => {
    setupModuleRoutes(router); // 加载模块路由
    guard(router); // 开启路由守卫
    app.use(router); // 注册路由
};
