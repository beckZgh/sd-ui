const state = {
    user: null, // 用户信息
    cid: '', // 商户编码
    uid: '', // 账号编码
    rid: '', // 角色编码
    name: '', // 角色名称
    menus: [], // 可访问菜单
    pv: {}, // 可访问权限菜单表
    routes: [], // 路由表
    today: '', // 当前日期
};

const mutations = {
    SET_USER(state, user) {
        state.user = user;
    },
    SET_USERINFO(state, { key, value }) {
        state.user[key] = value;
    },
    SET_MENUS(state, menus) {
        state.menus = menus;
    },
    SET_CID(state, cid) {
        state.cid = cid;
    },
    SET_UID(state, uid) {
        state.uid = uid;
    },
    SET_NAME(state, name) {
        state.name = name;
    },
    SET_RID(state, rid) {
        state.rid = rid;
    },
    SET_ROUTES(state, routes) {
        state.routes = routes;
    },
    SET_TODAY(state, today) {
        state.today = today;
    },
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
