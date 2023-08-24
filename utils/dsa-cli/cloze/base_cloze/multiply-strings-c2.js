class MultiplyStrings {

    /**
     * Matrix
     * Time O(N * M) | Space O(N + M)
     * https://leetcode.com/problems/multiply-strings/
     * @param {string} num1
     * @param {string} num2
     * @return {string}
     */
    multiply = (num1, num2) => {



        var initBuffer = (num1, num2) => {
            const size = (num1.length + num2.length);

            return new Array(size).fill(0);/* Space (N + M) */
        }

        var multiplication = (num1, num2, buffer) => {
            for (let i = (num1.length - 1); (0 <= i); i--) {/* Time O(N) */
                for (let j = (num2.length - 1); (0 <= j); j--) {/* Time O(M) */
                    update(num1, i, num2, j, buffer);               /* Space O(N + M) */
                }
            }
        }

        var removeLeadingZero = (buffer) => {
            const isLeadZero = (buffer[0] === 0);
            if (!isLeadZero) return;

            buffer.shift();/* Time O(N + M) | Time O(N + M) */
        }

        var update = (num1, i, num2, j, buffer) => {

            // TODO The current possition current position and previous position. 
            // The current position should be i + j. 
            
            
            // TODO Get the current product and sum it with the buffer.
            
            
            // TODO Get the remainder and value and update the buffer.
            
        }

        var getProduct = (num1, i, num2, j) => {
            const [iNum, jNum] = [Number(num1[i]), Number(num2[j])];

            return (iNum * jNum);
        }
        const isZero = ((num1 === '0') || (num2 === '0'));
        if (isZero) return '0';

        const buffer = initBuffer(num1, num2);/*               | Space (N + M) */

        multiplication(num1, num2, buffer)    /* Time O(N * M) */
        removeLeadingZero(buffer);            /* Time O(N + M) | Time O(N + M)*/

        return buffer.join('');               /* Time O(N + M) | Space O(N + M) */
    };

    solve(num1, num2) {
        return this.multiply(num1, num2);
    }
}


module.exports = { Problem: MultiplyStrings };