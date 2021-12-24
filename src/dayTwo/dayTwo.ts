import readInput = require('../readInput');

type CommandInstruction = 'forward' | 'down' | 'up';
type Command = [CommandInstruction, number];

const AIM_COMMANDS = {
	'down': 1,
	'up': -1,
};

const commands: Command[] = readInput.string(__dirname)
	.map(command => command.split(' '))
	.map(([instruction, value]) => <Command>[<CommandInstruction>instruction, Number(value)]);

const submarinePosition = {
	horizontal: 0,
	depth: 0,
	aim: 0,
};

commands.forEach(([instruction, value]) => {
	if (instruction === 'forward') {
		submarinePosition.horizontal += value;
		submarinePosition.depth += (submarinePosition.aim * value);
	}

	else if (Object.keys(AIM_COMMANDS).includes(instruction)) submarinePosition.aim += (value * AIM_COMMANDS[instruction]);
});

console.log(submarinePosition.horizontal * submarinePosition.depth);