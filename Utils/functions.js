/**
 * Array 方法实现
 */

// map 实现
Array.prototype._map = function(fn) {
    const arr = []
    for (let i = 0; i < this.length; i++) {
        // 判断是否为 稀疏数组
        if (this.hasOwnProperty(i)) {
            arr[i] = fn && fn(this[i], i, this)
        }
    }
    return arr
}

// map 实现
Array.prototype._map = function(fn) {
    return this.reduce((sum, cur, i) => {
        return [...sum, fn(cur, i, this)]
    }, [])
}

// filter 实现
Array.prototype._filter = function(fn) {
    const arr = []
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            if (fn && fn(this[i], i, this)) {
                arr.push(this[i])
            }
        }
    }
    return arr
}

// some 实现
Array.prototype._some = function(fn) {
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            if (fn && fn(this[i], i, this)) {
                return true
            }
        }
    }
    return false
}

// every 实现
Array.prototype._every = function(fn) {
    for (let i = 0; i < this.length; i++) {
        if (this.hasOwnProperty(i)) {
            if (!fn || !fn(this[i], i, this)) {
                return false
            }
        }
    }
    return true
}

// reduce 实现
Array.prototype._reduce = function(fn, initValue) {
    let result
    let startIndex
    if (initValue === void 0) {
        for (let i = 0; i < this.length; i++) {
            if (this.hasOwnProperty(i)) {
                startIndex = i
                result = this[i]
            }
        }
    } else {
        result = initValue
    }

    for (let j = ++startIndex || 0; j < this.length; j++) {
        if (this.hasOwnProperty(j)) {
            result = fn(result, this[j], j, this)
        }
    }
    return result
}

// flat 实现
Array.prototype._flat = function() {
    return this.reduce((sum, cur) => {
        return Array.isArray(cur) ? [...sum, ...cur._flat()] : [...sum, cur]
    }, [])
}

// curry 化实现
const curry = function(fn) {
    if (fn.length <= 1) return fn
    const _curry = (...args) => {
        if (fn.length === args.length) {
            return fn(...args)
        } else {
            return (...args2) => {
                return _curry(...args, ...args2)
            }
        }
    }
    return _curry
}