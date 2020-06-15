
/**
 * 组件映射,单独抽出,可以便于替换或自定义使用组件
 *
 * component 映射组件
 * attrs     组件默认属性
 *
 * 排版
 * 1）支持 slot
 * 2）暂不支持 render
 *
 * 数据处理
 * 1）暂不支持输入/输出格式化
 *
 */
export default {
    // 单选框
    radio: {
        component: 'el2-radio',
    },
    // 多选框,单个
    checkbox: {
        component: 'el2-checkbox',
    },
    // 多选框,一组
    checkboxGroup: {
        component: 'el2-checkbox',
    },
    // 输入框
    input: {
        component: 'el-input',
        attrs: {
            clearable: true,
            placeholder: '请输入',
        }
    },
    number: {
        component: 'el2-number',
    },
    // 计数器
    inputNumber: {
        component: 'el-input-number',
        attrs: {
            min: 0,
            step: 1,
            precision: 2,
        }
    },
    // 选择器
    select: {
        component: 'el2-select',
    },
    // 级联选择器
    cascader: {
        component: 'el-cascader',
    },
    // 开关
    switch: {
        component: 'el-switch',
    },
    // 滑块
    slider: {
        component: 'el-slider',
    },
    // 固定时间选择器
    timeSelect: {
        component: 'el-time-select',
        attrs: {
            pickerOptions: {
                start: '00: 00',
                step : '00: 30',
                end  : '23: 30',
            },
            placeholder: '请选择',
        }
    },
    // 任意时间选择器
    timePicker: {
        component: 'el-time-picker',
        attrs: {
            pickerOptions: {
                selectableRange: '00:00:00 - 23:59:59',
            },
            placeholder: '请选择',
        }
    },
    // 日期选择器
    datePicker: {
        component: 'el-date-picker',
        attrs: {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            placeholder: '请选择',
        }
    },
    // 上传
    upload: {
        component: '',
        attrs: {
            action: '',
            autoUpload: false,
        }
    },
    // 评分
    rate: {
        component: 'el-rate',
    },
    // 颜色选择器
    colorPicker: {
        component: 'el-color-picker',
    },
    // 穿梭框
    transfer: {
        component: 'el-transfer',
    },
};
