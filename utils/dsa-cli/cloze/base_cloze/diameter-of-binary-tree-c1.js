class DiameterOfBinaryTreer{

    /**
     * https://leetcode.com/problems/diameter-of-binary-tree/
     * TIme O(N) | Space O(H)
     * @param {TreeNode} root
     * @return {number}
     */
    solve(root, max = [0]) {


        const diameterOfTree = (root, max) => {
            // TODO Run dfs unless is the base case
        }

        const dfs = (root, max) => {
            const left = diameterOfTree(root.left, max);
            const right = diameterOfTree(root.right, max);

            const diameter = left + right;
            max[0] = Math.max(max[0], diameter);

            const height = Math.max(left, right);

            return height + 1;
        }


        diameterOfTree(root, max);
        return max[0];
    };

}


module.exports = { Problem: DiameterOfBinaryTree };
