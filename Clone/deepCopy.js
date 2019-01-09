
var deepCopy

/**
 * 简易版本实现
 */
deepCopy = (val) => {
    return JSON.parse(JSON.stringify(val))
}

export default deepCopy