export const validateWalletAddress = (address: string): boolean => {
	const regex = new RegExp('^[a-zA-Z0-9_-]{43}$');
	return regex.test(address);
};
