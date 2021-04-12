// 符合Promise A+规范
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallback = [];
        this.onRejectedCallback = [];

        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onFulfilledCallback.forEach(fn => fn());
            }
        }

        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCallback.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }

    then(onFulfilled, onRejected) {
        typeof onFulfilled === 'function' ? onFulfilled : value => value;
        typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        let promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            }

            if (this.status === PENDING) {
                this.onFulfilledCallback.push(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });

                this.onRejectedCallback.push(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
        });

        return promise2;
    }

    catch(errorCallback) {
        return this.then(null, errorCallback);
    }
}

// 处理promise
function resolvePromise (promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    let called = false;

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then;

            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, (r) => {
                    if (called) return;
                    called = true;
                    reject(r);
                });
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }

}

module.exports = MyPromise;