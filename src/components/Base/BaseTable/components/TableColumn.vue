
<script>

export default {
    name: 'TableColumn',
    functional: true,
    props: {
        column: {
            type: Object,
            required: true
        }
    },

    render(h, ctx) {
        function _formatterMethods(type, cellValue) {
            if (type === 'monery') {
                return cellValue.toFixed(2);
            }

            if (type === 'correct') {
                return !!cellValue && '√' || 'X';
            }

            if (type === 'onlyCorrect') {
                return !!cellValue && '√' || '';
            }

            return cellValue;
        }

        let { column } = ctx.props;

        let scopedSlots = {
            default: scope => {
                if (column.render) {
                    return column.render(scope);
                } else if(column.formatter) { // formatter 与 作用域插槽不能同时存在
                    return (
                        <span>
                            {
                                scope.column.formatter(
                                    scope.row,
                                    scope.column,
                                    scope.row[scope.column.property],
                                    scope.$index
                                )
                            }
                        </span>
                    )
                } else {
                    return (
                        <span>
                            {
                                _formatterMethods(
                                    column.formatterMethod,
                                    scope.row[column.prop]
                                )
                            }
                        </span>
                    )
                }
            },
            header: scope => {
                if (column.headerRender) {
                    return column.headerRender(scope);
                } else {
                    return column.label;
                }
            }
        };

        /**
         * 所有列默居中显示
         * 列设置宽度后,默认通过 Tooltip 的方式显示隐藏文字
         */
        if (!column.align) column.align = 'center';
        if ( column.width && column['show-overflow-tooltip']===undefined) {
             column['show-overflow-tooltip'] = true;
        }

        // 多级表头
        if (column.children) {
            return (
                <el-table-column
                    key={column.prop}
                    {...{ attrs: column }}
                >
                    {
                        column.children.map(item => {
                            return (<table-column column={item} />)
                        })
                    }
                </el-table-column>
            )
        } else {
            return (
                <el-table-column
                    key={column.prop}
                    {...{ attrs: column }}
                    {...{ scopedSlots }}
                />
            );
        }
    }
};
</script>
