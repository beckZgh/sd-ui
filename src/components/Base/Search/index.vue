<template>
    <el-input
        style="width: 240px;"
        prefix-icon="el-icon-search"
        clearable
        :placeholder="placeholder"
        :value="value"
        v-bind="$attrs"
        @input="$emit('input', $event)"
    />
</template>

<script>
export default {
    name: 'BaseSearch',
    props: {
        value: {
            type: [ String, Number ],
            default: '',
        },
        placeholder: {
            type: String,
            default: '输入搜索...'
        }
    }
}
</script>

