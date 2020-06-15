<template>
    <el-table
        ref="table"
        class="basic-table"
        v-bind="$attrs"
        :data="rows"
        :stripe="stripe"
        :height="height"
        :highlight-current-row="highlightCurrentRow"
        v-on="$listeners"
    >
        <template v-for="c in cols">
            <template v-if="!c.hide && !c.hidden">
                <el-table-column
                    v-if="c.type === 'index'"
                    :key="c.prop"
                    :align="c.align || 'center'"
                    v-bind="c"
                    type="index"
                />
                <el-table-column
                    v-else-if="c.type === 'selection'"
                    :key="c.prop"
                    :align="c.align || 'center'"
                    v-bind="c"
                    type="selection"
                />
                <el-table-column
                    v-else-if="c.type === 'expand'"
                    :key="c.prop"
                    :align="c.align || 'center'"
                    v-bind="c"
                    type="expand"
                >
                    <template #default="props">
                        <slot name="expand" :props="props" />
                    </template>
                </el-table-column>

                <table-column v-else :key="c.prop" :column="c" />
            </template>
        </template>

        <template #empty>
            <slot name="empty">
                <i class="el-icon-warning"></i>
                暂无数据
            </slot>
        </template>

        <!-- 无限滚动 -->
        <template v-if="$slots.append" #append>
            <slot name="append"></slot>
        </template>
    </el-table>
</template>

<script>
import TableColumn from './components/TableColumn';

export default {
    name: 'BaseTable',
    components: {
        TableColumn,
    },
    inheritAttrs: false,
    props: {
        // 表格行
        rows: {
            type: Array,
            default: () => [],
        },
        // 表格列
        cols: {
            type: Array,
            default: () => [],
        },
        // 斑马纹
        stripe: {
            type: Boolean,
            default: true,
        },
        // 高度
        height: {
            type: [String, Number],
            default: '100%',
        },
        // 高亮当前行
        highlightCurrentRow: {
            type: Boolean,
            default: true,
        },
    },
    methods: {
        clearSelection() {
            this.$refs.table.clearSelection();
        },
        toggleRowSelection() {
            this.$refs.table.toggleRowSelection(...arguments);
        },
        toggleAllSelection() {
            this.$refs.table.toggleAllSelection();
        },
        toggleRowExpansion() {
            this.$refs.table.toggleRowExpansion(...arguments);
        },
        setCurrentRow() {
            this.$refs.table.setCurrentRow(...arguments);
        },
        clearSort() {
            this.$refs.table.clearSort();
        },
        clearFilter() {
            this.$refs.table.clearFilter(...arguments);
        },
        doLayout() {
            this.$refs.table.doLayout();
        },
        sort() {
            this.$refs.table.sort(...arguments);
        },
    },
};
</script>

<style lang="scss" scoped>
.basic-table {
    width: 100%;
    border: none !important;
    height: 100%;

    &::before {
        border: none !important;
        border-radius: 0 !important;
        background-color: transparent !important;
    }
}

.basic-table ::v-deep thead th {
    color: #555;
    background-color: rgba(0, 0, 0, 0.02) !important;
    font-weight: bold;
}

.basic-table ::v-deep .el-table__fixed-right-patch {
    background-color: transparent !important;
}
</style>
