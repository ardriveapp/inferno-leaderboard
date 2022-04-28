import { validateWalletAddress } from '@utils';

describe('validateWalletAddress', () => {
	it("returns true if it's a valid address", () => {
		const validAddresses = [
			'-------------------------------------------',
			'___________________________________________',
			'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
			'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
			'0000000000000000000000000000000000000000000',
			'0123456789012345678901234567890123456789012',
			'g1hzNXVbh2M6LMQSUYp7HgkgxdadYqYEfw-HAajlms0',
		];

		validAddresses.forEach((address) => {
			expect(validateWalletAddress(address)).toEqual(true);
		});
	});

	it("returns false if it's an invalid address", () => {
		const invalidAddressesSize = ['', '-', 'g1hzNXVbh2M6LMQSUYp7HgkgxdadYqYEfw-HAajlms01'];
		const invalidAddresses = '!@#$%^&*()+=~`{[}]\\|;:\'"<,>.?/'.split('').map((char) => char.repeat(43));

		[...invalidAddresses, ...invalidAddressesSize].forEach((address) => {
			expect(validateWalletAddress(address)).toEqual(false);
		});
	});
});
