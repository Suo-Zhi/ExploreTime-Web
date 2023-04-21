import { Router } from 'vue-router';

export const guard = (router: Router) => {
    router.beforeEach((to, from) => {});
};
