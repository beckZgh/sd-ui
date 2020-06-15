
import axios  from 'axios';
import Notice from '@/utils/notice';
import router from '@/router';

import { isObject    } from '@/utils/validate';
import { removeToken } from '@/utils/cookies';

const service = axios.create({
    timeout: 60 * 1000,                 // 60秒超时
    headers: {
        'Cache-Control': 'no-cache' // 禁止缓存
    },
    validateStatus(status){
        return status === 200;      // 只resolve 200状态码
    },
});

// 响应拦截器
service.interceptors.response.use(
    response => {
        return handleSuccessResponse(response.data);
    },
    error => {
        return handleErrorResponse(error);
    }
);

// 响应成功, 进行兼容处理
function handleSuccessResponse(res = {}) {

    const ok   = res.ok   || res.result;
    const data = res.data || res.res;
    const code = res.code || '';

    let err = res.err || res.msg || res.message;
        err = isObject(err) ? Object.values(err).join('\n') : err;

    // 待后端统一 （待修改)
    if (code && code === 'not_allowed') {
        removeToken();

        router.replace({
            path: '/login',
            query: {
                redirect: router.fullPath,
            }
        });

        Notice.warningMsg('登录超时, 需要重新登录!');
        return Promise.reject(err);
    }

    if (!ok) {
        Notice.errorMsg(err || '内部错误，请稍后重试!');
        return Promise.reject(err);
    }

    res.ok   = res.result  = ok;
    res.err  = res.message = res.msg = err;
    res.data = res.res     = data;

    return res;

}

// 处理其他不同状态码
const statusMap = {
    // 未登录
    401(err) {
        router.replace('/login');
    },
    // 登录超时, 需要重新登录
    403(err) {
        removeToken();

        router.replace({
            path: '/login',
            query: {
                redirect: router.fullPath,
            }
        });

        Notice.warningMsg('登录超时, 需要重新登录!');
    },
    // 请求资源不存在
    404(err) {
        Notice.errorMsg('请求资源不存在!');
    },
    // 内部错误，请稍后重试
    500(err) {
        Notice.errorMsg('内部错误，请稍后重试!');
    },
    // 服务未启动
    502(err) {
        Notice.errorMsg('服务无响应,请稍后重试!');
    },
    // 服务器正在维护，请稍等
    503(err) {
        Notice.errorMsg('服务器正在维护，请稍后重试!');
    },
};

// 处理响应失败
function handleErrorResponse(error) {

    const status = error.response && error.response.status;

    if (statusMap[status]) {
        statusMap[status]();
    } else {
        const msg       = error.message;
        const isTimeout = /timeout\sof\s\d+ms\sexceeded/.test(msg);
        Notice.errorMsg(isTimeout ? '网络出了点问题，请稍后重试!' : msg);
    }

    return Promise.reject(error);
}

/**
 * 封装请求
 * method: get, post, put, delete, upload (内部转 post)
 * @param {String} method
 */
function request(method) {
    return function (url, params, showLoading = false, config) {
        return new Promise((resolve, reject) => {

            // 显示 loading
            showLoading && cratedLoading();

            // 结合参数, 返回一个最终请求的配置
            const conf = handleParams({ url, method, params, config });

            // 发送请求
            service.request(conf)
                .then(res => {

                    resolve(res);
                }).catch(err => {

                    reject(err);
                }).finally(() => {

                    // 关闭 loading
                    showLoading && Notice.closeLoading();
                });
        });
    }
}

// 创建loading
function cratedLoading() {
    return Notice.showLoading({
        text       : '加载中...',
        background : 'transparent',
        spinner    : 'el-icon-loading',
        customClass: 'axios-loading',
    });
}

// 统一处理参数，生成请求配置
function handleParams({ url, method, params = {}, config = {} }) {

    // 设置上传文件Conent-Type类型
    if (method === 'upload') {
        config.headers = {
            'Content-Type': "multipart/form-data",
            "charset"     : "utf-8"
        };
    }

    method = method === 'upload' ? 'post' : method;
    params = ['get', 'delete'].includes(method) ? { params } : { data: params };

    return { url, method, ...params, ...config };
}

export const GET    = request('get');
export const POST   = request('post');
export const PUT    = request('put');
export const DELETE = request('delete');
export const UPLOAD = request('upload');

export default {
    get   : GET,
    post  : POST,
    put   : PUT,
    delete: DELETE,
    upload: UPLOAD,
};
