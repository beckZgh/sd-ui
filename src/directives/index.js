import Vue from 'vue';
import focus from './focus';

const directives = {
    focus,
};

if (Object.keys(directives).length) {
    for (let k in directives) {
        if (directives.hasOwnProperty(k)) {
            Vue.directive(k, directives[k]);
        }
    }
}
