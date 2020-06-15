import Vue from 'vue';

import {
    formatPrice as filterPrice,
    formatRate as filterRate,
    formatChecked as filterChecked,
    formatStr as filterStr,
} from '@/utils/format';

const filters = {
    filterPrice,
    filterRate,
    filterChecked,
    filterStr,
};

if (Object.keys(filters).length) {
    for (let k in filters) {
        if (filters.hasOwnProperty(k)) {
            Vue.filter(k, filters[k]);
        }
    }
}
