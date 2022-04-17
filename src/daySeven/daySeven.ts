import * as readInput from '../readInput';

const horizontalPositions = readInput.string(__dirname)
	.join(',')
	.split(',')
	.map(Number);

const mean = Math.floor(horizontalPositions.reduce((sum, position) => sum + position, 0) / horizontalPositions.length);

const fuelUsed = horizontalPositions.reduce((sum, position) => {
	const deltaPosition = Math.abs(mean - position);
	return sum + ((0.5 * (deltaPosition ** 2)) + (0.5 * deltaPosition));
}, 0);

console.log({ mean, fuelUsed });