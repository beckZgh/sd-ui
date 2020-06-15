<template>
    <div
        :class="$rowClass"
        :style="$style"
    >
        <slot />
    </div>
</template>

<script>
export default {
    name: 'BaseRow',
    props: {
        mode: {
            type: String,
            default: 'flex'
        },
        align: {
            type: String,
            default: 'space-between'
        },
        isWrap: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        $justify(){
            let align = this.align;
            let val = align === 'left'    && 'flex-start'
                   || align === 'right'   && 'flex-end'
                   || align === 'between' && 'space-between'
                   || align === 'around'  && 'space-around'
                   || align;

            return val;
        },
        $rowClass(){

            return [
                'base-row',
                this.mode==='flex' && '--flex',
                this.mode==='float' && '--float',
            ]
        },
        $style(){
            if(this.mode!=='flex') return '';

            return {
                'justify-content': this.$justify,
                'flex-wrap': this.isWrap ? 'warp' : 'nowrap'
            };
        }
    }
}
</script>

<style lang="scss" scoped>
.base-row.--flex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.base-row.--float {
    ::v-deep [left] {
        float: left;
    }

    ::v-deep [right] {
        float: right;
    }

    &::after {
        content: '';
        display: table;
        line-height: 0;
        font-size: 0;
        overflow: hidden;
        clear: both;
    }
}
</style>
