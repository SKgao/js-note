class ListNode {
    constructor(val, next) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}

// 保留链表中没有重复过得元素
const deleteNotSingle = function(head) {
    if (!head || !head.next) {
        return head;
    }

    let dummy = new ListNode();
    dummy.next = head;
    let cur = dummy;

    while(cur.next && cur.next.next) {
        if (cur.next.val === cur.next.next.val) {
            let val = cur.next.val;
            while(cur.next && cur.next.val === val) {
                cur.next = cur.next.next;
            }
        } else {
            cur = cur.next;
        }
    }

    return dummy.next;
}