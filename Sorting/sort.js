/**
 * 各排序算法的JS实现
 */


/*===================== 冒泡排序 ==========================*/
var bubbleSort

// 第一种
// 每两个元素一一进行对比，调整错误位置
bubbleSort = function (arr) {
    var len = arr.length
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
        }
    }
    return arr
}

// 第二种
// 记录最后交换的位置
bubbleSort = function (arr) {
    var i = arr.length - 1
    while (i > 0) {
        var pos = 0
        for (var j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j
                var temp = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = temp
            }
        }
        i = pos
    }
    return arr
}

export default bubbleSort

/*===================== 选择排序 ==========================*/
var selectionSort

// 最稳定的排序算法之一
selectionSort = function (arr) {
    var len = arr.length
    for (var i = 0; i < len - 1; i++) {
        var minIdx = i
        for (var j = i + 1; j < length; j++) {
            if (arr[j] > arr[j + 1]) {
                minIdx = j
            }
        }
        var temp = arr[i]
        arr[i] = arr[minIdx]
        arr[minIdx] = temp
    }
    return arr
}

export default {
    bubbleSort,
    selectionSort
}