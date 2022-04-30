declare interface Window {
	arweaveWallet: {
		connect: (permissions: string[], info: { name?: string; logo?: string }) => Promise<void>;
		getActiveAddress: () => Promise<string>;
	};
}
