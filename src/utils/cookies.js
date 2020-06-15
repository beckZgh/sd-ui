import Cookies from 'js-cookie';

const TokenKey = 'auth';
const SizeKey  = 'sumdoo_cloud-size'

export function getToken(){
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function getSize(){
    return Cookies.get(SizeKey);
}

export function setSize(size) {
    return Cookies.set(SizeKey, size);
}

export function removeSize() {
    return Cookies.remove(SizeKey);
}
