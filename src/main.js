import Vue from 'vue';
import 'normalize.css/normalize.css';
import './styles/index.scss';

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 自动化加载全局组件
import '@/components/Base/_init';

import App from './App';
import router from './router';
import store from './store';
import eventBus from './utils/eventBus';
import handleErr from './utils/error';
import { getSize } from './utils/cookies';

import './utils/helper'; // 全局辅助函数, 实例 helper 对象下
import './filters'; // 全局过滤器
import './directives'; // 全局指令
import './icons';
import './config';
import './permission';

Vue.use(eventBus);
Vue.use(Element, {
    size: getSize() || 'small',
});

if (process.env.NODE_ENV !== 'development') {
    handleErr();
}

// eslint-disable-next-line no-unused-vars
const vm = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
