/**
 * 防抖函数简易实现
 * 防抖原理：多次触发事件，一定在n毫秒后执行，在n毫秒内触发将不再执行
 * 应用场景：
 *  1. 频繁的触发浏览器窗户事件。包括 window.resize、window.scroll 等
 *  2. 频繁的触发键盘事件。包括 keyup、keydown 等
 *  3. 频繁的触发鼠标事件。包括 mousemove、mouseout、mouseenter 等
 */

var debounce

// 简易版实现
debounce = function (func, wait) {
    var timer = null
    return function () {
        var context = this
        var args = arguments
        timer && clearTimeout(timer)
        timer = setTimeout(function () {
            func.apply(context, args)
        }, wait)
    }
}


// 控制立即执行参数、并返回执行函数的返回值
// 因为setTimeout执行func是异步的，始终return undefined
// immediate参数为true的情况下，result才会取到结果
debounce = function (func, wait, immediate) {
    var timer = null
    var result
    return function () {
        var context = this
        var args = arguments
        timer && clearTimeout(timer)
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timer
            timer = setTimeout(function () {
                timer = null
            }, wait)
            if (callNow) result = func.apply(context, args)
        } else {
            timer = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }
        return result
    }
}