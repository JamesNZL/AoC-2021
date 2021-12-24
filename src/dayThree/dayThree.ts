import readInput = require('../readInput')

const report = readInput.string(__dirname);

/**
 * Count the number of occurences of a specified element in a specified array
 * @param {any[]} array The array to count occurences in
 * @param {any} element The element to count occurences of
 * @returns {number} The number of occurences of `element` in `array`
 */
const countOccurences = (array: any[], element: any): number => {
	return array.reduce((count, _element) => count + ((_element === element) ? 1 : 0), 0)
}

const bitLength = report[0].length;

let [gammaRate, epsilonRate] = ['', ''];

// Calculate the gamma rate and the epsilon rate
for (let index = 0; index < bitLength; index++) {
	const positionBits = report.map(binary => binary[index])

	const countOfOnes = countOccurences(positionBits, '1');
	const countOfZeros = countOccurences(positionBits, '0');

	gammaRate += (countOfOnes > countOfZeros) ? '1' : '0';
	epsilonRate += (countOfOnes > countOfZeros) ? '0' : '1';
}

/**
 * Convert a specified binary string into its decimal number representation
 * @param {string} binary The binary string to convert to decimal
 * @returns {number} The decimal representation of the binary string
 */
const binaryToDecimal = (binary: string): number => parseInt(binary, 2);

const powerConsumption = binaryToDecimal(gammaRate) * binaryToDecimal(epsilonRate);

console.log(powerConsumption);