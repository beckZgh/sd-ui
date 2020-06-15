const BaseUrl = process.env.VUE_APP_BASE_URL || 'http://localhost';

module.exports = {
    cdn: {
        externals: [
            // cdn加载库需要指定全局变量
            {
                vue: 'Vue',
                vuex: 'Vuex',
                'vue-router': 'VueRouter',
                'element-ui': 'ELEMENT',
            },
        ],
        css: ['https://cdn.bootcss.com/element-ui/2.12.0/theme-chalk/index.css'],
        js: [
            'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',
            'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
            'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
            'https://cdn.bootcss.com/element-ui/2.12.0/index.js',
            'https://cdn.bootcss.com/echarts/4.4.0/echarts-en.min.js',
        ],
    },
    proxy: {
        '^/report/': {
            target: BaseUrl,
            changeOrigin: true,
        },
        '^/weixin/': {
            target: BaseUrl,
            changeOrigin: true,
        },
        '^/source/': {
            target: `${BaseUrl}/sumdoo_cloud`,
            changeOrigin: true,
        },
    },
};
