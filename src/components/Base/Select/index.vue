<template>
    <el-select
        v-bind="$attrs"
        :value="value"
        @change="$emit('change', $event)"
    >
        <el-option
            v-for="item in options"
            :key="item[prop.value]"
            :label="item[prop.label]"
            :value="item[prop.value]"
        />
    </el-select>
</template>

<script>
export default {
    name: 'BaseSelect',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        placeholder: {
            type: String,
            default: '请选择...'
        },
        options: {
            type: Array,
            default: () => [],
        },
        prop: {
            type: Object,
            default: () => {
                return {
                    label: 'label',
                    value: 'value',
                }
            },
        }
    }
}
</script>

<style>

</style>
