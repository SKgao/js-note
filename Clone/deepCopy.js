
var deepCopy

/**
 * 简易版本实现
 */
deepCopy = function (val) {
    return JSON.parse(JSON.stringify(val))
}

/**
 * 递归循环
 */
deepCopy = function (obj) {
    if (typeof obj !== 'object') return obj
    var copyObj = obj instanceof Array ? [] : {}
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            copyObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
        }
    }
    return copyObj
}

export default deepCopy