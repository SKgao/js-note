class ListNode {
    constructor(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

// 合并为有序链表
const mergeTwoLists = function(l1, l2) {
    let head = new ListNode();
    let cur = head;
    while(l1 && l2) {
        if (l1.val <= l2.val) {
            cur.next = l1.val;
            l1 = l1.next;
        } else {
            cur.next = l2.val;
            l2 = l2.next;
        }
        cur = cur.next;
    }
    cur.next = l1 === null ? l2 : l1;
    return head.next;
}