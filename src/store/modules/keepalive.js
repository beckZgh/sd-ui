const state = {
    routes: [],
    max: 10,
};

const mutations = {
    SET_ROUTES(state, routes) {
        state.routes = routes;
    },
};

const actions = {
    addKeepAliveRoute({ commit, state }, routeName) {
        let routes = state.routes;
        if (routes.length < state.max) {
            routes.push(routeName);

            commit('SET_ROUTES', routes);
        } else {
            // 如果超出最多缓存,则最后一个替换最前一个
            routes.shift();
            routes.push(routeName);
            commit('SET_ROUTES', routes);
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
