class GasStation {


    /**
     * https://leetcode.com/problems/gas-station/
     * Time: O(n)
     * @param {number[]} gas
     * @param {number[]} cost
     * @return {number}
     */
    canCompleteCircuit = function (gas, cost) {
        let netDistance = 0;
        let res = 0;

        // TODO Checks if theres enough gas to complete a cycle
        
        
        // Finds the first appearence of a positive netDistance, if the cycle can't
        // be completed (netDistance < 0), starts cycle again @ the next positive netDistance value.
        for (let i = 0; i < gas.length; i++) {
            netDistance += gas[i] - cost[i];

            if (netDistance < 0) {
                netDistance = 0;
                res = i + 1;
            }
        }

        return res;
    };


    solve(gas, cost) {
        return this.canCompleteCircuit(gas, cost);
    }
}


module.exports = { Problem: GasStation };