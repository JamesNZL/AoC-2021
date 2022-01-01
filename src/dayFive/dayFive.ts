import readInput = require('../readInput');

type LineSegment = `${number},${number} -> ${number},${number}`;
const LINE_SEGMENT_REGEX = /^(\d+),(\d+) -> (\d+),(\d+)$/;

interface LineCoordinates {
	x1: number;
	y1: number;
	x2: number;
	y2: number;
}

type Point = [number, number];

const lineSegments = <LineSegment[]>readInput.string(__dirname);

const lines = <LineCoordinates[]>lineSegments.map(lineSegment => {
	const [_, x1, y1, x2, y2] = <RegExpMatchArray>lineSegment.match(LINE_SEGMENT_REGEX);

	return <LineCoordinates>{
		x1: Number(x1),
		y1: Number(y1),
		x2: Number(x2),
		y2: Number(y2),
	};
})
	.filter(({ x1, y1, x2, y2 }) => x1 === x2 || y1 === y2);

/**
 * Construct a \<number[][]> of the specified (rows, columns) size, initialised with values of `0`
 * @param {number} rows The number of rows to construct
 * @param {number} columns The number of columns to construct
 * @returns {number[][]} The constructed (rows, columns) \<number[][]>
 */
const constructDiagram = (rows: number, columns: number): number[][] => [...Array(rows)].map(_ => Array(columns).fill(0));

const [rowIndex, columnIndex] = lines.reduce(([_rowIndex, _columnIndex], { x1, y1, x2, y2 }) => {
	const [xMax, yMax] = [Math.max(x1, x2), Math.max(y1, y2)];

	if (xMax > _rowIndex) _rowIndex = xMax;
	if (yMax > _columnIndex) _columnIndex = yMax;

	return [_rowIndex, _columnIndex];
}, [0, 0]);

const diagram = constructDiagram(rowIndex + 1, columnIndex + 1);

const resolvePoints = ({ x1, y1, x2, y2 }: LineCoordinates): Point[] => {
	const points: Point[] = [[x1, y1]];

	while (x1 !== x2 || y1 !== y2) {
		if (x1 > x2) points.push([--x1, y1]);
		if (x1 < x2) points.push([++x1, y1]);
		if (y1 > y2) points.push([x1, --y1]);
		if (y1 < y2) points.push([x1, ++y1]);
	}

	return points;
};

lines.forEach(({ x1, y1, x2, y2 }) => {
	resolvePoints({ x1, y1, x2, y2 }).forEach(([row, column]) => {
		diagram[row][column]++;
	});
});

const atLeastTwoOverlaps = diagram.flat()
	.reduce((count, overlaps) => count + ((overlaps > 1) ? 1 : 0), 0);

console.log(atLeastTwoOverlaps);