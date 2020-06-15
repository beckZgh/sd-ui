import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '@/views/layout/index';

/** 本地开发展示路由 */
export const localRoutes = (function () {
    const routes = [];

    return (process.env.NODE_ENV === 'development' && routes) || [];
})();

/** 公开路由,无需权限及登录 */
export const publichRoutes = [
    {
        path: '/',
        redirect: '/home',
        hidden: true,
    },
    {
        path: '/login',
        meta: { title: '登录页面' },
        component: () => import('@/views/login'),
        hidden: true,
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index'),
            },
        ],
    },
    {
        path: '/404',
        component: () => import('@/views/error/404'),
        hidden: true,
    },
    {
        path: '/403',
        component: () => import('@/views/error/403'),
        hidden: true,
    },
    {
        path: '/home',
        component: Layout,
        meta: { title: '首页', icon: 'home' },
        children: [
            {
                path: '',
                component: () => import('@/views/home/index'),
            },
        ],
    },
];

// 私有路由,需登录及相应权限
export const privateRoutes = [];

const router = new Router({
    routes: publichRoutes,
    base: process.env.BASE_URL,
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
});

export default router;
