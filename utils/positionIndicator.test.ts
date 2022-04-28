import { positionIndicator } from '@utils';

describe('positionIndicator', () => {
	it('returns an ordinal number given a cardinal one', () => {
		const inputToExpectedOutputMap = new Map<number, string>([
			[1, '1st'],
			[2, '2nd'],
			[3, '3rd'],
			[4, '4th'],
			[8, '8th'],
			[11, '11th'],
			[12, '12th'],
			[21, '21st'],
			[22, '22nd'],
			[131, '131st'],
			[133, '133rd'],
		]);

		inputToExpectedOutputMap.forEach((output, input) => {
			expect(positionIndicator(input)).toEqual(output);
		});
	});
});
