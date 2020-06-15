<template>
    <el-scrollbar
        :wrap-class="['base-scrollbar', className]"
        :style="{ 'height': height }"
    >
        <slot />
    </el-scrollbar>
</template>

<script>
export default {
    name: 'BaseScrollBox',
    props: {
        height: {
            type: String,
            default: '100%'
        },
        className: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scopde>
.base-scrollbar {
    overflow-x: hidden!important;

    /* 滚动容器  */
    .el-scrollbar,
    .el-scrollbar__view {
        height: 100%;
    }

    .scrollbar-wrapper{
        overflow-x: hidden!important;
    }

    /* 横向滚动条 */
    .el-scrollbar__bar.is-horizontal {
        display: none;
    }
    /* 纵向滚动条 */
    .el-scrollbar__bar.is-vertical {
        right: 0px;
    }
}
</style>
