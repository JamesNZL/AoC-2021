import readInput = require('../readInput');

const [rawNumbers, ...rawBoards] = readInput.string(__dirname, true);

const numbers = rawNumbers.split(/,/g).map(Number);

const boards = rawBoards.map(rawBoard => {
	return rawBoard.split(/\n/g)
		.map(row => {
			return row.split(/(?<=\d) +/g)
				.map(Number);
		});
});

/**
 * Check if all numbers in any of the rows of the specified \<number[][]> exist in `drawnNumbers`
 * @param {number[][]} board The board \<number[][]> to check
 * @param {number} drawnNumbers The \<number[]> of drawn numbers
 * @returns {boolean} Whether any of the rows contain only drawn numbers
 */
const rowsMatch = (board: number[][], drawnNumbers: number[]): boolean => board.some(row => row.every(number => drawnNumbers.includes(number)));

/**
 * Transpose a board \<number[][]>
 * @param {number[][]} board The board \<number[][]> to transpose
 * @returns {number[][]} The transposed board
 */
const transposeBoard = (board: number[][]): number[][] => board[0].map((_, columnIndex) => board.map(row => row[columnIndex]));

/**
 * Check if the specified board \<number[][]> satisfies bingo
 * @param {number[][]} board The board \<number[][]> to check
 * @param {number[]} drawnNumbers The \<number[]> of drawn numbers
 * @returns {boolean} Whether the board contains a bingo
 */
const checkIfBingo = (board: number[][], drawnNumbers: number[]): boolean => rowsMatch(board, drawnNumbers) || rowsMatch(transposeBoard(board), drawnNumbers);

/**
 * Calculate the score for a specified bingo \<number[][]> board
 * @param {number[][]} board The board whose score to calculate
 * @param {number[]} drawnNumbers The \<number[]> of drawn numbers
 * @returns {number} The score of the board
 */
const calculateScore = (board: number[][], drawnNumbers: number[]): number => {
	const lastNumber = <number>drawnNumbers.at(-1);
	const sumOfUnmarked = board.flat()
		.filter(number => !drawnNumbers.includes(number))
		.reduce((sum, number) => sum + number, 0);

	return lastNumber * sumOfUnmarked;
};

for (let index = 0; index < numbers.length; index++) {
	for (const board of boards) {
		const drawnNumbers = numbers.slice(0, index + 1);

		if (checkIfBingo(board, drawnNumbers)) {
			if (boards.length === 1) console.log(calculateScore(board, drawnNumbers));

			boards.splice(boards.indexOf(board), 1);
		}
	}
}