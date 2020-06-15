import { Loading, Message, Notification, MessageBox } from 'element-ui';

export {
    /** loading 用户数据加载,页面转场... */
    showLoading,
    closeLoading,

    /** message 用于用户操作反馈提示 */
    successMsg,
    warningMsg,
    infoMsg,
    errorMsg,
    message,

    /** notificaton 用于系统通知类提醒 */
    successNotice,
    warningNotice,
    infoNotice,
    errorNotice,
    notice,
};

/** mssagebox 确认框等. */
export const $showAlert   = createPromise(MessageBox.alert  , true );
export const $showConfirm = createPromise(MessageBox.confirm, true );
export const $showPrompt  = createPromise(MessageBox.prompt , false);

/**
 * @param {*} options 配置项
 */
let $loading = null;
function showLoading(options={}){
    if($loading) return $loading;
       $loading = Loading.service(options);
}

function closeLoading(){
    $loading && $loading.close();
    $loading  = null;
}

function successMsg(options){
    Message.success(handleOptions(options));
}

function warningMsg(options){
    Message.warning(handleOptions(options));
}

function infoMsg(options){
    Message.info(handleOptions(options));
}

function errorMsg(options){
    Message.error(handleOptions(options));
}

const msgMap = {
    success: successMsg,
    warning: warningMsg,
    info   : infoMsg,
    error  : errorMsg,
}
function message(type, options){
    if(!type) throw new Error('must set type!');
    if(!Message[type]) throw new Error('invalid type!');

    return msgMap[type](handleOptions(options));
}

function successNotice(options){
    Notification.success(handleOptions(options));
}

function warningNotice(options){
    Notification.warning(handleOptions(options));
}

function infoNotice(options){
    Notification.info(handleOptions(options));
}

function errorNotice(options){
    Notification.error(handleOptions(options));
}

const noticeMap = {
    success: successMsg,
    warning: warningMsg,
    info   : infoMsg,
    error  : errorMsg,
}

function notice(type, options){
    if(!type) throw new Error('must set type!');
    if(!Notification[type]) throw new Error('invalid type!');

    return noticeMap[type](handleOptions(options));
}

function handleOptions(options){
    if(!options) return;
    if(typeof(options)==='object' && !options.message) return;

    if(typeof(options) === 'string'){
        return { message: options }
    }

    return options;
}

function createPromise(fn, useDefVal=true){
    if(!fn && typeof(fn)!=='function'){
        throw new Error('fn must set and fn is function!');
    }

    return function(){
        return new Promise(( resolve, reject ) => {
            try {
                let args = [...arguments];
                let len  = args.length;

                // 默认第三项字符串为类型
                if( len===3 && typeof(args[2])==='string'){
                    const type = args[2];
                    if(['success','info','warning','error'].includes(type)){
                        args[2] = { type };
                    }else {
                        args[2] = { type: 'warning' };
                    }
                }

                // 使用默认值
                if(useDefVal===true){
                    if(!args[1]) args[1] = '提示';
                    if(!args[2]) args[2] = { type: 'warning' };
                }

                // 不允许点击遮罩层关闭
                args[2].closeOnClickModal = false;

                fn(...args)
                .then ((res)=> {
                    resolve(typeof(res)==='object' && res.value || true);
                })
                .catch(()=> resolve(false));

            }catch(e){
                throw new Error(e);
            }
        });
    }
}

export default {
    /** loading 用户数据加载,页面转场... */
    showLoading,
    closeLoading,

    /** message 用于用户操作反馈提示 */
    successMsg,
    warningMsg,
    infoMsg,
    errorMsg,
    message,

    /** notificaton 用于系统通知类提醒 */
    successNotice,
    warningNotice,
    infoNotice,
    errorNotice,
    notice,

    /** mssagebox 确认框等. */
    $showAlert,
    $showConfirm,
    $showPrompt
}
