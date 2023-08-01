
/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

class TrieNode {
    constructor() {
        this.children = {};
        this.isWord = false;
    }
}


class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    /* Time O(N) | Space O(N) */
    addWord(word, node = this.root) {
        // TODO Complete addWord which just adds the word to the trie. 
        // By looping each letter of the query and creating a new node if it does not exist.
        
        
        // TODO At the end remember to assign the isWord as true.
        
    }

    /* Time O(N) | Space O(N) */
    search(word) {
        return this.dfs(word, this.root, 0);
    }

    dfs(word, node, level) {
        if (!node) return false;

        const isWord = level === word.length;
        if (isWord) return node.isWord;

        const isWildCard = word[level] === '.';
        if (isWildCard) return this.hasWildCard(word, node, level);

        return this.dfs(word, node.children[word[level]], level + 1);
    }

    hasWildCard(word, node, level) {
        for (const char of Object.keys(node.children)) {
            const child = node.children[char];

            const hasWord = this.dfs(word, child, level + 1);
            if (hasWord) return true;
        }

        return false;
    }
}


module.exports = { Problem: WordDictionary };