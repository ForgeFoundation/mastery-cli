class SingleNumber {

    /**
     * https://leetcode.com/problems/single-number/
     * Time O(N) | Space O(1)
     * @param {number[]} nums
     * @return {number}
     */
    singleNumber = function (nums, xor = 0) {

        // TODO flip the bits each number and return which number went unflipped

        return xor;
    };


    solve(nums) {
        return this.singleNumber(nums);
    }
}


module.exports = { Problem: SingleNumber };