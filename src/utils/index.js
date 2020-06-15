/**
 * 获取当期日期时间
 */
export function getNow() {
    let d = new Date();

    let yy = d.getFullYear();
    let mm = d.getMonth() + 1;
    mm = (mm < 10 && '0' + mm) || mm;
    let dd = d.getDate();
    dd = (dd < 10 && '0' + dd) || dd;

    let h = d.getHours();
    h = (h < 10 && '0' + h) || h;
    let m = d.getMinutes();
    m = (m < 10 && '0' + m) || m;
    let s = d.getSeconds();
    s = (s < 10 && '0' + s) || s;

    return yy + '-' + mm + '-' + dd + ' ' + h + ':' + m + ':' + s;
}

/**
 * 计算百分比
 * @param {Number} number
 * @param {Number} total
 */
export function percentage(number, total) {
    return Math.round((number / total) * 10000) / 100;
}

/**
 * 查询列表中字段的最大值
 * @param {Array} list
 * @param {String} prop
 */
export function findListMaxVal(list = [], prop = '') {
    if (!Array.isArray(list)) {
        throw new Error('list must a array');
    }
    if (!prop) {
        throw new Error('list must a string');
    }

    let max = (list[0] && list[0][prop]) || 0;
    list.forEach(item => {
        if (item[prop] > max) max = item[prop];
    });

    return Number(max);
}

/**
 * 转换单词首字母大写
 * @param {String} word
 */
export const firstWordToUppercase = word => {
    return !word ? '' : word.replace(word[0], word[0].toLocaleUpperCase());
};
