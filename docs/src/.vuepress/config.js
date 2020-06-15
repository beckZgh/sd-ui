const path = require('path');

module.exports = {
    base: process.env.NODE_ENV === 'production' ? '/sumdoo_pos/docs/dist/' : '/',
    title: 'Sumdoo_POS项目文档',
    dest: path.resolve(__dirname, '../../dist'),
    markdown: {
        lineNumbers: false, // 代码块显示行号
    },
    themeConfig: {
        sidebar: 'auto', // 自动生成侧边栏
        sidebar: {
            '/dev/': [
                {
                    title: '开发手册',
                    collapsable: false, //是否展开
                    children: [['', '约定']],
                },
            ],
        },
    },
};
