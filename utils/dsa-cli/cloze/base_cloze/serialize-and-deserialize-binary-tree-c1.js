class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class SerializeAndDeserialize {



    /**
     * Encodes a tree to a single string.
     * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solution/
     * Time O(N) | Space O(H)
     * @param {TreeNode} root
     * @return {string}
     */
    serialize = function (root, result = []) {

        const serial = (root, result) => {
            const isBase = root === null;
            if (isBase) return result.push(null);

            dfsSerialize(root, result);
        }

        const dfsSerialize = (node, result) => {
            // TODO Serialize the node and push it to the result. then do the same in dfs.
            
        };
        serial(root, result);

        return result;
    };


    /**
    * Decodes your encoded data to tree.
    * https://leetcode.com/problems/serialize-and-deserialize-binary-tree/solution/
    * Time O(N) | Space O(H)
    * @param {string} data
    * @return {TreeNode}
    */
    deserialize = function (data) {

        const dfsDeserialize = (val, data) => {
            const node = new TreeNode(val);

            node.left = this.deserialize(data);
            node.right = this.deserialize(data);

            return node;
        }
        const isBaseCase = !data.length;
        if (isBaseCase) return null;

        const val = data.shift();

        const isNull = val === null;
        if (isNull) return null;

        return dfsDeserialize(val, data)
    };


    solve(root) {
        const serialized = this.serialize(root);
        return this.deserialize(serialized);
    }
}


module.exports = { Problem: SerializeAndDeserialize };
