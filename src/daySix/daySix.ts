import readInput = require('../readInput');

const CONSTANTS = {
	REPRODUCTION_DELAY: 6,
	INITIAL_DELAY: 2,
};

const ITERATIONS = 80;

let fishTimers = readInput.string(__dirname)
	.join(',')
	.split(',')
	.map(Number);

for (let i = 0; i < ITERATIONS; i++) {
	fishTimers = fishTimers.flatMap(timer => {
		if (--timer === -1) return [CONSTANTS.REPRODUCTION_DELAY, CONSTANTS.REPRODUCTION_DELAY + CONSTANTS.INITIAL_DELAY];
		else return [timer];
	});
}

console.log(fishTimers.length);