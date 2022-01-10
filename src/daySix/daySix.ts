import readInput = require('../readInput');

const CONSTANTS = {
	REPRODUCTION_DELAY: 6,
	INITIAL_DELAY: 2,
};

const ITERATIONS = 256;

const fishMap: { [key: number]: number; } = Object.fromEntries(
	[...Array(CONSTANTS.REPRODUCTION_DELAY + CONSTANTS.INITIAL_DELAY + 1).keys()]
		.map(timer => [timer, 0]),
);

readInput.string(__dirname)
	.join(',')
	.split(',')
	.map(Number)
	.forEach(timer => fishMap[timer] = fishMap?.[timer] + 1 || 1);

for (let i = 0; i < ITERATIONS; i++) {
	Object.entries(fishMap).forEach(([timer, count]) => {
		if (Number(timer) === 0) {
			fishMap[CONSTANTS.REPRODUCTION_DELAY] += count;
			fishMap[CONSTANTS.REPRODUCTION_DELAY + CONSTANTS.INITIAL_DELAY] += count;
		}

		else {
			fishMap[Number(timer) - 1] += count;
		}

		fishMap[Number(timer)] -= count;
	});
}

const countOfLanternfish = Object.values(fishMap).reduce((sum, value) => sum + value);

console.log(countOfLanternfish);