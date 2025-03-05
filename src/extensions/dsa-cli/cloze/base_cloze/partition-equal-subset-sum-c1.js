
var initMemo = (nums, subSetSum) => new Array((nums.length + 1)).fill()/* Space O(N) */
    .map(() => new Array((subSetSum + 1)).fill(null));                     /* Space O(M) */

var getSum = (nums, sum = 0) => {
    for (const num of nums) (sum += num);/* Time O(N) */

    return sum;
}
var dfs = (nums, index, subSetSum, memo) => {
    // TODO Base cases when the subset sum is 0

    // TODO Base cases when the subset sum is less than 0 or the index is 0 or the subset sum is less than 0
    

    const hasSeen = (memo[index][subSetSum] !== null);
    if (hasSeen) return memo[index][subSetSum];

    const difference = (subSetSum - nums[(index - 1)]);

    const left = dfs(nums, (index - 1), difference, memo);
    const right = dfs(nums, (index - 1), subSetSum, memo);

    memo[index][subSetSum] = (left || right);
    return memo[index][subSetSum];
}

/**
 * DP - Top Down
 * Matrix - Memo
 * Time O(N * M) | Space O(N * M)
 * https://leetcode.com/problems/partition-equal-subset-sum/
 * @param {number[]} nums
 * @return {boolean}
 */
canPartition = (nums) => {

    const isEmpty = nums.length === 0;
    if (isEmpty) return false;

    const sum = getSum(nums);                 /* Time O(N) */

    const isEven = ((sum % 2) === 0);
    if (!isEven) return false;

    const subSetSum = (sum >> 1);
    const memo = initMemo(nums, subSetSum);        /*               | Space O(N * M) */
    const index = (nums.length - 1);

    return dfs(nums, index, subSetSum, memo);/* Time O(N * M) | Space O(N * M) */
}


class PartitionEqualSubsetSum {


    solve(nums) {
        return canPartition(nums);
    }
}

module.exports = { Problem: PartitionEqualSubsetSum };