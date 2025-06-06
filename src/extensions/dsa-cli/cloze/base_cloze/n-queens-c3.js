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
                // TODO Check if the queen can be placed in the current position by calculating `hasQueen`
                
                if (hasQueen) continue;

                backTrack(board, n, row, col, colSet, posDiagSet, negDiagSet, moves);
            }

            return moves
        }

        const backTrack = (board, n, row, col, colSet, posDiagSet, negDiagSet, moves) => {
            colSet.add(col);
            posDiagSet.add(row + col);
            negDiagSet.add(row - col);
            board[row][col] = "Q";

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