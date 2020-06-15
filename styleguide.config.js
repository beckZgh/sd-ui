const path = require('path');

module.exports = {
    title: '组件文档',
    defaultExample: true, // 是否使用默认样例
    usageMode: 'expand', // 是否展开用法
    exampleMode: 'expand', // 是否展开示例代码
    styleguideDir: 'docs/components', // 打包的目录
    codeSplit: true, // 打包时是否进行分片
    skipComponentsWithoutExample: true, // 是否跳过没有样例的组件
    displayOrigins: true,
    locallyRegisterComponents: true, // 仅在文档示例中注册组件
    getComponentPathLine(componentPath) {
        let name = path.basename(componentPath, '.vue');
        if (name === 'index') {
            const names = componentPath.split(path.sep);
            name = names[names.length - 2];
            if (componentPath.startsWith(`src${path.sep}components${path.sep}Base${path.sep}`)) {
                name = 'Base' + name;
            }
        }
        const dir = path.dirname(componentPath);
        return `import ${name} from '${dir}';`;
    },
    sections: [
        {
            name: '基础组件',
            components: 'src/components/Base/**/*.vue',
        },
        {
            name: '布局组件',
            components: 'src/components/**/*.vue',
            ignore: 'src/components/Base/**/*.vue',
        },
    ],
};
