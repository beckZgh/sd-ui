<template>
    <div v-if="item.show || (item.meta && item.meta.isLocal)">
        <template
            v-if="
                hasOneShowingChild(item.children, item) &&
                (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                !item.alwaysShow
            "
        >
            <menu-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item
                    :index="resolvePath(onlyOneChild.path)"
                    :class="[{ 'submenu-title-noDropdown': !isNest }]"
                >
                    <menu-item :meta="onlyOneChild.meta" />
                </el-menu-item>
            </menu-link>
        </template>

        <template v-else>
            <el-submenu :index="resolvePath(basePath, item.path)">
                <template v-slot:title>
                    <menu-item :meta="item.meta" />
                </template>
                <sidebar-item
                    v-for="c in item.children"
                    :key="c.path"
                    :item="c"
                    :is-nest="true"
                    :base-path="resolvePath(c.path)"
                    class="nest-menu"
                />
            </el-submenu>
        </template>
    </div>
</template>

<script>
import MenuLink from './Link';
import MenuItem from './Item';
import path from 'path';
import { isExternal } from '@/utils/validate';

export default {
    name: 'SidebarItem',
    components: { MenuLink, MenuItem },
    props: {
        item: {
            type: Object,
            required: true,
        },
        isNest: {
            type: Boolean,
            default: false,
        },
        basePath: {
            type: String,
            default: '',
        },
    },
    data() {
        // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
        // TODO: refactor with render function
        this.onlyOneChild = null;
        return {};
    },
    methods: {
        hasOneShowingChild(children = [], parent) {
            const showingChildren = children.filter(item => {
                if (!item.show && (!item.meta || !item.meta.isLocal)) {
                    return false;
                } else {
                    this.onlyOneChild = item;
                    return true;
                }
            });

            if (showingChildren.length === 1) {
                return false;
            }

            if (showingChildren.length === 0) {
                this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
                return true;
            }

            return false;
        },
        resolvePath(routePath) {
            return (isExternal(routePath) && routePath) || path.resolve(this.basePath, routePath);
        },
    },
};
</script>

<style lang="scss" scoped></style>
