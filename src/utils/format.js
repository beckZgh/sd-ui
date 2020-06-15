
import { isNumber, isString, isBoolean } from '@/utils/validate';

/**
 * 格式化千分份,和小数位
 * @param {Number} value
 */
function formatThousands(value) {
    return value.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

/**
 * 格式化日期
 * @param {Date | String} t
 * @param {String} fmt
 */
export function formatDate(t, fmt='YY-MM-DD') {

    let d = getDate(t);

    let map = {
        YY: d.getFullYear(),
        MM: repair(d.getMonth() + 1),
        DD: repair(d.getDate()),
        hh: repair(d.getHours()),
        mm: repair(d.getMinutes()),
        ss: repair(d.getSeconds())
    }

    for (let k in map) {
        if (map.hasOwnProperty(k)) {
            fmt = fmt.replace(k, map[k])
        }
    }

    return fmt

    function getDate(t) {

        if (t instanceof Date) return t
        // 异常数据返回默认时间
        let d = new Date(t);

        if (isNaN(d.getTime())) {
            t = t.replace(/-/g, "/");
            d = new Date(t);
            if (isNaN(d.getTime())) return new Date('1900/01/01');
        }

        return d;
    }

    function repair(n) {
        return Number(n) < 10 && '0' + n || n;
    }
}

/**
 * 格式化金额类
 */
export function formatPrice(val, emptyText = '') {
    val = Number(val);
    if (!isNumber(val)) return emptyText;

    return !val ? '' : val.toFixed(2);
}

/**
 * 格式化比率类
 */
export function formatRate(val, emptyText = '') {
    val = Number(val);
    if (!isNumber(val)) return emptyText;

    return (val * 100).toFixed(2) + '%';
}

/**
 * 格式化勾选类
 */
export function formatChecked(val, emptyText = '') {

    val =  isNumber(val)  && !!val
        || isString(val)  && !!Number(val)
        || isBoolean(val) && val;

    if (!isBoolean(val)) return emptyText;

    return !!val && '√' || '';
}

/**
 * 格式化字符串类
 */
export function formatStr(val, trueVal = '是', falseVal = '否') {

    val =  isNumber(val)  && !!val
        || isString(val)  && !!Number(val)
        || isBoolean(val) && val;

    if (!isBoolean(val)) return '';

    return val ? trueVal : falseVal;
}


export default {
    formatPrice,
    formatRate,
    formatChecked,
    formatStr,
    formatThousands,
    formatDate,
};
