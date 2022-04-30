import { useContext, useState } from 'react';

import Logo from '@components/logo';
import WalletModal from '@components/header/wallet_modal';
import TimeframeSelectorDesktop from '@components/header/timeframe_selector_desktop';

import { formatWalletAddress } from '@utils';
import WalletContext from '@contexts/wallet_address';

import { ConnectWalletButton, HeaderWrapper, LeaderboardWrapper, Title } from './header.style';

export const TimeframeNames = {
	weekly: 'Current Week',
	lastWeek: 'Last Week',
	total: 'Total',
};

const Header = (): JSX.Element => {
	const [showModal, setShowModal] = useState(false);
	const [walletAddress, setWalletAddress] = useContext(WalletContext);

	return (
		<>
			<HeaderWrapper>
				<Logo />
				{walletAddress ? (
					<ConnectWalletButton isConnected>{formatWalletAddress(walletAddress)}</ConnectWalletButton>
				) : (
					<ConnectWalletButton onClick={() => setShowModal(true)}>Connect Wallet</ConnectWalletButton>
				)}
			</HeaderWrapper>
			<LeaderboardWrapper as='header'>
				<Title>Leaderboard</Title>
				<TimeframeSelectorDesktop />
			</LeaderboardWrapper>
			<WalletModal
				isOpen={showModal}
				closeModal={() => setShowModal(false)}
				setWalletAddress={setWalletAddress}
			/>
		</>
	);
};

export default Header;
