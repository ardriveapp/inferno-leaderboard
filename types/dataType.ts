type WalletProperties = {
	byteCount: number;
	changeInPercentage: {
		'24h': number;
		'7d': number;
	};
	fileCount: number;
	rankPosition: number;
	tokensEarned: number;
};

type Wallets = {
	[wallet: string]: {
		daily: WalletProperties;
		weekly: WalletProperties;
		total: WalletProperties;
	};
};

type Ranks = {
	hasReachedMinimumGroupEffort: boolean;
	groupEffortRewards: { [wallet: string]: number };
	streakRewards: { [wallet: string]: number };
};

type Data = {
	blockHeight: number;
	timestamp: number;
	PSTHolders: { [wallet: string]: number };
	wallets: Wallets;
	ranks: {
		daily: Ranks;
		weekly: Ranks;
		lastWeek: Ranks;
	};
};

export type { Data };
