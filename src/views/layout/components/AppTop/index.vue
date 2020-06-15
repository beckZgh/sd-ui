<template>
    <div class="app-top">
        <!-- 切换侧边栏按钮 -->
        <hamburger
            id="hamburger-container"
            class="hamburger-container"
            :toggle-click="_toggleSideBar"
            :is-active="$isCollapse"
        >
        </hamburger>

        <!-- 面包屑 -->
        <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

        <div class="right-menu">
            <!-- 页面查询 -->
            <header-search class="right-menu-item" />

            <!-- 全屏图标按钮 -->
            <screen-full id="screenfull" class="right-menu-item hover-effect" />

            <size-select class="right-menu-item hover-effect" />

            <!-- 用户 -->
            <el-dropdown class="avatar-container right-menu-item hover-effect">
                <div class="avatar-wrapper">
                    <img :src="userAvatar" class="user-avatar" />
                    <span class="user-name">
                        {{ $userName }}
                    </span>
                    <i class="el-icon-caret-bottom"></i>
                </div>

                <template v-slot:dropdown>
                    <el-dropdown-menu class="user-dropdown">
                        <router-link class="inlineBlock" to="/user/center">
                            <el-dropdown-item>个人中心</el-dropdown-item>
                        </router-link>
                        <div @click="_logout">
                            <el-dropdown-item divided>
                                退出登录
                            </el-dropdown-item>
                        </div>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import variables from '@/styles/variables.scss';
import Hamburger from './components/Hamburger';
import Breadcrumb from './components/Breadcrumb';
import ScreenFull from './components/ScreenFull';
import HeaderSearch from './components/HeaderSearch';
import SizeSelect from './components/SizeSelect';

export default {
    components: {
        Hamburger,
        Breadcrumb,
        ScreenFull,
        // Guide,
        HeaderSearch,
        SizeSelect,
    },
    data() {
        return {
            userAvatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        };
    },
    computed: {
        $userName() {
            return this.$store.getters.userName || '默认名称';
        },
        $variables() {
            return variables;
        },
        $isCollapse() {
            return !this.$store.getters.isCollapse;
        },
    },
    methods: {
        _toggleSideBar() {
            this.$store.dispatch('app/toggleSideBar');
        },
        _logout() {
            this.$store
                .dispatch('user/logout')
                .then(res => {
                    // 使用该方式,会清除路由纪录
                    window.location.href = '/login';
                })
                .catch(err => {
                    this.$showError(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.app-top {
    position: relative;
    z-index: 99;
    background: #fff;
    height: 50px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    overflow: hidden;

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        padding: 0 15px;
        transition: background 0.3s;

        &:hover {
            background-color: rgba(0, 0, 0, 0.025);
        }
    }

    .right-menu {
        float: right;
        height: 100%;
        line-height: 50px;

        &-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }
    }

    .avatar-container {
        display: inline-block;
        margin-right: 30px;

        .avatar-wrapper {
            display: flex;
            align-items: center;

            .user-name {
                font-size: 14px;
                margin: 0 3px;
            }

            .user-avatar {
                cursor: pointer;
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }

            // .el-icon-caret-bottom {
            //     cursor: pointer;
            //     position: absolute;
            //     right: -10px;
            //     top: 25px;
            //     font-size: 12px;
            // }
        }
    }
}
</style>
