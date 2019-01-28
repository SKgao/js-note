const Vm = (function () {
    // 用来存储订阅者发布的消息
    let uid = 0

    // 订阅发布模式
    class Dep {
        constructor() {
            this.id = uid++
            this.subs = []  // 订阅者数组
        }

        // 触发target上的Watcher的addDep方法
        depend() {
            Dep.target.addDep(this)
        }

        // 添加订阅者
        addSub(sub) {
            this.subs.push(sub)
        }

        // 通知所有Watcher, 触发订阅者的相应逻辑
        notify() {
            this.subs.forEach(e => e.update())
        }
    }
    // 为Dep类设置一个静态属性,默认为null,工作时指向当前的Watcher
    Dep.target = null;

    // 监听对象属性的变化
    class Observe {
        constructor(value) {
            this.value = value
            this.wark(value)
        }

        // 遍历对象属性值，并监听
        wark(value) {
            Object.keys(value).forEach(key => this.convert(key, value[key]))
        }

        convert(key, val) {
            defineReactive(this.value, key, val)
        }
    }


    function defineReactive(obj, key, val) {
        const dep = new Dep()
        // 给当前属性的值添加监听
        let childObj = observe(val)
        // 数据劫持
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: () => {
                // 如果Dep类存在target属性，将其添加到dep实例的subs数组中
                // target指向一个Watcher实例，每个Watcher都是一个订阅者
                if (Dep.target) {
                    dep.depend()
                }
                return val
            },
            set: newVal => {
                if (val === newVal) {
                    return false
                } else {
                    val = newVal
                    // 继续对新值监听
                    childObj = observe(val)
                    // 通知所有订阅者，数据发生改变
                    dep.notify()
                }
            }
        })
    }

    function observe(value) {
        if (value && typeof value === 'object') {
            return new Observe(value)
        } else {
            return false
        }
    }

    class Watcher {
        constructor(vm, expOrFn, cb) {
            this.vm = vm   // 当前VM实例
            this.cb = cb   // 数据变化回调
            this.expOrFn = expOrFn   // 被订阅的数据源
            this.depIds = {}   // hash存储订阅者id, 避免重复的订阅者
            this.val = this.get()
        }

        // 对外暴露的接口，当订阅的数据被更新时，由Dep调用
        update() {
            this.run()
        }

        addDep(dep) {
            // 若没有当前depId,则是新的Watcher, 可添加到dep的subs中
            console.log('dep__>', dep)
            if (!this.depIds.hasOwnProperty(dep.id)) {
                dep.addSub(this)
                this.depIds[dep.id] = dep
            }
        }

        run() {
            const val = this.get()
            if (val !== this.val) {
                this.val = val
                this.cb.call(this.vm, this.val)
            }
        }

        get() {
            // 当前订阅者(Watcher)读取被订阅数据的最新更新后的值时，Dep收集当前订阅者
            Dep.target = this
            const val = this.vm._data[this.expOrFn]
            // 置空用于下一个Watcher使用
            Dep.target = null
            return val
        }
    }


    class Vm {
        constructor(options = {}) {
            this.$options = options
            let data = this._data = this.$options.data

            if (data) {
                // 将所有data最外层代理到Vm实例上
                Object.keys(data).forEach(key => key && this.$proxy(key))
                // 监听数据的变化
                observe(data)
            }
        }

        // 对外暴露的接口，内部主要在指令中使用订阅者
        $watch(expOrFn, cb) {
            new Watcher(this, expOrFn, cb)
        }

        // 设置代理数据
        $proxy(key) {
            Object.defineProperty(this, key, {
                enumerable: true,
                configurable: true,
                get: () => this._data[key],
                set: val => this._data[key] = val
            })
        }
    }

    return Vm
})()