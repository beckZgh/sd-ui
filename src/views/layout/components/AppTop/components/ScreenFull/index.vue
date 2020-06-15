<template>
    <div class="screenfull-wrap">
        <svg-icon
            class="screenfull-svg"
            :icon-class="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"
            @click="_ScreenFull"
        />
    </div>
</template>

<script>
import screenfull from 'screenfull';

export default {
    name: 'ScreenFull',
    data(){
        return {
            isFullScreen: false
        }
    },
    mounted(){
        this.init();
    },
    beforeDestroy(){
        this.destroy();
    },
    methods: {
        _ScreenFull(){
            if(!screenfull.isEnabled){
                this.$message({
                    message: '你的浏览器不支持该功能',
                    type: 'warning'
                });
                return false;
            }

            screenfull.toggle();
        },
        change(){
            this.isFullScreen = screenfull.isFullscreen
        },
        init(){
            if(screenfull.isEnabled){
                screenfull.on('change', this.change)
            }
        },
        destroy(){
            if(screenfull.isEnabled){
                screenfull.off('change', this.change)
            }
        }
    }
}
</script>

<style scoped>
.screenfull-svg {
    display: inline-block;
    cursor: pointer;
    fill: #5a5e66;;
    vertical-align: 10px;
    width: 20px;
    height: 20px;
    vertical-align: 10px;
}
</style>

