import { formatWalletAddress } from '@utils';

describe('formatWalletAddress', () => {
	it('returns a text containing only the first and last 5 characters of a given wallet', () => {
		const inputToExpectedOutputMap = new Map<string, string>([
			['De9IoP7_Yrb3TVOGXt3sxCNJmikxvOE6E5nqbWn0Xdw', 'De9Io...n0Xdw'],
			['cYaACU6XlLuHfNLdvS_Udsh1_hI9auhQOc-ixyAlLN0', 'cYaAC...AlLN0'],
			['7VMWcLfDJ_VRhyVCtUJl0xMxtsoEWfC7PAQFN0ELSKg', '7VMWc...ELSKg'],
		]);

		inputToExpectedOutputMap.forEach((output, input) => {
			expect(formatWalletAddress(input)).toEqual(output);
		});
	});
});
