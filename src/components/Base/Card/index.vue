<template>
    <el-card v-bind="$attrs" :class="['base-card', { 'is-scroll': useScroll }]">
        <template v-if="showHeader" #header>
            <slot name="header"></slot>
        </template>

        <template v-if="!showEmptyTip">
            <template v-if="useScroll">
                <base-scroll-box>
                    <div class="base-card_content">
                        <slot></slot>
                    </div>
                </base-scroll-box>
            </template>

            <template v-else>
                <slot></slot>
            </template>
        </template>

        <div v-else class="empty-wrap">
            <slot name="empty">
                <i class="el-icon-info"></i>
                {{ emptyText }}
            </slot>
        </div>
    </el-card>
</template>

<script>
export default {
    name: 'BaseCard',
    props: {
        // 是否显示数据为空时的提示
        showEmptyTip: {
            type: Boolean,
            default: true,
        },
        // 无数据时显示文字
        emptyText: {
            type: String,
            default: '暂无数据',
        },
        // 内部使用滚动组件
        useScroll: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            showHeader: false,
            showFooter: false,
        };
    },
    created() {
        this.$nextTick(() => {
            // 多了一层 el-card 组件，
            const slots = this.$slots;
            if (!slots) return;

            this.showHeader = !!slots.header;
        });
    },
};
</script>

<style lang="scss" scoped>
.base-card {
    height: 100%;
    display: flex;
    flex-direction: column;

    &_content {
        padding: 0 20px 15px;
    }
}

.base-card ::v-deep .el-card__header {
    padding: 15px 20px;
}

.base-card ::v-deep .el-card__body {
    padding: 0;
    position: relative;
    flex: 1;
}

.base-card.is-scroll ::v-deep .el-card__body {
    padding-top: 15px;
    padding-bottom: 15px;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
}

.empty-wrap {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #909399;

    > i {
        margin-right: 5px;
        position: relative;
        top: -1px;
    }
}
</style>
