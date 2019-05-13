// promise
function Promise(cb) {
    this.state = 'pending'
    this.resolvedCallback = []
    this.rejectedCallback = []

}

Promise.prototype.then = function (onFulfilled, onRejected) {

}