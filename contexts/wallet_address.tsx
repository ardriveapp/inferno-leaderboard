import { Dispatch, useState, createContext, SetStateAction, ReactNode } from 'react';

type WalletContextType = [string, Dispatch<SetStateAction<string>>];
const contextDefaultValue: WalletContextType = ['', () => {}];
const WalletContext = createContext<WalletContextType>(contextDefaultValue);

export const WalletContextProvider = ({ children }: { children: ReactNode }) => {
	const [walletAddress, setWalletAddress] = useState('');

	return <WalletContext.Provider value={[walletAddress, setWalletAddress]}>{children}</WalletContext.Provider>;
};

export default WalletContext;
