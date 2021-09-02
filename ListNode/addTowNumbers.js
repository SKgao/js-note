class ListNode {
    constructor(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

// 两数之和
const addTwoNumbers = function(l1, l2) {
    let head = null;
    let tail = null;
    let curry = 0;

    while(l1 || l2) {
        const v1 = l1 ? l1.val : 0
        const v2 = l2 ? l2.val : 0;
        const sum = v1 + v2 + curry;
        if (!head) {
            head = tail = new ListNode(sum % 10);
        } else {
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        curry = Math.floor(sum / 10);
        l1 = l1 ? l1.next : null;
        l2 = l2 ? l2.next : null;
    }

    if (curry > 0) {
        tail.next = new ListNode(curry);
    }

    return head;
}