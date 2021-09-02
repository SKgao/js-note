class ListNode {
    constructor(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

// 删除链表中重复元素
const deleteDuplicates = function(head) {
    let cur = head;
    while (cur !== null && cur.next !== null) {
        if (cur.val === cur.next.val) {
            cur.next = cur.next.next;
        } else {
            cur.next = cur.next;
        }
    }
    return head;
}