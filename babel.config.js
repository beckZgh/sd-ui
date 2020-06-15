const chalk = require('chalk');

const babel = {
    presets: ['@vue/cli-plugin-babel/preset'],
    plugins: [],
};

const NODE_ENV = process.env.NODE_ENV;
const BABEL_TRANSPILE_MODULES = process.env.BABEL_TRANSPILE_MODULES;

if (NODE_ENV === 'development' && BABEL_TRANSPILE_MODULES === 'true') {
    console.log(chalk.green('\n 已开启 BABEL_TRANSPILE_MODULES \n'));

    const dynamicImportNode = ['dynamic-import-node', { noInterop: true }];
    babel.plugins.push(dynamicImportNode);
}

module.exports = babel;
