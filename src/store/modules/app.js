import { getSize } from '@/utils/cookies';

const state = {
    isCollapse: false,
    size: getSize() || 'small',
};

const mutations = {
    TOGGLE_SIDEBAR(state) {
        state.isCollapse = !state.isCollapse;
    },
    SET_SIZE(state, size) {
        state.size = size;
    },
};

const actions = {
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR');
    },
    setSize({ commit }, size) {
        commit('SET_SIZE', size);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
