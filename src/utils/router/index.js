import RouterComponents, { loadPage } from './components';
import { firstWordToUppercase } from '@/utils';
import { isString, isFunction } from '@/utils/validate';

/**
 * 转换配置为路由
 * @param {Array|Object} config
 */
export const transConfToRoute = (config = {}, transFn) => {
    const configList = Array.isArray(config) ? config : [config];
    const router = generateRoute(configList); // 生成路由

    function generateRoute(configlist, basepath = '') {
        return configlist.map(item => {
            const { filePath, routePath, routeName } = parsetPath(item.path, basepath);

            let route = {
                path: routePath,
                name: routeName,
                alias: item.alias,
                props: item.props,
                meta: {
                    ...item.meta,
                    icon: item.icon,
                    title: item.title,
                    keepAlive: item.keepAlive,
                    pv: getPv(item.pv, routePath),
                },
                hidden: item.hidden,
                component: RouterComponents(item.component) || loadPage(filePath, routeName),
                beforeEnter: item.beforeEnter,
            };

            if (item.children) {
                // 读取子路由
                route.children = generateRoute(item.children, routePath);

                // 重定向
                route.redirect = item.redirect || { name: route.children[0].name };
            }

            // 自定义修改 route 对象
            if (isFunction(transFn)) transFn(route, item);

            return route;
        });
    }

    return router;
};

/**
 * 解析路径,
 * @param {String} path 当前路径
 * @param {String} basepath 父级路径
 */
function parsetPath(path, basepath) {
    /**
     * 以 “/” 结尾,则视为目录,读取该目录下的 “index" 文件
     * 以 “_” 的单词，会被视为 params 的参数, routepath 会把 “_” 转成 “:”
     */
    let filePath = ''; // 文件路径
    let routePath = ''; // 路由路径
    let routeName = ''; // 命名路由

    filePath = `${path}index`;

    filePath = path.endsWith('/') ? `${path}index` : path;
    routePath = path.endsWith('/') ? path.slice(0, path.length - 1) : path;

    filePath = `${basepath}/${filePath}`;
    routePath = `${basepath}/${routePath}`;

    // 解析 params
    // routePath = routePath.replace(/_/g, ':');

    routeName = filePath.split('/').reduce((name, item) => {
        name += firstWordToUppercase(item);
        return name;
    }, '');

    return {
        filePath,
        routePath,
        routeName,
    };
}

/**
 * 设置为 false, 则不校验权限
 * 手动设置 pv, 则以设置为准
 * 默认以当前 routeName 校验
 */
function getPv(pv, routePath) {
    if (pv === false) return false;
    if (isString(pv)) return pv;

    return routePath;
}
