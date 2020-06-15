export default {
    // app.js
    isCollapse: state => state.app.isCollapse,
    size: state => state.app.size,

    // user.js
    user: state => state.user.user,
    cid: state => state.user.cid,
    uid: state => state.user.uid,
    rid: state => state.user.rid,
    userName: state => state.user.name,
    menus: state => state.user.menus,
    today: state => state.user.today,

    // permission.js
    routes: state => state.permission.routes,
    whiteList: state => state.permission.whiteList,
    publichRoutes: state => state.permission.publichRoutes,
    pv: state => state.permission.pv,

    // keepalive.js
    keepAliveRoutes: state => state.keepalive.routes,
};
