import readInput = require('../readInput');

type WordGrid = string[][];
type ResolvedGrid = string[];

type GridTransformation = (grid: WordGrid) => WordGrid;
type GridResolve = (grid: WordGrid) => ResolvedGrid;

interface GridTransformations {
	TRANSPOSE: GridTransformation;
	REVERSE: GridTransformation;
	DIAGONAL: GridTransformation;
}

enum GridDirections {
	Up = 'UP',
	Down = 'DOWN',
	Left = 'LEFT',
	Right = 'RIGHT',
	UpLeft = 'UP_LEFT',
	DownLeft = 'DOWN_LEFT',
	UpRight = 'UP_RIGHT',
	DownRight = 'DOWN_RIGHT',
}

type GridResolves = {
	[key in GridDirections]: GridResolve;
};

const GRID_TRANSFORMATIONS: GridTransformations = {
	TRANSPOSE(grid) {
		return grid[0].map((_, columnIndex) => grid.map(row => row[columnIndex]));
	},
	REVERSE(grid) {
		return grid.map(row => [...row].reverse());
	},
	DIAGONAL(grid) {
		const height = grid.length;
		const width = grid[0].length;
		const maxLength = Math.max(width, height);

		let elements;
		const returnArray = [];

		for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
			elements = [];

			for (let row = height - 1; row >= 0; --row) {
				const column = k - row;

				if (grid?.[row]?.[column]) elements.push(grid[row][column]);
			}

			if (elements.length > 0) returnArray.push(elements);
		}

		return returnArray;
	},
};

const GRID_RESOLVES: GridResolves = {
	UP(grid) {
		return this.LEFT(GRID_TRANSFORMATIONS.TRANSPOSE(grid));
	},
	DOWN(grid) {
		return this.RIGHT(GRID_TRANSFORMATIONS.TRANSPOSE(grid));
	},
	LEFT(grid) {
		return this.RIGHT(GRID_TRANSFORMATIONS.REVERSE(grid));
	},
	RIGHT(grid) {
		return grid.map(row => row.join(''));
	},
	UP_LEFT(grid) {
		return this.UP_RIGHT(GRID_TRANSFORMATIONS.REVERSE(grid));
	},
	DOWN_LEFT(grid) {
		return this.RIGHT(GRID_TRANSFORMATIONS.REVERSE(GRID_TRANSFORMATIONS.DIAGONAL(grid)));
	},
	UP_RIGHT(grid) {
		return this.RIGHT(GRID_TRANSFORMATIONS.DIAGONAL(grid));
	},
	DOWN_RIGHT(grid) {
		return this.RIGHT(GRID_TRANSFORMATIONS.REVERSE(GRID_TRANSFORMATIONS.DIAGONAL(GRID_TRANSFORMATIONS.REVERSE(grid))));
	},
};

const wordFind = readInput.string(__dirname, true)[0]
	.split('\n')
	.map(str => str.split(' '));

const wordList = readInput.string(__dirname, true)[1]
	.split('\n');

const resolveGrid = (grid: WordGrid, direction: GridDirections): ResolvedGrid => {
	return GRID_RESOLVES[direction](grid);
};

for (const direction of Object.values(GridDirections)) {
	const foundWord = resolveGrid(wordFind, direction).find(str => {
		return str.includes('XE');
		// return str.match(/\wEOW/g) || str.match(/M\wOW/g) || str.match(/ME\wW/g) || str.match(/MEO\w/g);
	});

	if (foundWord) {
		console.log({ word: 'MEOW', foundWord, direction });
	}
}

/* wordList.forEach(word => {
	for (const direction of Object.values(GridDirections)) {
		const foundWord = resolveGrid(wordFind, direction).find(str => str.includes(word));

		if (foundWord) {
			console.log({ word, foundWord, direction });
			break;
		}
	}
}); */

null;