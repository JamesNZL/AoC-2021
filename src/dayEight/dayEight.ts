import * as readInput from '../readInput';

const SEGMENT_LENGTHS = <const>{
	0: 6,
	1: 2,
	2: 5,
	3: 5,
	4: 4,
	5: 5,
	6: 6,
	7: 3,
	8: 7,
	9: 6,
};

const SEGMENTS_TO_MATCH = <const>[1, 4, 7, 8];

const entries = readInput.string(__dirname)
	.map(entry => entry.split('|'));

const lengthsToMatch = SEGMENTS_TO_MATCH.map(segment => SEGMENT_LENGTHS[segment]);

const appearances = entries.reduce((count, [, output]) => {
	const outputs = output.split(' ');

	const matchesLength = outputs.filter(value => (<number[]>lengthsToMatch).includes(value.length));

	return count += matchesLength.length;
}, 0);

console.log({ appearances });