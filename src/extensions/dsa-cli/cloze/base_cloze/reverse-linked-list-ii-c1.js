class ReverseLinkedListII {
    solve(head, m, n) {
        if (!head) {
            return null;
        }
        
        let cur = head;
        let prev = null;
        // TODO Loop through the list until until left is reached
        while (m > 1) {
            
        }

        const tail = cur;
        const con = prev;

        while (n > 0) {
            const third = cur.next;
            cur.next = prev;
            prev = cur;
            cur = third;
            n--;
        }

        if (con) {
            con.next = prev;
        } else {
            head = prev;
        }

        tail.next = cur;

        return head;
    }
}

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}


module.exports = { Problem: ReverseLinkedListII };
