class DiameterOfBinaryTreer{

    /**
     * https://leetcode.com/problems/diameter-of-binary-tree/
     * TIme O(N) | Space O(H)
     * @param {TreeNode} root
     * @return {number}
     */
    solve(root, max = [0]) {


        const diameterOfTree = (root, max) => {
            const isBaseCase = root === null;
            if (isBaseCase) return 0;

            return dfs(root, max);
        }

        const dfs = (root, max) => {
            const left = diameterOfTree(root.left, max);
            const right = diameterOfTree(root.right, max);

            const diameter = left + right;
            max[0] = Math.max(max[0], diameter);

            const height = Math.max(left, right);

            return height + 1;
        }

        // TODO Complete the diameterOfTree function, which obtains the diameter of the tree.
        
        // TODO Then return the max 
        
    };

}


module.exports = { Problem: DiameterOfBinaryTree };
