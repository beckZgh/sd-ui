import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex);

// 自动加载模块数据
// 参考基础组件的自动化加载： https://cn.vuejs.org/v2/guide/components-registration.html
const modulesFiles = require.context('./modules', true, /\.js$/);

const modules = modulesFiles.keys().reduce((map, modulePath) => {
    // set './app.js' => 'app'
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);

    map[moduleName] = value.default;
    return map;
}, {});

const actions = {
    // 加载菜单树形所需数据： 出品部门=》菜品类别=》菜品
    async loadTreeOfDish({ dispatch }, { BranchID }) {
        return Promise.all([
            dispatch('rms/basedata/depart/depart_type/getAll', { BranchID }),
            dispatch('rms/basedata/depart/menu_type/getAll', { BranchID }),
            dispatch('rms/basedata/depart/menu_dish/getAll', { BranchID }),
        ]);
    },
    // 加载菜单类别所需数据：出品部门=》菜品类别
    async loadTreeOfDishType({ dispatch }, { BranchID }) {
        return Promise.all([
            dispatch('rms/basedata/depart/depart_type/getAll', { BranchID }),
            dispatch('rms/basedata/depart/menu_type/getAll', { BranchID }),
        ]);
    },
};

const store = new Vuex.Store({
    modules,
    getters,
    actions,
    /** 严格模式下: 发生了状态变更且不是由 mutation 函数引起的，将会抛出错误 */
    // strict: process.env.NODE_ENV !== 'production',
});

export default store;
