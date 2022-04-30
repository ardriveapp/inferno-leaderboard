import { useContext, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useMedia } from 'react-use';

import Box from '@components/box';
import { SidebarWrapper, SelectorWrapper, Selector, StatsMobileSecondRow } from '@components/sidebar/sidebar.style';
const Countdown = dynamic(() => import('@components/countdown'), { ssr: false });

import { formatBytes } from '@utils';

import { Data, Wallets } from '../../types/dataType';

import WalletContext from '@contexts/wallet_address';
import TimeframeContext from '@contexts/timeframe_selector';
import StatsContext from '@contexts/stats';

import type { TimeframeSelectorOptions } from '@contexts/timeframe_selector';

enum SelectMode {
	Group,
	Personal,
}

type PersonalStatsProps = {
	rank: number;
	dataUploaded: number;
	filesUploaded: number;
	daysStreaked: number;
};
const getPersonalStats = ({
	wallets,
	wallet,
	timeFrame,
}: {
	wallets: Wallets;
	wallet: string;
	timeFrame: TimeframeSelectorOptions;
}): PersonalStatsProps => {
	const walletStats = wallets[wallet] ? wallets[wallet][timeFrame] : undefined;

	return {
		rank: walletStats?.rankPosition ?? 0,
		dataUploaded: walletStats?.byteCount ?? 0,
		filesUploaded: walletStats?.fileCount ?? 0,
		daysStreaked: 0,
	};
};

type GroupStatsProps = {
	uploaders: number;
	dataUploaded: number;
	filesUploaded: number;
	streakers: number;
};
const getGroupStats = ({
	wallets,
	timeFrame,
}: {
	wallets: Wallets;
	timeFrame: TimeframeSelectorOptions;
}): GroupStatsProps => {
	const walletValues = Object.values(wallets);

	return walletValues.reduce(
		(accumulator, stats) => {
			const { byteCount, fileCount } = stats[timeFrame];
			const didUpload = byteCount > 0;

			return {
				dataUploaded: accumulator.dataUploaded + byteCount,
				filesUploaded: accumulator.filesUploaded + fileCount,
				uploaders: didUpload ? accumulator.uploaders + 1 : accumulator.uploaders,
				streakers: accumulator.streakers,
			};
		},
		{
			dataUploaded: 0,
			filesUploaded: 0,
			uploaders: 0,
			streakers: 0,
		},
	);
};

const GroupStats = ({
	uploaders,
	dataUploaded,
	filesUploaded,
	streakers,
}: {
	uploaders: number;
	dataUploaded: number;
	filesUploaded: number;
	streakers: number;
}): JSX.Element => (
	<>
		<Box text={uploaders} description='Uploaders' />
		<Box text={formatBytes(dataUploaded)} description='Data Uploaded' />
		<Box text={filesUploaded} description='Files Uploaded' />
		<Box text={streakers} description='Streakers' />
	</>
);

const PersonalStats = ({
	rank,
	dataUploaded,
	filesUploaded,
	streaksCompleted,
	daysStreaked,
	isMobile,
}: {
	rank: number;
	dataUploaded: number;
	filesUploaded?: number;
	streaksCompleted?: number;
	daysStreaked?: number;
	isMobile: boolean;
}): JSX.Element => (
	<>
		<Box text={rank} description='Rank' />
		{daysStreaked !== undefined && <Box text={daysStreaked} description='Days Streaked' />}
		<Box text={formatBytes(dataUploaded)} description={isMobile ? 'Your Data' : 'Data Uploaded'} />
		{filesUploaded !== undefined && <Box text={filesUploaded} description='Files Uploaded' />}
		{streaksCompleted !== undefined && <Box text={streaksCompleted} description='Streaks Completed' />}
	</>
);

const Sidebar = ({ data }: { data: Data }): JSX.Element => {
	const [walletAddress] = useContext(WalletContext);
	const [timeframe] = useContext(TimeframeContext);
	const [stats, setStats] = useContext(StatsContext);
	const [selected, setSelected] = useState(SelectMode.Group);

	// set group stats
	useEffect(() => {
		const { uploaders, dataUploaded, filesUploaded, streakers } = getGroupStats({
			wallets: data.wallets,
			timeFrame: timeframe,
		});

		setStats((prevStats) => ({
			...prevStats,
			...{
				[timeframe]: {
					personal: prevStats[timeframe].personal,
					group: {
						uploaders,
						dataUploaded,
						filesUploaded,
						streakers,
					},
				},
			},
		}));
	}, [data.wallets, timeframe, setStats]);

	// set personal stats
	useEffect(() => {
		if (walletAddress) {
			const { rank, dataUploaded, filesUploaded, daysStreaked } = getPersonalStats({
				wallets: data.wallets,
				wallet: walletAddress,
				timeFrame: timeframe,
			});

			setStats((prevStats) => ({
				...prevStats,
				...{
					[timeframe]: {
						group: prevStats[timeframe].group,
						personal: {
							rank,
							dataUploaded,
							filesUploaded,
							daysStreaked,
						},
					},
				},
			}));
		}
	}, [walletAddress, data.wallets, timeframe, setStats]);

	const isMobile = useMedia('(max-width: 768px)', true);
	const isDesktop = !isMobile;
	const hasWallet = Boolean(walletAddress);
	const personalStatsSelected = selected === SelectMode.Personal;

	const groupStats = stats[timeframe].group;
	const personalStats = stats[timeframe].personal;

	return (
		<SidebarWrapper>
			<Countdown />

			{isDesktop && (
				<SelectorWrapper hasWallet={hasWallet}>
					<Selector
						left={hasWallet}
						selected={selected === SelectMode.Group}
						hasWallet={hasWallet}
						onClick={() => setSelected(SelectMode.Group)}
					>
						Group Stats
					</Selector>

					{hasWallet && (
						<Selector
							right
							selected={selected === SelectMode.Personal}
							hasWallet={hasWallet}
							onClick={() => setSelected(SelectMode.Personal)}
						>
							Your Stats
						</Selector>
					)}
				</SelectorWrapper>
			)}

			{isMobile && <Box text={formatBytes(groupStats.dataUploaded)} description='Group Data' />}

			{hasWallet && isMobile && (
				<StatsMobileSecondRow>
					<PersonalStats
						rank={personalStats.rank}
						dataUploaded={personalStats.dataUploaded}
						daysStreaked={personalStats.daysStreaked}
						isMobile={isMobile}
					/>
				</StatsMobileSecondRow>
			)}

			{personalStatsSelected && isDesktop && (
				<PersonalStats
					rank={personalStats.rank}
					dataUploaded={personalStats.dataUploaded}
					filesUploaded={personalStats.filesUploaded}
					daysStreaked={personalStats.daysStreaked}
					isMobile={isMobile}
				/>
			)}

			{!personalStatsSelected && isDesktop && (
				<GroupStats
					uploaders={groupStats.uploaders}
					dataUploaded={groupStats.dataUploaded}
					filesUploaded={groupStats.filesUploaded}
					streakers={groupStats.streakers}
				/>
			)}
		</SidebarWrapper>
	);
};

export default Sidebar;
