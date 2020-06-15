const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
const initConf = require('./project.config.js');
const env = process.env;

const NODE_ENV = env.NODE_ENV;
const VUE_APP_PUBLIC_PATH = env.VUE_APP_PUBLIC_PATH;
const VUE_APP_USE_DLL = env.VUE_APP_USE_DLL;
const conf = transInitConf(initConf);

let vueConfig = {
    publicPath: VUE_APP_PUBLIC_PATH, // 部署应用包时的基本 URL
    outputDir: 'dist', // 生产环境构建文件的目录
    assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的目录
    indexPath: 'index.html', // index.html的输出路径,相对于outputDir
    filenameHashing: true, // 生成的静态资源包含hash以便更好的控制缓存
    lintOnSave: false, // 开发环境下保存代码时检查语法。
    runtimeCompiler: false, // 设置为true,可在Vue组件使用 template 选项 (会增加 10kb 的运行编译器包)
    transpileDependencies: [], // Babel显示转译一些依赖,默认忽略 node_modules 中的文件
    productionSourceMap: false, // 关闭生产模式生成 map
    devServer: {
        // 开发模式
        open: false, // 不自动打开浏览器
        overlay: {
            // 设置日志提示等级
            warnings: false, // 提示日志不打断构建
            errors: true, // 异常日志打断构建
        },
        proxy: conf.proxy, // 请求代理
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src'),
                ...conf.alias,
            },
        },
    },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/styles/mixin.scss";`,
            },
        },
    },
    chainWebpack(config) {
        // 使用 svg-loader
        useSvgSpriteLoader(config);

        if (NODE_ENV === 'development') {
            !!VUE_APP_USE_DLL && useDLL(config);
        } else {
            splitChunks(config); // 分割代码
            !!conf.cdn && useCDN(config, conf.cdn);
        }
    },
};

// 转换初始化配置
function transInitConf(conf) {
    const defConf = {
        cdn: null,
        scss: {},
        alias: {},
        proxy: {},
    };

    return { ...defConf, ...conf };
}

// 拼接路径
function resolve(dir) {
    return path.join(__dirname, dir);
}

// 使用 DLL
function useDLL(config) {
    console.log(chalk.green('\n 已开启 VUE_APP_USE_DLL \n'));

    config
        .plugin('dll')
        .use(webpack.DllReferencePlugin, [
            { manifest: path.resolve(__dirname, 'public/dll/mainfest.json') },
        ])
        .end();

    config.plugin('html').tap(args => {
        args[0].mainfest = `/dll/_dll_vendor.js`;
        return args;
    });
}

// 使用 CDN
function useCDN(config, CDN) {
    console.log(chalk.green('\n 已配置 CDN \n'));

    config.externals(CDN.externals);
    config.plugin('html').tap(args => {
        args[0].cdn = { css: CDN.css, js: CDN.js };
        return args;
    });
}

// 使用 svg-icon
function useSvgSpriteLoader(config) {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end();
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]',
        })
        .end();
}

function splitChunks(config) {
    config.optimization.splitChunks({
        chunks: 'all',
        minChunks: 1,
        cacheGroups: {
            libs: {
                name: 'chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 30,
                minChunks: 1,
                chunks: 'initial',
            },
            common: {
                name: 'chunk-commons',
                minChunks: 2,
                priority: 20,
            },
        },
    });
    config.optimization.runtimeChunk(true);
}

module.exports = vueConfig;
