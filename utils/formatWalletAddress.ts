const formatWalletAddress = (wallet: string): string => {
	const first5Chars = wallet.slice(0, 5);
	const last5Chars = wallet.slice(-5);

	return `${first5Chars}...${last5Chars}`;
};

export default formatWalletAddress;
