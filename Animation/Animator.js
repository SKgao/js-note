/*
 * 动画函数封装
 */
function Animator(duration, update, easing) {
    this.duration = duration
    this.update = update
    this.easing = easing
}

Animator.prototype = {
    /*
     * @param options = {begin, update, end}
     */
    start: function(options) {
        options = options || {}

        var startTime = Date.now()
        var duration = this.duration
        var update = this.update
        var easing = this.easing
        var begin = options.begin // 动画开始之前事件
        var end = options.end     // 动画结束之后事件

        if (begin) {
            begin.call(this)
        }

        requestAnimationFrame(function step() {
            var p = (Date.now - startTime) / duration

            if (p < 1.0) {
                // 播放当前帧下一帧
                update.call(this, easing ? easing(p) : p, p)
                requestAnimationFrame(step)
            } else {
                var loop = false
                // 是否要循环播放
                if (typeof end === 'function') {
                    // loop if end return false
                    loop = end.call(this) === false
                } else {
                    // 继续循环
                    loop = end === false
                }

                if (!loop) {
                    // 不循环，则播放完p = 1.0的那一帧
                    update.call(this, easing ? easing(1.0) : 1.0, 1.0)
                } else {
                    // 开始播放下一个循环周期
                    p -= 1.0
                    startTime += duration
                    step(easing ? easing(p) : p, p)
                }
            }
        })
    }
}

if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
    module.exports = {
        Animator: Animator
    }
} else if (typeof define === 'function' && define.amd) {
    define(function () {
        return Animator
    })
} else {
    window.Animator = Animator
}