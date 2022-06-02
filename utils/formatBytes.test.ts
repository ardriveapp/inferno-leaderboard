import { formatBytes } from '@utils';

describe('The formatBytes function ', () => {
	describe('returns the properly formatted byte count description ', () => {
		const inputToExpectedOutputMap = new Map<number, string>([
			[0, '0'],
			[768, '768 Bytes'],
			[999, '999 Bytes'],
			[1000, '1 KB'],
			[999999, '999.999 KB'],
			[1000000, '1 MB'],
			[99999999, '99.999 MB'],
			[100000000, '100 MB'],
			[100001000, '100.001 MB'],
			[Number.MAX_SAFE_INTEGER, '9007199.254 GB'],
		]);

		inputToExpectedOutputMap.forEach((expectedOutput, input) => {
			it(`'${expectedOutput}' when the byte count input is ${input}`, () => {
				expect(formatBytes(input)).toEqual(expectedOutput);
			});
		});
	});

	// // TODO?: Should these next four cases even happen?
	it('works with Bytes represented as a decimal', () => {
		expect(formatBytes(23.999)).toEqual('23.999 Bytes');
	});

	it('works with byte count represented as a negative integer', () => {
		expect(formatBytes(-12)).toEqual('-12 Bytes');
	});

	it('does not round or convert large negative byte counts', () => {
		expect(formatBytes(-57138495792)).toEqual('-57138495792 Bytes');
	});
});
