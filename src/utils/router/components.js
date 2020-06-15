import Layout from '@/views/layout/index';
import View from '@/views/view';
import { isFunction, isString } from '@/utils/validate';

/** 页面加载器 v20.04.30 */

// 异步加载页面
let mPages = {};
export const loadPage = page_path => {
    return resolve => {
        if (mPages[page_path]) {
            resolve(mPages[page_path]);
        } else {
            import(`@/views${page_path}`).then(page => {
                mPages[page_path] = page;
                resolve(page);
            });
        }
    };
};

const map = {
    Layout,
    View,
};

export default function (component) {
    if (isFunction(component)) return component;
    if (isString(component) && map[component]) return map[component];

    return null;
}
