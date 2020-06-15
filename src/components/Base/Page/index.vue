<template>
    <div :class="$pageClass">

        <header v-if="pageTitle || $slots.header" class="page-wrap_header">
            <template v-if="showBack">
                <div class="page-wrap_header-back"
                    @click="_back">
                    <i class="el-icon-back" />
                    <span>
                        返回
                    </span>
                </div>
            </template>
            <h2 class="page-wrap_header-title">
                <slot name="title" :title="title">
                    {{ pageTitle }}
                </slot>
            </h2>
            <base-row
                class="page-wrap_header-right"
                :align="headerAlign"
            >
                <slot name="header" />
            </base-row>
        </header>

        <div v-if="$slots.tip || tip" class="page-wrap_tip">
            <slot name="tip" >
                <base-tip :msg="tip" />
            </slot>
        </div>

        <menu v-if="$slots.menu" :class="$menuClass">
            <slot name="menu" />
        </menu>

        <menu v-if="$slots.rowMenu" :class="$menuClass">
            <base-row>
                <slot name="rowMenu" />
            </base-row>
        </menu>

        <section
            :class="$mainClass"
            :style="{
                'background-color': !baseMain && mainBg || '',
            }"
        >
            <slot />
        </section>

        <footer v-if="$slots.footer" class="page-wrap_footer">
            <slot name="footer" />
        </footer>

    </div>
</template>

<script>

let timer;
export default {
    name: 'BasePage',
    props: {
        noScroll: {
            type: Boolean,
            default: true
        },
        baseMain: {
            type: Boolean,
            default: false
        },
        baseMenu: {
            type: Boolean,
            default: false
        },
        mode: {
            type: String,
            default: 'flex'
        },
        showBack: {
            type: Boolean,
            default: false,
        },
        showLine: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            default: ''
        },
        headerAlign: {
            type: String,
            default: 'right'
        },
        tip: {
            type: [String, Array],
            default: ''
        },
        mainBg: {
            type: String,
            default: '#fff'
        }
    },
    data() {
        return {
            pageTitle: this.title,
        }
    },
    computed: {
        $pageClass(){
            const mode     = this.mode;
            const tip      = this.tip;
            const noScroll = this.noScroll;
            const showLine = this.showLine;
            return [
                'page-wrap',
                mode==='flex' && '--flex',
                noScroll===false && '--noScroll',
                !tip && showLine && '--order',
            ];
        },
        $menuClass(){
            return [
                'page-wrap_menu',
                this.baseMenu===true && 'no-style'
            ];
        },
        $mainClass(){
            const baseMain = this.baseMain;
            return [
                'page-wrap_main',
                baseMain===true && 'no-style'
            ];
        },
        $tip(){
            const tip = this.tip;
            if (typeof tip==='string') return [tip];

            const  hasMsg = this.tip.some(item=> !!item);
            return hasMsg && tip || [];
        }
    },
    created(){
        const meta = this.$route.meta || {};
        this.pageTitle = this.title || meta.title || '';
    },
    mounted(){
        this.setAppViewHeight();
    },
    methods: {
        _back(){
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }

            let $router = this.$router;
            let path = $router.currentRoute.fullPath;
            $router.go(-1);

            timer = setTimeout(function(){
                if (path === $router.currentRoute.fullPath) $router.go(-1);
            },100);
        },
        setAppViewHeight(){
            const viewEl = this.$parent && this.$parent.$parent && this.$parent.$parent.$el;
            if(!viewEl) return;

            const name = viewEl.classList && viewEl.classList.item(0) || '';
            if(!name || name!=='app-view') return;

            if( this.noScroll===false ){
                viewEl.style.height    = '100%';
                viewEl.style.minHeight = 0;
            } else {
                viewEl.style.height    = '100%';
                viewEl.style.minHeight = '100%';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page-wrap {
    min-height: 100%;
    padding: 0 20px 20px;
    box-sizing: border-box;
    background-color: #EFF3F7;

    &_header {
        display: flex;
        padding: 15px 0;
        height: 61px;
        min-height: 61px;
        box-sizing: border-box;

        &-back {
            position: relative;
            line-height: 30px;
            margin-right: 30px;
            cursor: pointer;

            & > i,
            & > span {
                transition: all .3s;
                color: #000;
            }

            &::after {
                content: "";
                position: absolute;
                width: 1px;
                height: 16px;
                right: -15px;
                top: 50%;
                transform: translateY(-50%);
                background-color: #dcdfe6;
            }
        }

        &-title {
            line-height: 30px;
            font-size: 18px;
            margin-right: 20px;
            font-weight: bold;
            color:#606266;
            padding-left: 5px;
        }

        &-right {
            flex: 1;
        }
    }

    &_tip,
    &_menu {
        margin-bottom: 15px;
    }

    &_main {
        padding: 20px;
    }

    &_footer {
        margin-top: 15px;
    }

    ::v-deep .el-button[large] {
        min-width: 90px;
    }

    .app-view {
        min-height: 100%;
    }
}

.page-wrap.--flex {
    display: flex;
    flex-direction: column;

    .page-wrap_main {
        flex: 1;
        border-radius: 3px;
    }
}

.page-wrap.--noScroll {
    height: 100%;

    .page-wrap_main {
        overflow-y: auto;
        overflow-x: hidden;
    }

    .app-view {
        height: 100%;
    }
}

.page-wrap.--order {
    .page-wrap_header {
        border-bottom: 1px solid #cadbe6;
        margin-bottom: 15px;
    }
}

.page-wrap_menu.no-style {
    margin: 0;
}

.page-wrap_main.no-style {
    padding: 0;
    background: transparent;
}
</style>
