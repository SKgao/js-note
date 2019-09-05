/**
 * Promise
 */

class Promise {
    constructor(excutorCallback) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledArray = [];
        this.rejectedArray = [];

        let resovleFn = result => {
            if (this.status !== 'pending') return;
            let timer = setTimeout(() => {
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledArray.forEach(item => item(this.value));
            }, 0);
        }

        let rejectedFn = reason => {
            if (this.status !== 'pending') return;
            let timer = setTimeout(() => {
                this.status = 'rejected';
                this.value = reason;
                this.rejectedArray.forEach(item => item(this.value));
            }, 0);
        }

        try {
            excutorCallback(resovleFn, rejectedFn);
        } catch (error) {
            rejectedFn(error);
        }
    }


    then(fulfilledCallback, rejectedCallback) {
        typeof fulfilledCallback === 'function' ? fulfilledCallback = result => result : null;
        typeof rejectedCallback === 'function' ? rejectedCallback = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason);
        } : null;

        return new Promise((resolve, reject) => {
            this.fulfilledArray.push(() => {
                try {
                    let v = fulfilledCallback(this.value);
                    v instanceof Promise ? v.then(resolve, reject) : resolve(v);
                } catch (error) {
                    reject(error);
                }
            });

            this.rejectedArray.push(() => {
                try {
                    let v = rejectedCallback(this.value);
                    v instanceof Promise ? v.then(resolve, reject) : resolve(v);
                } catch (error) {
                    reject(error);
                }
            })
        })
    }

    catch(rejectedCallback) {
        return this.then(null, rejectedCallback);
    }

}

module.exports = Promise;