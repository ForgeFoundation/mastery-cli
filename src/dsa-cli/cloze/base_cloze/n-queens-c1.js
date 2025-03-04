class NQueens {

    solveNQueens(n, colSet = new Set(), posDiagSet = new Set(), negDiagSet = new Set()) {


        const dfs = (board, n, colSet, posDiagSet, negDiagSet, row = 0, moves = []) => {
            const isBaseCase = row === n;
            if (isBaseCase) {
                const rows = board.map((_row) => _row.join(''))

                moves.push(rows);

                return moves;
            }

            for (let col = 0; col < n; col++) {
                const hasQueen = colSet.has(col) || posDiagSet.has(row + col) || negDiagSet.has(row - col)
                if (hasQueen) continue;

                backTrack(board, n, row, col, colSet, posDiagSet, negDiagSet, moves);
            }

            return moves
        }

        const backTrack = (board, n, row, col, colSet, posDiagSet, negDiagSet, moves) => {
            
            // TODO Adds the queen to the board

            
            dfs(board, n, colSet, posDiagSet, negDiagSet, (row + 1), moves);

            colSet.delete(col);
            posDiagSet.delete(row + col);
            negDiagSet.delete(row - col);
            board[row][col] = ".";
        }
    
        const board = new Array(n).fill().map(() => new Array(n).fill('.'));

        return dfs(board, n, colSet, posDiagSet, negDiagSet);
    }

    solve(n) {
        return this.solveNQueens(n);
    }
}


module.exports = { Problem: NQueens };