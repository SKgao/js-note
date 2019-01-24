/**
 * 各排序算法的JS实现
 */


// 判断是否为数组
var isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]'
}

var testArr = [100, 37, 348, 838, 93, 6, 77, 3, 44, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 48]

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
console.log('bubbleSort______>', bubbleSort(testArr))

/*===================== 选择排序 ==========================*/
var selectionSort

// 最稳定的排序算法之一
selectionSort = function (arr) {
    var len = arr.length
    var minIdx = 0
    for (var i = 0; i < len - 1; i++) {
        minIdx = i
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j  // 找到最小数位置
            }
        }
        var temp = arr[i]
        arr[i] = arr[minIdx]
        arr[minIdx] = temp
    }
    return arr
}
console.log('selectionSort___>', selectionSort(testArr))


/*===================== 插入排序 ==========================*/
var insertionSort // 类似于扑克牌发牌后的整理排序

// 第一种
// 通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入
insertionSort = function (arr) {
    if (isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
            var temp = arr[i]
            var j = i - 1
            while (j >= 0 && arr[j] > temp) {
                arr[j + 1] = arr[j]
                j--
            }
            arr[j + 1] = temp
        }
        return arr
    } else {
        console.error('Parameter must be an array')
    }
}

// 第二种
// 查找插入位置时使用二分查找的方式
insertionSort = function (arr) {
    if (isArray(arr)) {
        var len = arr.length
        for (var i = 0; i < len; i++) {
            var temp = arr[i]
            var left = 0
            var right = i - 1
            while (left <= right) {
                var middle = (left + right) / 2 | 0
                if (temp < arr[middle]) {
                    right = middle - 1
                } else {
                    left = middle + 1
                }
            }
            for (var j = i - 1; j >= left; j--) {
                arr[j + 1] = arr[j]
            }
            arr[left] = temp
        }
        return arr
    } else {
        console.error('Parameter must be an array')
    }
}
console.log('insertionSort___>', insertionSort(testArr))


/*===================== 希尔排序 ==========================*/
var shellSort

// 是简单插入排序的改进版；它与插入排序的不同之处在于，它会优先比较距离较远的元素。希尔排序又叫缩小增量排序。
shellSort = function (arr) {
    var len = arr.length
    var gap = 1
    while (gap < len / 5) { // 自定义间隔段
        gap = gap * 5 + 1
    }
    for (gap; gap > 0; gap = Math.floor(gap / 5)) {
        for (var i = gap; i < len; i++) {
            var temp = arr[i]
            for (var j = i- gap; j >= 0 && arr[j] > temp; j -= gap) {
                arr[j + gap] = arr[j]
            }
            arr[j + gap] = temp
        }
    }
    return arr
}
console.log('shellSort_______>', shellSort(testArr))

/*===================== 快速排序 ==========================*/
var quickSort

// 1.在数据集之中，选择一个元素作为"基准"（pivot）。
// 2.所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
// 3.对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
quickSort = function (arr) {
    if (isArray(arr)) {
        var len = arr.length
        if (len <= 1) {
            return arr
        }
        var pivotIndex = Math.floor(len / 2)
        var pivot = arr.splice(pivotIndex, 1)[0]
        var left = []
        var right = []
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] < pivot) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return quickSort(left).concat([pivot], quickSort(right))
    } else {
        console.error('Parameter must be an array')
    }
}


/*===================== 归并排序 ==========================*/
var mergeSort

// 1.把长度为n的输入序列分成两个长度为n/2的子序列；
// 2.对这两个子序列分别采用归并排序；
// 3.将两个排序好的子序列合并成一个最终的排序序列
mergeSort = function (arr) {
    var len = arr.length
    if (len <= 1) {
        return arr
    }
    var middle = ~~(len / 2)
    var left = arr.slice(0, middle)
    var right = arr.slice(middle)
    return merge(mergeSort(left), mergeSort(right))
}

var merge = function (left, right) {
    var result = []
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift())
        } else {
            result.push(right.shift())
        }
    }
    return result.concat(left, right)
}
console.log('mergeSort_______>', mergeSort(testArr))

/*===================== 计数排序 ==========================*/
var countingSort

// 1. 找出待排序的数组中最大和最小的元素；
// 2. 统计数组中每个值为i的元素出现的次数，存入数组C的第i项；
// 3. 对所有的计数累加（从C中的第一个元素开始，每一项和前一项相加）；
// 4. 反向填充目标数组：将每个元素i放在新数组的第C(i)项，每放一个元素就将C(i)减去1。

countingSort = function (arr) {
    var len = arr.length
    var B = []
    var C = []
    var min = arr[0]
    var max = arr[0]
    // 获取数组最大值、最小值，并找出数组每项的出现次数
    for (var i = 0; i < len; i++) {
        min = Math.min(min, arr[i])
        max = Math.max(max, arr[i])
        C[arr[i]] = C[arr[i]] ? C[arr[i]] + 1 : 1
    }
    // 将计数逐项累加
    for (var j = min; j < max; j++) {
        C[j + 1] = (C[j] || 0) + (C[j + 1] || 0)
    }
    // 反向填充数组
    for (var k = len - 1; k >= 0; k--) {
        B[C[arr[k]] - 1] = arr[k]
        C[arr[k]]--
    }
    return B
}
console.log('countingSort____>', countingSort(testArr))

/*===================== 桶排序 ==========================*/
var bucketSort

// 1.设置固定空桶数
// 2.将数据放到对应的空桶中
// 3.将每个不为空的桶进行排序
// 4.拼接不为空的桶中的数据，得到结果
bucketSort = function (arr, bucketSize) {
    if (arr.length < 2) {
        return arr
    }
    var len = arr.length
    var arrMin = arr[0]
    var arrMax = arr[0]
    for (var i = 0; i < len; i++) {
        arrMin = Math.min(arrMin, arr[i])
        arrMax = Math.max(arrMax, arr[i])
    }

    var BUCKET_SIZE = bucketSize || 10
    var space = (arrMax - arrMin + 1) / BUCKET_SIZE
    var buckets = []
    for (var j = 0; j < len; j++) {
        var idx = Math.floor((arr[j] - arrMin) / space)
        if (buckets[idx]) {
            var k = buckets[idx].length - 1
            while (k >= 0 && buckets[idx][k] > arr[j]) {
                buckets[idx][k + 1] = buckets[idx][k]
                k--
            }
            buckets[idx][k + 1] = arr[j]
        } else {
            buckets[idx] = []
            buckets[idx].push(arr[j])
        }
    }

    var res = []
    var n = 0
    while (n < BUCKET_SIZE) {
        if (buckets[n]) {
            res = res.concat(buckets[n])
        }
        n++
    }

    return res
}

console.log('bucketSort______>', bucketSort(testArr))

/*===================== 堆排序 ==========================*/
var heapSort

// 交换数组元素
var swap = function (arr, i, j) {
    var temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
    return arr
}

var shiftDown = function (arr, i, length) {
    var temp = arr[i]
    for (var j = i * 2 + 1; j < length; j = j * 2 + 1) {
        if (j + 1 < length && arr[j] < arr[j + 1]) {
            j++
        }
        if (temp < arr[j]) {
            swap(arr, i, j)
            i = j
        } else {
            break
        }
    }
}

heapSort = function (arr) {
    var len = arr.length
    for (var i = Math.floor(len / 2 - 1); i >= 0; i--) {
        shiftDown(arr, i, len)
    }

    for (var j = len - 1; j > 0; j--) {
        swap(arr, 0, j)
        shiftDown(arr, 0, j)
    }
    return arr
}

console.log('heapSort________>', heapSort(testArr))

/*===================== 基数排序 ==========================*/
var radixSort

// 适用范围：
// 1. 数据范围较小
// 2. 每个数值要大于等于0
/**
 * @param arr 数组
 * @param maxDigit 最大位数
 */
radixSort = function (arr, maxDigit) {
    var mod = 10
    var dev = 1
    var counter = []
    for (var i = 0; i < maxDigit; i++, dev *= 10, mod *= 10) {
        for (var j = 0; j < arr.length; j++) {
            var bucket = parseInt((arr[j] % mod ) / dev)
            if (counter[bucket] === null) {
                counter[bucket] = []
                counter[bucket].push(arr[j])
            }
        }
        var pos = 0
        for (var k = 0; k < counter.length; k++) {
            var value
            if (counter[k]) {
                while ((value = counter[k].shift()) !== null) {
                    arr[pos++] = value
                }
            }
        }
    }
    return arr
}

console.log('radixSort_______>', radixSort(testArr, 2))
console.log('quickSort_______>', quickSort(testArr))
export default {
    bubbleSort,         // 冒泡排序
    selectionSort,      // 选择排序
    insertionSort,      // 插入排序
    shellSort,          // 希尔排序
    quickSort,          // 快速排序
    mergeSort,          // 归并排序
    countingSort,       // 计数排序
    bucketSort,         // 桶排序
    heapSort,           // 堆排序
    radixSort           // 基数排序
}