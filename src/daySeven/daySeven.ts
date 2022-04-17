import * as readInput from '../readInput';

const horizontalPositions = readInput.string(__dirname)
	.join(',')
	.split(',')
	.map(Number);

const median = horizontalPositions.sort((a, b) => a - b)[horizontalPositions.length >> 1];

const fuelUsed = horizontalPositions.reduce((sum, position) => sum + Math.abs(position - median), 0);

console.log(fuelUsed);