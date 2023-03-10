class MergeKSortedList {


    /**
     * https://leetcode.com/problems/merge-k-sorted-lists/
     * Time O(N) | Space O(N)
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    solve(lists) {

        const mergeTwoLists = function (list1, list2) {
            let sentinel = tail = new ListNode(0);

            while (list1 && list2) {
                const canAddL1 = list1.val <= list2.val;
                if (canAddL1) {
                    tail.next = list1;
                    list1 = list1.next;
                } else {
                    tail.next = list2;
                    list2 = list2.next;
                }

                tail = tail.next;
            }

            tail.next = list1 || list2;

            return sentinel.next;
        };


        let previous = null;

        for (let i = 0; i < lists.length; i++) {
            previous = mergeTwoLists(previous, lists[i]);
        }

        return previous;
    };


    /**
     * https://leetcode.com/problems/merge-k-sorted-lists/
     * Time O(N * log(K)) | Space O(N + K)
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    mergeKLists(lists) {


        const getMinHeap = (lists) => {
            const heap = new MinPriorityQueue({ priority: ({ val }) => val });

            for (const node of lists) {
                if (!node) continue;

                heap.enqueue(node);
            }

            return heap;
        }


        const mergeLists = (minHeap) => {
            let sentinel = tail = new ListNode();

            while (!minHeap.isEmpty()) {
                const node = minHeap.dequeue().element;

                tail.next = node;
                tail = tail.next;

                if (!node.next) continue;

                minHeap.enqueue(node.next);
            }

            return sentinel.next;
        }
        const minHeap = getMinHeap(lists);

        return mergeLists(minHeap)
    };

}


module.exports = { Problem: MergeKSortedList };