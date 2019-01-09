### 浅克隆--shallowCopy

浅克隆的新对象跟原对象，两者任何一方被修改，数据会相互影响。

1. 基本类型的浅copy， 一般直接赋值就ok
```
    const a = 'a'
    const b = a
    const c = 1
    const d = c
```

2. 数组的浅copy， 可以利用数组的concat, slice, [...], 遍历等
```
    const a = [1, 2, 3]
    const b = a.slice()
    const c = a.concat([])
    const d = [...a]
```

3. 对象的浅copy， 可以用Oject.assign(), {...}, 遍历等
```
    const objA = {a: 1, b: {c: 2}, d: 3}
    const objB = Oject.assign({}, objA)
    const objC = Oject.assign(...objA)
```

-------------------------------------------------

### 深克隆--deepCopy

深克隆的新对象跟原对象，两者完全不相关。保证数据的immutable

1. 普通对象的deepCopy。不能copy对象上的函数
```
const deepCopy = val => JSON.parse(JSON.stringify(val))
```

2. 递归遍历。适用的解决方案，基本符合工作需求。不能处理特殊JS对象, Date、RegExp、DOM对象等
```
const deepCopy = (obj) => {
    var copyObj = {}
    for (let key in obj) {
        // ......
        if (typeof obj[key] === 'object') {
            deepCopy(obj[key])
        }
        // ....
    }

    return copyObj
}
```

3. 完全体deepCopy。通常不太必要，可参考lodash 、underscore的实现  

lodash的实现 [_.cloneDeep()](https://github.com/lodash/lodash/blob/master/.internal/baseClone.js)  

underscore的实现 [__.clone()](https://github.com/jashkenas/underscore/blob/e4743ab712b8ab42ad4ccb48b155034d02394e4d/underscore.js#L1068)

$.extend()主要是针对DOM [jQuery.extend()](https://github.com/jquery/jquery/blob/1472290917f17af05e98007136096784f9051fab/src/core.js#L121)
