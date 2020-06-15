
<template>
    <div v-if="$msgList.length" class="base-msg">
        <p v-for="(item,index) in $msgList"
            :key="index"
            class="base-msg_text"
            v-html="item" />
        <div v-if="showClose" class="base-msg_close">
            <i class="el-icon-close" />
        </div>
    </div>
</template>

<script>
export default {
    name: "BaseTip",
    props: {
        msg: {
            type: [String, Array],
            default: ''
        },
        safe: {     // 安全模式,设置为true,不进行校验
            type: Boolean,
            default: false,
        },
        showClose: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        $msgList(){
            if (this.safe) return this.msg;

            const msg = this.msg;
            if (typeof msg==='string') return [msg];

            const  hasMsg = this.msg.some(item=> !!item);
            return hasMsg && msg || [];
        }
    }
}
</script>

<style lang='scss' scoped>
.base-msg {
    position: relative;
    padding: 5px 30px 5px 10px;
    border-radius: 2px;
    border:1px solid rgb(151, 199, 255);
    background: rgb(229, 240, 255);

    &_text {
        font-size: 12px;
        line-height: 22px;
        color: #000;
    }

    &_close {
        position: absolute;
        top: 0; right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        cursor: pointer;

        & > i {
            font-size: 16px;
            transition: all .3s;
        }

        &:hover {
            color: rgb(64, 158, 255);

            & > i {
                transform: rotate(90deg);
            }
        }
    }

}
</style>
