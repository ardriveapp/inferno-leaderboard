interface WalletProperties {
	byteCount: number;
	changeInPercentage: number;
	fileCount: number;
	rankPosition: number;
	tokensEarned: number;
}

type WalletPropertiesTotal = Omit<WalletProperties, 'changeInPercentage'>;

type Wallets = {
	[wallet: string]: {
		daily: WalletProperties;
		weekly: WalletProperties;
		total: WalletPropertiesTotal;
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
		total: Ranks;
	};
};

export type { Data, Wallets };
