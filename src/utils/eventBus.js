
class EventBus {
    constructor (vue) {
        if(!this.handles) {
            Object.defineProperty(this, 'handles', {
                value: {},
                enumerable: false, // 不允许枚举
            });
        }

        this.Vue = vue;
        this.eventMap = {}; // _uid和EventName的映射
    }

    addEvent (uid, eventName){
        if (!this.eventMap[uid]) this.eventMap[uid] = [];
             this.eventMap[uid].push(eventName);
    }

    $on (eventName, callback, vm){
        // 保存对应事件的回调
        if (!this.handles[eventName]) this.handles[eventName] = [];
             this.handles[eventName].push(callback);

        // 关联当前实例的UID与事件名对应
        if (vm instanceof this.Vue) this.addEvent(vm._uid, eventName);
    }

    $emit(){
        let args      = [...arguments];
        let eventName = args[0];
        let params    = args.slice(1);
        if (this.handles[eventName]) {
            let len = this.handles[eventName].length;
            for (let i = 0; i < len; i++) {
                try {
                    this.handles[eventName][i](...params);
                }catch(error){
                    console.error(error);
                }
            }
        }
    }

    $offByUid(uid){
        try {
            let currentEvents = this.eventMap[uid] || [];
                currentEvents.length && currentEvents.forEach(event => {
                    this.$off(event);
                });
                delete this.eventMap[uid];
        }catch(err){
            console.log(err)
        }
    }

    $off (eventName){
        delete this.handles[eventName];
    }
}

export default {
    install(Vue, option){
        Vue.prototype.$eventBus = new EventBus(Vue)
        Vue.mixin({
            beforeDestroy () {
                // 拦截 beforeDestroy 钩子自动销毁自身所有订阅的事件
                this.$eventBus.$offByUid(this._uid) 
            }
        });
    }
}
