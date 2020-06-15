const path = require('path');
const webpack = require('webpack');
const package = require('./package.json');

/**
 * 模块映射路径
 */
const map = {
    vue: 'vue/dist/vue.esm.js',
};

/**
 * css 文件不能被打包成库引用
 */
const vendor = [];
Object.keys(package.dependencies).forEach(item => {
    if (item.endsWith('.css')) return;

    vendor.push(map[item] ? map[item] : item);
});

module.exports = {
    /**
     * 声明开发模式,有些库会依赖该环境变量,加载对应环境的代码
     * 例如: vue 检测是生产模式,则调试 Vue-devtool 工具会不工作
     */
    mode: 'development',
    entry: {
        vendor,
    },
    /**
     * 解决工具提示,无法加载某些库的 map 文件
     */
    devtool: 'inline-source-map',
    optimization: {
        minimize: true,
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'public/dll/'),
        library: '_dll_[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'public/dll/mainfest.json'),
        }),
    ],
};
