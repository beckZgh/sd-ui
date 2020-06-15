<template>
    <base-scroll-box className="scrollbar-wrapper">
        <el-menu
            mode="vertical"
            :default-active="$route.path"
            :background-color="$variables.menuBg"
            :text-color="$variables.menuText"
            :active-text-color="$variables.menuActiveText"
            :collapse="isCollapse"
            :collapse-transition="false"
            :unique-opened="true"
        >
            <sidebar-item v-for="(r, i) in $routes" :key="i" :item="r" :base-path="r.path" />
        </el-menu>
    </base-scroll-box>
</template>

<script>
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.scss';

export default {
    components: { SidebarItem },
    props: {
        isCollapse: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        $variables() {
            return variables;
        },
        $routes() {
            const { routes, publichRoutes } = this.$store.getters;
            if (routes && routes.length) return routes;

            return publichRoutes.map(item => {
                if (!item.hidden) item.show = true;
                return item;
            });
        },
    },
};
</script>
