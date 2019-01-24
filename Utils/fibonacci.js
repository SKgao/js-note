/**
 * 斐波那契数列
 * @param {number} n
 */
var fibonacci

// 正常递归版本
// 性能低下，容易爆栈
var fibonacci1 = function (n) {
    if (n === 0) {
        return 0
    } else if (n === 1) {
        return 1
    } else {
        return fibonacci1(n - 1) + fibonacci1(n - 2)
    }
}


// for 循环版本
fibonacci = function (n) {
    var last = 1
    var last2 = 0
    var current = last
    for (var i = 1; i <= n; i++) {
        last2 = last
        last = current
        current = last + last2
    }
    return current
}

/*===================== 优秀的解决方案 ==========================*/
// 去除重复计算的递归版本
// n做递减运算，前两位数字做递增（斐波那契数列的递增）
fibonacci = function (n) {
    function _fib(n, a, b) {
        if (n === 0) {
            return a
        } else {
            return _fib(n - 1, b, a + b)
        }
    }
    return _fib(n, 0, 1)
}

// 使用记忆函数优化正常递归版本
var memozi = function (fn) {
    var cache = {}
    return function (n) {
        if (cache[n] == null) {
            cache[n] = fn(n)
            return cache[n]
        } else {
            return cache[n]
        }
    }
}

var cacheFib = memozi(fibonacci1)