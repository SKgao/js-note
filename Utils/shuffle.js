/**
 * 洗牌算法(打乱数组)
 * @param {array} arr
 */
var shuffle

// 错误的洗牌算法。越到数组后位出现概率越高
shuffle = function (arr) {
    return arr.sort(function () {
        return Math.random - 0.5
    })
}

// 经典的洗牌算法
// 每一次循环从前 len - i 个元素里随机一个位置，将这个元素和第 len - i 个元素进行交换，迭代直到 i = len - 1 为止。
shuffle = function (arr) {
    var len = arr.length
    for (var i = 0; i < len - 1; i++) {
        var j = Math.floor(Math.random() * (len - i))
        var temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
    }
    return arr
}

export default shuffle