import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';

import Box from '@components/box';
import {
	SidebarWrapper,
	MobileItems,
	DesktopItems,
	SelectorWrapper,
	Selector,
	GroupStatsMobile,
	StatsDesktop,
	FirstRowMobile,
	SecondRowMobile,
} from '@components/sidebar/sidebar.style';

import WalletContext from '@contexts/wallet_address';

const Countdown = dynamic(() => import('@components/countdown'), { ssr: false });

enum SelectMode {
	Group,
	Personal,
}

const Sidebar = ({
	uploaders,
	data,
	files,
	streakers,
}: {
	uploaders?: number;
	data?: number;
	files?: number;
	streakers?: number;
}): JSX.Element => {
	const [walletAddress] = useContext(WalletContext);
	const [selected, setSelected] = useState(SelectMode.Group);
	const hasWallet = Boolean(walletAddress);
	const personalStatsSelected = selected === SelectMode.Personal;

	return (
		<SidebarWrapper>
			<FirstRowMobile>
				<Countdown />
				<SelectorWrapper hasWallet={hasWallet}>
					<Selector
						left={hasWallet}
						selected={selected === SelectMode.Group}
						onClick={() => setSelected(SelectMode.Group)}
					>
						Group Stats
					</Selector>
					{hasWallet && (
						<Selector
							right
							selected={selected === SelectMode.Personal}
							onClick={() => setSelected(SelectMode.Personal)}
						>
							Your Stats
						</Selector>
					)}
				</SelectorWrapper>
				<Box hiddenOnDesktop text='151 GB' description='Data Uploaded' />
			</FirstRowMobile>
			{personalStatsSelected ? (
				<SecondRowMobile>
					<Box text={3} description='Rank' />
					<Box text={`${data} GB`} description='Data Uploaded' />
					<Box text={10} description='Files Uploaded' />
					<Box text={10} description='Streaks Completed' />
				</SecondRowMobile>
			) : (
				<StatsDesktop>
					<Box text={255} description='Uploaders' />
					<Box text={`${data} GB`} description='Data Uploaded' />
					<Box text={10} description='Files Uploaded' />
					<Box text={10} description='Streakers' />
				</StatsDesktop>
			)}
		</SidebarWrapper>
	);
};

export default Sidebar;
