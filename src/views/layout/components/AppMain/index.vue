<template>
    <!-- <div class="app-main_view"> -->
    <base-scroll-box className="app-main_view">
        <!-- 需要缓存的页面 -->
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="$includes">
                <router-view v-if="$route.meta && $route.meta.keepAlive" />
            </keep-alive>
        </transition>

        <transition name="fade-transform" mode="out-in">
            <!-- 不需要缓存的页面 -->
            <router-view v-if="!$route.meta || !$route.meta.keepAlive" />
        </transition>
    </base-scroll-box>
    <!-- </div> -->
</template>

<script>

export default {
    computed: {
        $includes(){
            return this.$store.getters.keepAliveRoutes || [];
        }
    },
    watch: {
        $route(to, from){
            if( to.name && to.meta.keepAlive ){
                if(!this.$includes.includes(to.name)){
                    this.$store.dispatch('keepalive/addKeepAliveRoute', to.name);
                }
            }
        }
    }
}
</script>

<style lang="scss">
.app-main_view {
    overflow-y: scroll;
}
</style>
