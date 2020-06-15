<template>
    <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                <span
                    v-if="item.redirect === 'noredirect' || index === levelList.length-1"
                    class="no-redirect"
                >
                    {{ item.meta.title }}
                </span>
                <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<script>
import * as pathToRegexp from 'path-to-regexp';

export default {
    data(){
        return {
            levelList: []
        }
    },
    watch: {
        $route(val){
            this.getBreadcrumb(val.query && val.query.title);
        }
    },
    created(){
        this.getBreadcrumb();
    },
    methods: {
        getBreadcrumb(title){
            this.levelList = this.$route.matched.filter(item => item.name);
        },
        pathCompile(path){
            const { params } = this.$route;

            let toPath = pathToRegexp.compile(path);

            return toPath(params);
        },
        handleLink(item){
            const { redirect, path } = item;
            if(redirect){
                this.$router.push(redirect);
                return;
            }

            this.$router.push(this.pathCompile(path));
        }
    }
};

</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    line-height: 50px;
    font-size: 14px;
    margin-left: 10px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
