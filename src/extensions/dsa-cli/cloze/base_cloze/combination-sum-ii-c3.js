class CombinationSumII {

    /**
     * https://leetcode.com/problems/combination-sum-ii/
     * Time O(2^N) | Space O(N)
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    combinationSum2 = function (candidates, target) {


        const dfs = (candidates, target, index = 0, combination = [], combinations = []) => {
            const isBaseCase = target < 0;
            if (isBaseCase) return combinations;

            const isTarget = target === 0;
            if (isTarget) {
                if (combination.length) combinations.push(combination.slice());

                return combinations
            }

            for (let i = index; i < candidates.length; i++) {
                const isDuplicate = (index < i) && (candidates[i - 1] === candidates[i]);
                if (isDuplicate) continue;

                backTrack(candidates, target, i, combination, combinations);
            }

            return combinations;
        }

        const backTrack = (candidates, target, i, combination, combinations) => {
            // TODO Complete the backTrack function which adds the current element to the combination and then calls the dfs function.
            // Pops it from the combiantion if found.
            
        }

        candidates.sort((a, b) => a - b)

        return dfs(candidates, target)
    };

    solve(candidates, target) {
        return this.combinationSum2(candidates, target);
    }
}


module.exports = { Problem: CombinationSumII };