import { localRoutes, publichRoutes, privateRoutes } from '@/router';
import { transConfToRoute } from '@/utils/router';

const state = {
    routes: [], // 最终生成可访问页面
    pv: {}, // 权限表
    whiteList: publichRoutes.map(p => p.path), // 白名单
    localRoutes: localRoutes.map(p => p.path), // 本地路由
    publichRoutes, // 公开路由
    privateRoutes: [], // 权限路由
};

const mutations = {
    SET_ROUTES(state, routes) {
        state.routes = routes;
    },
    SET_PV(state, pv) {
        state.pv = pv;
    },
    SET_PRIVATEROUTES(state, routes) {
        state.privateRoutes = routes;
    },
};

const ADMIN_PV = {
    '/sys/user': true,
    '/sys/role': true,
    '/sys/pv/menu': true,
    '/sys/pv/branch': true,
};

const actions = {
    async generatorRoutes({ dispatch, commit }) {
        const { user, menus } = await dispatch('user/getUserPv', null, { root: true });

        // 管理员默认拥有权限
        let pv = user.uid === 'admin' ? { ...ADMIN_PV } : {};

        menus.forEach(item => {
            pv[item] = true;
        });

        // 外部处理好 localRoutes 的数据
        let routes = publichRoutes.concat(localRoutes);

        const addRoutes = transConfToRoute(privateRoutes, (route, item) => {
            if (!route.children) {
                const { hidden, meta, path } = route;
                if (hidden) {
                    route.show = false;
                    return;
                }

                route.show = meta.pv === false || (meta.pv && pv[meta.pv]) || pv[path];
            } else {
                route.show = route.children.some(item => item.show);
            }
        });

        routes = routes.concat(addRoutes);
        routes.push({ path: '*', redirect: '/404', hidden: true });

        commit('SET_PV', pv);
        commit('SET_ROUTES', routes);
        commit('SET_PRIVATEROUTES', addRoutes);

        return { routes };
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
