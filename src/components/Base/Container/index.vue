
<template>
    <div
        :class="['base-container', containerClass]"
        :style="{
            'display': $slots.default ? 'block' : 'flex'
        }"
    >
        <template v-if="!$slots.default">
            <div
                :class="['base-container_left', leftClass]"
                :style="{
                    'background-color' : leftBg,
                    'width': leftW,
                }"
            >
                <slot name="left" />
            </div>
            <div :style="{'width': gutter+'px', 'background-color': gutterBg }" />
            <div
                :class="['base-container_right', rightClass]"
                :style="{
                    'background-color': rightBg,
                    'width': rightW,
                }"
            >
                <slot name="right" />
            </div>
        </template>

        <slot />
    </div>
</template>

<script>

const DEFAULT_BG_COLOR = '#fff';
const OPTIONS = {
    container : '',
    left      : '',
    right     : '',

    leftBg   : DEFAULT_BG_COLOR,
    rightBg  : DEFAULT_BG_COLOR,
};
export default {
    name: 'BaseContainer',
    props: {
        gutter: {
            type: Number,
            default: 0,
        },
        gutterBg: {
            type: String,
            default: ''
        },
        containerClass:{
            type: String,
            default: OPTIONS.container,
        },
        leftClass: {
            type: String,
            default: OPTIONS.left,
        },
        rightClass: {
            type: String,
            default: OPTIONS.right,
        },
        leftBg: {
            type: String,
            default: '#fff'
        },
        rightBg: {
            type: String,
            default: '#fff'
        },
        leftW: {
            type: String,
            default: '',
        },
        rightW: {
            type: String,
            default: '',
        }
    }
}
</script>


<style lang="scss">
.base-container {
    width: 100%;

    &_left,
    &_right {
        border-radius: 3px;
        overflow: hidden;
    }

    &_right {
        flex: 1;
    }
}
</style>
