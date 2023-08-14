
/**
 * Greedy - product
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/maximum-product-subarray/
 * @param {number[]} nums
 * @return {number}
 */
maxProduct = (nums) => {

    // TODO Guard against invalid input of 0 values
    
};


const greedySearch = (nums) => {
    let min = max = product = nums[0];

    for (let num = 1; num < nums.length; num++) {/* Time O(N) */
        const [minProduct, maxProduct] = [(min * nums[num]), (max * nums[num])];

        min = Math.min(maxProduct, minProduct, nums[num]);
        max = Math.max(maxProduct, minProduct, nums[num]);

        product = Math.max(product, max);
    }

    return product;
}


class MaxProductSubArray {


    solve(nums) {
        return maxProduct(nums);
    }
}

module.exports = { Problem: MaxProductSubArray };