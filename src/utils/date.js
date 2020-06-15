
export function newDate(str){

    if (!str) return new Date();
    if (typeof str !== "string") return new Date(str);

    let s = str.split('-');

    let d = new Date(s[0], s[1] - 1, s[2]);

    console.log('newDate-Fn1: ', d);
    return d;
}

export function addDay(date, days){
    let d = newDate(date);
        d = d.valueOf();
        d = d + days * 24 * 60 * 60 * 1000;
    return new Date(d);
}

export function preMonthDay(date){
    let d = newDate(date);
    let y = d.getFullYear();
    let m = d.getMonth()-1;
    return new Date(y, m, d.getDate());
}

export function firstDate(date, month){
    let d = newDate(date);
    let y = d.getFullYear();
    let m = d.getMonth() + (month || 0);
    return new Date(y, m, 1);
}

export function lastDate(date, month){
    let d = newDate(date);
    let y = d.getFullYear();
    let m = d.getMonth() + (month || 0);
    return new Date(y, m+1, 0);
}

export function formatDate(date){
    let d = newDate(date);
    let yy = d.getFullYear();
        let mm = d.getMonth()+1;
        let dd = d.getDate();

        mm = mm<10 && '0'+mm || mm;
        dd = dd<10 && '0'+dd || dd;
    return yy+'-'+mm+'-'+dd;
}
