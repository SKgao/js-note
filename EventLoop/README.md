### 事件循环机制

* js为单线程(h5的webworker 暂不讨论), 这个现场拥有唯一的事件循环
* js依靠任务队列(task queue)来决定代码的执行顺序

> 任务队列
* 任务队列包含宏任务、微任务
  * 宏任务 (setTimeout, setInterval, setImmediate)
  * 微任务 (process.nextTick, Promise)

* 事件循环执行
  * 先执行普通任务
  * 再执行微任务
  * 在执行宏任务


> 经初步测试结果如下
##### promise > nextTick > setTimeout > setImmediate
