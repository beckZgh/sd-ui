<template>
    <el-drawer
        ref="drawer"
        :class="['drawer-wrap', { bg: showBackground, pd: showPadding }]"
        :visible.sync="internalVisible"
        :wrapperClosable="wrapperClosable"
        :append-to-body="appendToBody"
        :destroy-on-close="destroyOnClose"
        :size="size"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template #title>
            <slot name="title">
                <span v-if="title">{{ title }}</span>
            </slot>
        </template>

        <slot></slot>
    </el-drawer>
</template>

<script>
export default {
    name: 'BaseDrawer',
    props: {
        title: {
            type: String,
            default: '',
        },
        wrapperClosable: {
            type: Boolean,
            default: false,
        },
        appendToBody: {
            type: Boolean,
            default: false,
        },
        destroyOnClose: {
            type: Boolean,
            default: true,
        },
        size: {
            type: String,
            default: '1000px',
        },
        visible: {
            type: Boolean,
            default: false,
        },
        showBackground: {
            type: Boolean,
            default: true,
        },
        showPadding: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            internalVisible: false,
        };
    },
    watch: {
        internalVisible(val) {
            this.$emit('update:visible', val);
        },
        visible(val) {
            this.internalVisible = val;
        },
    },
    mounted() {
        const $drawer = this.$refs.drawer;
        if (!$drawer) return;

        const el = $drawer.$el;
        if (this.background) {
            if (typeof this.background === 'boolean') {
                el.classList.add('bg');
            } else {
                el.style.background = this.background;
            }
        }
    },
};
</script>

<style lang="scss" scoped>
.drawer-wrap ::v-deep .el-drawer__header {
    margin-bottom: 15px;
    padding-top: 15px;
    outline: none;
}

.drawer-wrap ::v-deep .el-drawer__body {
    display: flex;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
}

.drawer-wrap.bg ::v-deep .el-drawer__body {
    background-color: #eff3f7;
}
.drawer-wrap.pd ::v-deep .el-drawer__body {
    padding: 10px;
}
</style>
