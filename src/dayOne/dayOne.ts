import readInput = require('../readInput');

const depths = readInput.number(__dirname);

const slidingWindows = depths.flatMap((depth, index) => {
	return (depths?.[index + 2] === undefined)
		? []
		: [depth + depths[++index] + depths[++index]];
})

const numberOfIncreases = slidingWindows.reduce((count, window, index) => count + ((window > slidingWindows?.[--index]) ? 1 : 0), 0);

console.log(numberOfIncreases);