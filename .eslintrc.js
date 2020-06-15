module.exports = {
    extends: ['eslint-config-alloy', 'eslint-config-alloy/vue'],
    parserOptions: {
        parser: 'babel-eslint',
    },
    rules: {
        /**
         * 单 Vue 组件标签排版顺序, 推荐 script -> tempalte -> style
         */
        'vue/component-tags-order': 0,
        /**
         * 函数最大定义参数 5
         */
        'max-params': ['error', 5],
        /**
         * 禁止对函数的参数重新赋值
         */
        'no-param-reassign': 0,
        /**
         * 生产模式禁止打印输出
         */
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        /**
         * 生产模式禁止 debug
         */
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
    overrides: [
        {
            files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
            env: {
                jest: true,
            },
        },
    ],
};
