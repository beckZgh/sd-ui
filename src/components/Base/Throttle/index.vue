
<script>
const throttle = function(fn, wait=300, isDebounce, ctx) {
    let timer;
    let lastCall = 0;

    return function (...params) {
        if (isDebounce) {
            if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    fn.apply(ctx, params);
                }, wait);
        } else {
            const now = new Date().getTime();
            if (now - lastCall < wait) return;
            lastCall = now;
            fn.apply(ctx, params);
        }
    }
}

export default {
    name: 'BaseThrottle',
    abstract: true,
    props: {
        time: Number,
        events: String,
        isDebounce: {
            type: Boolean,
            default: false
        },
    },
    created () {
        if(!this.events){
            throw new Error('event must set!');
        }
        this.eventKeys    = this.events.split(',') || [];
        this.originMap    = {};
        this.throttledMap = {};
    },
    render() {
        const vnode = this.$slots.default[0];

        this.eventKeys.forEach((key) => {
            let target = null;
            if(vnode.componentOptions){
                target = vnode.componentOptions.listeners[key];
                vnode.componentOptions.listeners[key] = throttle(target, this.time, this.isDebounce, vnode);
            }else {
                target = vnode.data.on[key];
                vnode.data.on[key] = throttle(target, this.time, this.isDebounce, vnode);
            }
        })

        return vnode;
    }
}
</script>
