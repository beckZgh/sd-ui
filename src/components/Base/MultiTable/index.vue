<template>
    <div class="multi-table">
        <div v-if="$slots.header" class="multi-table_header">
            <slot name="header"></slot>
        </div>
        <div class="multi-table_body">
            <div v-if="showMenu || showSearch" class="multi-table_menu">
                <div class="multi-table_menu-left">
                    <slot name="menuLeft" />
                </div>
                <div class="multi-table_menu-right">
                    <base-search
                        v-if="showSearch"
                        v-model="internalSearch"
                        :disabled="!rows.length"
                    />
                    <slot name="menuRight" />
                </div>
            </div>
            <div class="multi-table_body-content">
                <basic-table
                    ref="table"
                    v-bind="$attrs"
                    :rows="$rowx"
                    :cols="$cols"
                    v-on="$listeners"
                >
                    <template #expand="{ props }">
                        <slot name="expand" :props="props" />
                    </template>
                </basic-table>
            </div>
            <div v-if="showPagination" class="multi-table_pagination">
                <basic-pagination
                    :currentPage.sync="internalPage"
                    :pageSize.sync="internalSize"
                    :total="$rows.length"
                />
            </div>
        </div>
        <div v-if="false" class="multi-table_footer">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
import BasicTable from '../BaseTable';
import BasicPagination from '../../Pagination';

export default {
    name: 'MultiTable',
    components: {
        BasicTable,
        BasicPagination,
    },
    inheritAttrs: false,
    props: {
        /** 组件基础配置 */

        // 数据列
        cols: {
            type: Array,
            required: true,
        },
        // 数据行
        rows: {
            type: Array,
            default: () => [],
        },
        // 当前高亮行
        currentHighlightRow: {
            type: Object,
            default: null,
        },
        // 显示菜单集合
        showMenu: {
            type: Boolean,
            default: false,
        },
        // 显示查询控件
        showSearch: {
            type: Boolean,
            default: false,
        },
        // 查询值
        search: {
            type: String,
            default: '',
        },
        // 查询列
        searchColumn: {
            type: [String, Array],
            default: '',
        },
        // 显示分页器
        showPagination: {
            type: Boolean,
            default: true,
        },

        // 使用默认操作项  boolean, Array, Function
        options: {
            type: [Boolean, Array, Function],
            default: true,
        },

        /** 分页器配置 */
        pagination: {
            type: Object,
            default: () => {
                return {
                    page: 1,
                    size: 10,
                };
            },
        },
    },
    data() {
        return {
            internalPage: this.pagination.page || 1,
            internalSize: this.pagination.size || 10,
            internalSearch: this.search,
        };
    },
    computed: {
        $cols() {
            const defOpt = this.options;
            if (!defOpt) return this.cols;

            let defOptions = [
                {
                    circle: true,
                    plain: true,
                    icon: 'el-icon-edit',
                    type: 'primary',
                    mode: 'upt',
                },
                {
                    circle: true,
                    plain: true,
                    icon: 'el-icon-delete',
                    type: 'danger',
                    mode: 'del',
                },
            ];

            // 函数自定义
            if (this.helper.isFunction(defOpt)) {
                const col = defOpt(defOptions, this.transOptToBtn);

                return [...this.cols, col];
            }

            /**
             * 新增或覆盖原有按钮
             * 一个图标按钮算 50px, 文字按钮按 文字的个数 * 5px加上 16px的padding
             */
            if (this.helper.isArray(defOpt)) {
                defOpt.forEach(item => {
                    // 修改默认定义的按钮
                    if (item.mode === 'upt') {
                        defOptions[0] = { ...defOptions[0], ...item };
                    }
                    if (item.mode === 'del') {
                        defOptions[1] = { ...defOptions[0], ...item };
                    }

                    if (!item.mode || (!item.icon && !item.label)) return;

                    let o = { ...item };
                    o.type = o.type || 'primary';
                    o.plain = this.helper.isBoolean(o.plain) ? o.plain : true;
                    o.round = true;

                    defOptions.push(o);
                });
            }

            /**
             * 过滤掉不显示的默认按钮,
             * 动态计算按钮所占宽度
             */
            let totalWidth = 0;
            let list = defOptions.filter(item => {
                if (item.hidden) return false;

                // 图标按钮
                if (item.icon && !item.label) {
                    totalWidth += 50;

                    // 文字按钮
                } else if (item.label && !item.icon) {
                    totalWidth += item.label.length * 15 + 32;

                    // 图标加文字，图标算 30
                } else {
                    totalWidth += item.label.length * 15 + 30 + 32;
                }

                return true;
            });

            // 默认项
            const col = {
                label: '操作',
                width: totalWidth + 'px',
                render: scope => {
                    return (
                        <div>
                            {list.map(item => {
                                return this.transOptToBtn(item, scope);
                            })}
                        </div>
                    );
                },
            };

            return [...this.cols, col];
        },
        $rowx() {
            // 不使用分页器
            if (!this.showPagination) return this.$rows;

            const page = this.internalPage;
            const size = this.internalSize;

            const i = (page - 1) * size;
            const j = i + size;

            return this.$rows.slice(i, j);
        },
        $rows() {
            const val = this.internalSearch.trim();
            if (!val) return this.rows;

            const column = this.searchColumn || '';
            if (!column) return this.rows;

            return this.rows.filter(item => {
                // 查询多个列, 其中列包含即可
                if (Array.isArray(column) && column.length) {
                    return column.some(c => {
                        return item[c].includes(val);
                    });
                } else if (column) {
                    return item[column].includes(val);
                } else {
                    return true;
                }
            });
        },
    },
    watch: {
        search(val) {
            this.internalSearch = val;
        },
        internalSearch(val) {
            this.$emit('update:search', val);
        },
        currentHighlightRow(val) {
            if (!val) return;

            const size = this.internalSize;
            if (this.$rows.indexOf(val) === -1) this.internalSearch = '';
            if (this.$rowx.indexOf(val) === -1) {
                // 当前页不存在,则翻页查找
                const idx = this.$rows.indexOf(val);
                this.internalPage = parseInt(idx / size, 10) + 1;
                console.log('-dix', idx, this.internalPage);
            }

            this.$nextTick(() => {
                this.setCurrentRow(val);
            });
        },
    },
    methods: {
        /** Element 默认方法 */
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
        /**
         * 转换表格操作配置为按钮
         */
        transOptToBtn(item = null, scope) {
            if (!item) return;

            return (
                <el-button
                    circle={item.circle}
                    plain={item.plain}
                    round={item.round}
                    icon={item.icon}
                    type={item.type}
                    vOn:click={() => {
                        this.$emit(item.mode, scope.row, scope.column);
                    }}
                >
                    {item.label}
                </el-button>
            );
        },
    },
};
</script>

<style lang="scss" scoped>
.multi-table {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;

    ::v-deep .el-table__body tr:last-child td {
        border-bottom: none;
    }

    &_menu {
        display: flex;
        align-items: center;
        padding-bottom: 15px;

        &-left {
            flex: 1;
        }
    }

    &_body {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 15px 20px 10px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 4px;
        transition: 0.3s;
        overflow: hidden;

        &.is-never {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        &.is-hover:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }

        &-content {
            flex: 1;
            display: flex;
            height: 100%;
            overflow: hidden;
        }
    }

    &_pagination {
        padding-top: 10px;
        border-top: 1px solid #ebeef5;
    }

    &_footer {
        padding: 15px 20px;
    }

    &_header {
        padding: 15px 20px;
        border-bottom: 1px solid #ebeef5;
    }
}
</style>
