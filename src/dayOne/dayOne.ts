import readInput = require('../readInput');

const depths = readInput.number(__dirname);

const numberOfIncreases = depths.reduce((count, depth, index) => count + ((depth > depths?.[--index]) ? 1 : 0), 0);

console.log(numberOfIncreases);