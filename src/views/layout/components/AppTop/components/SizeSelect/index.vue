<template>
    <el-dropdown trigger="click" @command="_setSize">
        <div>
            <svg-icon class-name="size-icon" icon-class="size" />
        </div>
        <template v-slot:dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    v-for="item in sizeOptions"
                    :key="item.value"
                    :disabled="$size===item.value"
                    :command="item.value"
                >
                    {{ item.label }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script>

export default {
    data() {
        return {
            sizeOptions: [
                { label: "中等", value: "medium" },
                { label: "小号", value: "small" },
                { label: "迷你", value: "mini" }
            ],
        };
    },
    computed: {
        $size(){
            return this.$store.getters.size;
        }
    },
    methods: {
        _setSize(size) {
            this.$ELEMENT.size = size;
            this.$store.dispatch('app/setSize', size);
            this._refreshView();
            this.successMsg('切换大小成功!');
        },
        _refreshView(){
            const { fullPath } = this.$route;
            this.$nextTick(()=>{
                this.$router.replace({
                    path: '/redirect' + fullPath
                });
            });
        }
    }
};
</script>
