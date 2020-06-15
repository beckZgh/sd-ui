<template>
    <el-pagination
        v-bind="$attrs"
        :page-sizes="pageSizes"
        :layout="layout"
        :total="total"
        :background="background"
        :page-size.sync="internalPageSize"
        :current-page.sync="internalCurrentPage"
    >
    </el-pagination>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        currentPage: {
            type: Number,
            default: 1
        },
        pageSizes: {
            type: Array,
            default: ()=> [10, 20, 30, 40, 50, 100],
        },
        pageSize: {
            type: Number,
            default: 10
        },
        layout: {
            type: String,
            default: "total, sizes, prev, pager, next, jumper"
        },
        background: {
            type: Boolean,
            default: true
        },
        total: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            internalCurrentPage: this.currentPpage,
            internalPageSize: this.pageSize,
        }
    },
    watch: {
        pageSizes:{
            immediate: true,
            handler(newVal, oldVal) {
                if (Array.isArray(newVal)) {
                    this.internalPageSize = newVal.indexOf(this.pageSize) > -1
                        ? this.pageSize
                        : this.pageSizes[0];
                }
            }
        },
        pageSize: {
            immediate: true,
            handler(val) {
                this.internalPageSize = isNaN(val) ? 10 : val;
            }
        },
        currentPage(val) {
            this.internalCurrentPage = val;
        },
        internalCurrentPage(val) {
            this.$emit('update:currentPage', val);
        },
        internalPageSize(val) {
            this.$emit('update:pageSize', val);
        },
    }
};
</script>
