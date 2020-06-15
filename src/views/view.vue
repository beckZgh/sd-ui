<template>
    <div class="app-view" style="height: 100%;">
        <!-- 需要缓存的页面 -->
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="$includes">
                <router-view v-if="$route.meta && $route.meta.keepAlive" :key="$router.fullpath" />
            </keep-alive>
        </transition>

        <transition name="fade-transform" mode="out-in">
            <!-- 不需要缓存的页面 -->
            <router-view v-if="!$route.meta || !$route.meta.keepAlive" :key="$router.fullpath" />
        </transition>
    </div>
</template>

<script>
export default {
    computed: {
        $includes() {
            return this.$store.getters.keepAliveRoutes || [];
        },
    },
    watch: {
        $route(to, from) {
            if (to.name && to.meta.keepAlive) {
                if (!this.$includes.includes(to.name)) {
                    this.$store.dispatch('keepalive/addKeepAliveRoute', to.name);
                }
            }
        },
    },
};
</script>
