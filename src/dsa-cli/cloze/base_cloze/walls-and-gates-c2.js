class WallsAndGates {
    /**
     * https://leetcode.com/problems/walls-and-gates/
     * Time O(ROWS * COLS) | Space O(ROWS * COLS)
     * @param {number[][]} rooms
     * @return {void} Do not return anything, modify rooms in-place instead.
     */
    wallsAndGates = function (rooms) {


        const dfs = (rooms, row, col) => {
            const [rows, cols] = [rooms.length, rooms[0].length];

            for (const [_row, _col] of getNeighbors(row, rows, col, cols)) {
                const isPreviousDistanceGreater = rooms[_row][_col] <= (rooms[row][col] + 1);
                if (isPreviousDistanceGreater) continue;

                rooms[_row][_col] = (rooms[row][col] + 1);

                dfs(rooms, _row, _col);
            }
        }

        var getNeighbors = (row, rows, col, cols) => [[0, 1], [0, -1], [1, 0], [-1, 0]]
            .map(([_row, _col]) => [(row + _row), (col + _col)])
            .filter(([_row, _col]) => (0 <= _row) && (0 <= _col) && (_row < rows) && (_col < cols));


        const [rows, cols] = [rooms.length, rooms[0].length];

        // TODO Iterate over each grid and if the grid is a gate then run the dfs.
        
    }

    solve(rooms) {
        return this.wallsAndGates(rooms);
    }
}


module.exports = { Problem: WallsAndGates };