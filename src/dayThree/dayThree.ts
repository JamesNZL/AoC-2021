import readInput = require('../readInput');

type Rating = 'oxygenGenerator' | 'carbonDioxideScrubber';
type BitCritiera = (countOfOnes: number, countOfZeroes: number) => string;

type RatingMap<T> = {
	[rating in Rating]: T
};

const BIT_CRITERIA: RatingMap<BitCritiera> = {
	oxygenGenerator: (countOfOnes: number, countOfZeroes: number): string => ((countOfOnes >= countOfZeroes) ? '1' : '0'),
	carbonDioxideScrubber: (countOfOnes: number, countOfZeroes: number): string => ((countOfOnes >= countOfZeroes) ? '0' : '1'),
};

const report = readInput.string(__dirname);

/**
 * Count the number of occurences of a specified element in a specified array
 * @param {any[]} array The array to count occurences in
 * @param {any} element The element to count occurences of
 * @returns {number} The number of occurences of `element` in `array`
 */
const countOccurences = (array: any[], element: any): number => {
	return array.reduce((count, _element) => count + ((_element === element) ? 1 : 0), 0);
};

/**
 * Apply a specified \<BitCriteria> to a specified \<string[]> of position bits and return the bit to keep
 * @param {string[]} positionBits A \<string[]> of the single bits at the same index of all binary numbers in the report
 * @param {BitCritiera} bitCriteria The \<BitCriteria> function to apply
 * @returns {string} The bit to keep as per the bit criteria
 */
const applyBitCriteria = (positionBits: string[], bitCriteria: BitCritiera): string => {
	return bitCriteria(countOccurences(positionBits, '1'), countOccurences(positionBits, '0'));
};

const bitLength = report[0].length;

const ratings: RatingMap<string[]> = {
	'oxygenGenerator': [...report],
	'carbonDioxideScrubber': [...report],
};

for (let index = 0; index < bitLength; index++) {
	// Iterate for each required rating
	Object.entries(ratings).forEach(([rating, binaries]) => {
		if (binaries.length === 1) return;

		const positionBits = binaries.map(binary => binary[index]);

		// Apply the respective <BitCriteria> to the position bits at the current index,
		// and filter the rating's binaries array for the numbers which match
		ratings[<Rating>rating] = binaries.filter(binary => {
			return binary[index] === applyBitCriteria(positionBits, BIT_CRITERIA[<Rating>rating]);
		});
	});

	// Break if all the ratings have been found
	if (Object.values(ratings).every(binaries => binaries.length === 1)) break;
}

/**
 * Convert a specified binary string into its decimal number representation
 * @param {string} binary The binary string to convert to decimal
 * @returns {number} The decimal representation of the binary string
 */
const binaryToDecimal = (binary: string): number => parseInt(binary, 2);

const lifeSupportRating = binaryToDecimal(ratings.oxygenGenerator[0]) * binaryToDecimal(ratings.carbonDioxideScrubber[0]);

console.log(lifeSupportRating);