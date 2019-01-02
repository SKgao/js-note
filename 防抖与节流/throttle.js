/**
 * 节流函数简易实现
 * 节流原理：设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期
 */

var throttle

// 简易版实现1--时间戳版本
// 事件触发后会立即执行，停止触发后无法再执行
throttle = function (func, wait) {
    var previous = 0
    return function () {
        var context = this
        var args = arguments
        var now = +new Date()
        if (now - previos > wait) {
            fn.apply(context, args)
            previous = now
        }
    }
}

// 简易版实现2--定时器版本
throttle = function (func, wait) {
    var timer = null
    return function () {
        var context = this
        var args = arguments
        if (!timer) {
            timer = setTimeout(function () {
                timer = null
                func.apply(context, args)
            }, wait)
        }
    }
}

// 结合版本
throttle = function (func, wait) {
    var context
    var args
    var previous = 0
    var timer = null
    var later = function () {
        previous = +new Date()
        timer = null
        func()
    }
    var throttled = function () {
        var now = +new Date()
        var remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining> wait) {
            if (timeout) {
                clearTimeout(timer)
                timer = null
            }
            previous = now
            func.apply(context, args)
        } else if (!timeout) {
            timeout = setTimeout(later, remaining)
        }
    }
    return throttled
}