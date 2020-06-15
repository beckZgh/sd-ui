<template>
    <el-form-item
        :prop="f.prop"
        :label="f.label"
        v-bind="f.itemAttrs"
    >
        <template v-if="f.type === 'radio'">
            <el-radio-group
                v-model="form[f.prop]"
                v-bind="f.attrs"
                :disabled="_isDisabled(f.attrs)"
            >
                <template v-for="(item, index) in _options(f.options)">
                    <component
                        :is="f.component"
                        :key="index"
                        v-bind="item"
                    />
                </template>
            </el-radio-group>
        </template>

        <template v-else-if="f.type === 'checkboxGroup'">
            <el-checkbox-group
                v-model="form[f.prop]"
                v-bind="f.attrs"
                :disabled="_isDisabled(f.attrs)"
            >
                <template v-for="(item, index) in _options(f.options)">
                    <component
                        :is="f.component"
                        :key="index"
                        v-bind="item"
                    />
                </template>
            </el-checkbox-group>
        </template>

        <template v-else-if="f.type === 'upload'">
            <el-upload
                v-model="form[f.prop]"
                v-bind="f.attrs"
                :disabled="_isDisabled(f.attrs)"
            >
                <el-button type="primary">点击上传</el-button>
                <small class="db">{{ f.attrs.tip ? f.attrs.tip : ''}}</small>
            </el-upload>
        </template>

        <template v-else>
            <component
                :is="f.component"
                v-model="form[f.prop]"
                :options="_options(f.options)"
                :disabled="_isDisabled(f.attrs)"
                v-bind="f.attrs"
            />
        </template>

    </el-form-item>
</template>

<script>

import {
    isFunction,
    isBoolean,
} from '@/utils/validate';

export default {
    props: {
        f: {
            type: Object,
            required: true,
        },
        form: {
            type: Object,
            required: true,
        }
    },
    methods: {
        _isDisabled(attrs = {}) {
            if (!attrs.hasOwnProperty('disabled')) return false;
            if (isBoolean(attrs.disabled))  return attrs.disabled;
            if (isFunction(attrs.disabled)) return attrs.disabled(this.form);

            return false;
        },
        _options(options) {

            if (isFunction(options)) return options(this.form);

            return options;
        }
    }
};
</script>
