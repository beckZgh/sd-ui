<template>
    <div :class="['app-wrapper', { 'is-collapse': $isCollapse }]">
        <aside id="app-aside" class="app-aside">
            <header class="app-logo">
                <svg-icon v-if="$isCollapse" icon-class="cloud" />
                <span v-else>SumdooPos</span>
            </header>
            <sidebar :isCollapse="$isCollapse" />
        </aside>

        <main class="app-main">
            <app-top id="app-top" />
            <app-main id="app-main" />
        </main>

        <el-backtop target=".app-main_view" :bottom="50" />
    </div>
</template>

<script>
import AppTop from './components/AppTop';
import Sidebar from './components/Sidebar';
import AppMain from './components/AppMain';

export default {
    components: { AppTop, AppMain, Sidebar },
    computed: {
        $isCollapse() {
            return this.$store.getters.isCollapse;
        },
    },
};
</script>
