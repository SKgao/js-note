setImmediate(() => {
    console.log('immediate1')
    process.nextTick(() => {
        console.log('immediate1_nextTick')
    })

    new Promise((resolve) => {
        console.log('immediate1_promise')
        resolve()
    }).then(() => {
        console.log('immediate1_then')
    })
}, 0)

setTimeout(() => {
    console.log('timeout1')
    process.nextTick(() => {
        console.log('timeout1_nextTick')
    })

    new Promise((resolve) => {
        console.log('timeout1_promise')
        resolve()
    }).then(() => {
        console.log('timeout1_then')
    })
}, 0)


process.nextTick(() => {
    console.log('global1_nextTick')
})
new Promise((resolve) => {
    console.log('global1_promise')
    resolve()
}).then(() => {
    console.log('global1_then')
})


setImmediate(() => {
    console.log('immediate2')
    process.nextTick(() => {
        console.log('immediate2_nextTick')
    })

    new Promise((resolve) => {
        console.log('immediate2_promise')
        resolve()
    }).then(() => {
        console.log('immediate2_then')
    })
}, 0)

setTimeout(() => {
    console.log('timeout2')
    process.nextTick(() => {
        console.log('timeout2_nextTick')
    })

    new Promise((resolve) => {
        console.log('timeout2_promise')
        resolve()
    }).then(() => {
        console.log('timeout2_then')
    })
}, 0)


process.nextTick(() => {
    console.log('global2_nextTick')
})
new Promise((resolve) => {
    console.log('global2_promise')
    resolve()
}).then(() => {
    console.log('global2_then')
})

console.log('---------start-----------\n')

/*
 ____________________________________________________________________________________________________
 测试结果如下：

    global1_promise
    global2_promise
    ---------start-----------

    global1_nextTick
    global2_nextTick
    global1_then
    global2_then
    timeout1
    timeout1_promise
    timeout2
    timeout2_promise
    timeout1_nextTick
    timeout2_nextTick
    timeout1_then
    timeout2_then
    immediate1
    immediate1_promise
    immediate2
    immediate2_promise
    immediate1_nextTick
    immediate2_nextTick
    immediate1_then
    immediate2_then

*/