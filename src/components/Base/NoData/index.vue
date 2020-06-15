<template>
    <div class="no-data"
        :style="{ 'color': color, 'font-size': size }"
    >   
        <slot>
            {{ text }}
        </slot>
    </div>
</template>

<script>

export default {
    name: 'BaseNoData',
    props: {
        text: {
            type: String,
            default: '暂无数据'
        },
        color: {
            type: String,
            default: '#999'
        },
        size: {
            type: String,
            default: '14px'
        }
    }
}
</script>

<style lang='scss' scoped>

.no-data {
    min-height: 42%; 
    display: flex; 
    justify-content: center; 
    align-items: flex-end; 
}

</style>
