<template>
    <div>
        <el-form
            ref="el2Form"
            :model="internalForm"
            v-bind="$attrs"
            v-on="$listeners"
            @keyup.enter.native="_keyupEnter"
        >
            <slot
                v-if="isCustom"
                name="custom"
                :scope="{ form: internalForm, fields }"
            />

            <el-row v-else :gutter="20">
                <template v-for="(f, i) in fields">
                    <el-col
                        :key="i"
                        :span="f.span"
                    >
                        <template v-if="f.type !== 'slot'">
                            <form-item
                                v-if="_isRender(f)"
                                :f="f"
                                :form="internalForm"
                            />
                        </template>

                        <slot
                            v-else
                            :name="`form-${f.prop}`"
                            :scope="{ f, form: internalForm }"
                        />

                    </el-col>
                </template>
            </el-row>

        </el-form>
        <div
            v-if="showFormButton"
            :class="[ 'ptb20', $buttonAlign ]"
        >
            <el-button v-if="showCancel" large @click="_cancel">
                {{ cancelText }}
            </el-button>
            <el-button v-if="showReset" large @click="_reset">
                {{ resetText }}
            </el-button>
            <el-button v-if="showSubmit" large type="primary" @click="_submit">
                {{ submitText }}
            </el-button>
        </div>
    </div>
</template>

<script>

import CONFIG_TYPE      from './config/type';
import CONFIG_COMPONENT from './config/component';
import FormItem         from './components/FormItem';

import {
    isFunction,
    isBoolean,
    isObject,
} from '@/utils/validate';

export default {
    name: 'El2Form',
    components: {
        FormItem,
    },
    inheritAttrs: false,
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        // 表单默认数据
        value: {
            type: Object,
            default: () => {}
        },
        // 表单配置
        config: {
            type: Array,
            required: true
        },
        // 自定义映射组件配置
        customComponentConfig: {
            type: Object,
            default: null
        },
        // 自定义子项显示
        isCustom: {
            type: Boolean,
            default: false,
        },
        // 是否显示表单按钮
        showFormButton: {
            type: Boolean,
            default: false,
        },
        // 是否显示取消按钮
        showCancel: {
            type: Boolean,
            default: true,
        },
        // 是否显示重置按钮
        showReset : {
            type: Boolean,
            default: true,
        },
        // 是否显示提交按钮
        showSubmit: {
            type: Boolean,
            default: true,
        },
        // 取消按钮文字
        cancelText: {
            type: String,
            default: '取消'
        },
        // 重置按钮文字
        resetText: {
            type: String,
            default: '重置'
        },
        // 提交按钮文字
        submitText: {
            type: String,
            default: '提交'
        },
        // 按钮排列
        buttonAlign: {
            type: String,
            default: 'center'
        }
    },
    data() {
        return {
            internalForm: {},    // 表单数据
            fields      : [],    // 表单控件
            fieldsMap   : {},    // 表单控件
        }
    },
    computed: {
        $buttonAlign() {
            const val = this.buttonAlign;

            return val === 'center' && 'flex-xc'
                || val === 'left'   && 'flex-xl'
                || val === 'right'  && 'flex-xr'
                || 'flex-xc';
        },
    },
    watch: {
        internalForm(val) {
            this.$emit('change', val);
        },
    },
    created() {

        let form      = {}; // 表单数据
        let fields    = []; // 控件集合
        let fieldsMap = {}; // 控件集合

        this.config.forEach(c => {

            // 获取预设组件默认配置
            let item = {};
            if (c.type !== 'slot' && !this.isCustom) {
                item = this.customComponentConfig
                    && this.customComponentConfig[c.type]
                    && this.customComponentConfig[c.type]
                    || CONFIG_COMPONENT[c.type];
                if (!item) {
                    throw new Error(`${c.type} 未定义!`);
                }
            }

            // 配置中未定义类型，设置初始值
            if (this.value.hasOwnProperty(c.prop)){
                form[c.prop] = this.value[c.prop];
            } else if (CONFIG_TYPE.hasOwnProperty(c.type)) {
                form[c.prop] = this.setDefaultValue(c.type, item.attrs);
            } else {
                form[c.prop] = '';
            }

            // 合并控件配置
            const attrs   = { ...item.attrs, ...c.attrs };

            // 构造数据
            const field = {
                component: item.component,  // 渲染控件
                attrs    ,                  // 渲染控件配置
                colAttrs : c.colAttrs,      // el-col 配置
                itemAttrs: c.itemAttrs,     // form-item 配置
                options  : c.options,       // 含有子项控件配置
                hidden   : c.hidden,        // 是否渲染
                span     : c.span || 24,
                type     : c.type,
                label    : c.label,
                prop     : c.prop,
            };

            fields.push(field);
            fieldsMap[c.prop] = field;
        });

        this.internalForm = form;
        this.fields       = fields;
        this.fieldsMap    = fieldsMap;
    },
    methods: {
        // 是否渲染
        _isRender(f) {
            if (!f.hasOwnProperty('hidden')) return true;
            if (isBoolean(f.hidden))         return f.hidden;
            if (isFunction(f.hidden))        return f.hidden(this.internalForm);

            return true;
        },

        /** 设置预设默认值
         *  type  表单控件类型
         *  attrs 表单控件配置
         */
        setDefaultValue(type, attrs = {}) {

            // 选择框配置了多选
            if (type === 'select' && attrs.multiple) return [];
            if (type === 'slider' && attrs.range   ) return [0, 0];

            return CONFIG_TYPE[type];
        },

        // 取消事件
        _cancel() {
            this.$emit('cancel', this.internalForm);
        },
        // 重置事件
        _reset() {
            this.$refs.el2Form.resetFields();
            this.$emit('rest', this.internalForm);
        },
        // 提交事件
        _submit() {
            this.$refs.el2Form.validate(valid => {
                if (!valid) return;
                this.$emit('submit', this.internalForm);
            });
        },
        // 回车事件
        _keyupEnter() {
            if (this.isCustom) {
                this.$emit('enter');
                return;
            }

            this._submit();
        },

        // 重写el-form 组件实例方法
        /** args: callback: (boolean, object)=>{} */
        validate() {
            this.$refs.el2Form.validate(...arguments);
        },
        /** args: array|string, callback: (errorMessage: string)=>{} */
        validateField() {
            this.$refs.el2Form.validateField(...arguments);
        },
        /** args: none */
        resetFields() {
            this.$refs.el2Form.validate();
        },
        /** args: array|string */
        clearValidate() {
            this.$refs.el2Form.validate(...arguments);
        },
        /** update form */
        updateForm(val) {
            if (!isObject(val)) return;
            this.internalForm = { ...this.internalForm, ...val };
        },
    }
}
</script>
