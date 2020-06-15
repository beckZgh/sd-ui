import router from './router';
import store from './store';
import Notice from '@/utils/notice';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

import { getToken, removeToken } from './utils/cookies';

router.beforeEach(async (to, from, next) => {
    NProgress.start();

    if (store.getters.whiteList.includes(to.path)) {
        // 白名单直接通过
        next();
        return;
    }

    // 未登录, 跳转至登录页面
    if (!getToken() && !store.getters.user) {
        next(`/login?redirect=${to.path}`);
        NProgress.done();
        return;
    }

    // 已登录, 路径为登录，重定向为首页
    if (to.path === '/login') {
        next({ path: '/' });
        NProgress.done();
        return;
    }

    /** 权限路由，需要获取用户信息比较 */
    if (store.getters.user) {
        // 本地路由直接通过
        if (to.meta && to.meta.isLocal === true) {
            next();
            return;
        }

        // 未声明权限校验页面,直接通过
        if (!to.meta.pv) {
            next();
            return;
        }

        // 权限校验
        if (store.getters.pv[to.meta.pv || to.path]) {
            next();
            return;
        }

        // 权限不足
        next({ path: '/403' });
    } else {
        try {
            // 获取用户信息
            const { routes = [] } = await store.dispatch('permission/generatorRoutes');
            router.addRoutes(routes);

            next({ ...to, replace: true });
        } catch (e) {
            // 异常，则提示用户重新尝试登录
            Notice.errorMsg(e);
            removeToken();

            next(`/login?redirect=${to.path}`);
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done();
});
