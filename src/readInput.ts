import fs = require('fs');

/**
 * Read a specified file and return it as a \<string[]>
 * @param {string} dirname The directory of the input file to read
 * @param {boolean} [isGrouped=false] Whether the input file is grouped by newlines
 * @returns {string[]} The read file as a \<string[]>
 */
export const string = (dirname: string, isGrouped = false): string[] => {
	const input = fs.readFileSync(`${dirname}\\input.txt`, { encoding: 'utf-8', flag: 'r' })
		.trim();

	return (isGrouped)
		? input.split('\n\n')
		: input.split('\n');
};

/**
 * Read a specified file and return it as a \<number[]>
 * @param {string} dirname The directory of the input file to read
 * @param {boolean} [isGrouped=false] Whether the input file is grouped by newlines
 * @returns {number[]} The read file as a \<number[]>
 */
export const number = (dirname: string, isGrouped = false): number[] => string(dirname, isGrouped).map(Number);