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
		yesterday: WalletProperties;
		weekly: WalletProperties;
		lastWeek: WalletProperties;
		total: WalletPropertiesTotal;
	};
};

type RankInformation = {
	address: string;
	rewards: number;
};

type Ranks = {
	hasReachedMinimumGroupEffort: boolean;
	groupEffortRewards: RankInformation[];
	streakRewards: RankInformation[];
};

type RanksTotal = Omit<Ranks, 'hasReachedMinimumGroupEffort'>;

type Data = {
	blockHeight: number;
	timestamp: number;
	PSTHolders: { [wallet: string]: number };
	wallets: Wallets;
	ranks: {
		daily: Ranks;
		weekly: Ranks;
		lastWeek: Ranks;
		total: RanksTotal;
	};
};

export type { Data, Wallets };
