import { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMedia } from 'react-use';

import Box from '@components/box';
import { SidebarWrapper, SelectorWrapper, Selector, StatsMobileSecondRow } from '@components/sidebar/sidebar.style';

import { formatBytes } from '@utils';

import { Data, Wallets } from '../../types/dataType';

import WalletContext from '@contexts/wallet_address';

const Countdown = dynamic(() => import('@components/countdown'), { ssr: false });

enum SelectMode {
	Group,
	Personal,
}

type TimeFrame = 'daily' | 'weekly' | 'total';
type GroupStats = {
	uploaders: number;
	dataUploadedInBytes: number;
	filesUploaded: number;
};
const getGroupStats = ({ wallets, timeFrame }: { wallets: Wallets; timeFrame: TimeFrame }) => {};

const getUploadedDataInBytes = (wallets: Wallets, timeFrame: 'daily' | 'weekly' | 'total'): number => {
	let total = 0;
	const values = Object.values(wallets);
	values.forEach((time) => {
		total += time[timeFrame].byteCount;
	});

	return total;
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
}): JSX.Element => {
	const uploadedData = dataUploaded;

	return (
		<>
			<Box text={uploaders} description='Uploaders' />
			<Box text={formatBytes(dataUploaded)} description='Data Uploaded' />
			<Box text={filesUploaded} description='Files Uploaded' />
			<Box text={streakers} description='Streakers' />
		</>
	);
};

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
}): JSX.Element => {
	const uploadedData = dataUploaded;

	return (
		<>
			<Box text={rank} description='Rank' />
			{daysStreaked && <Box text={daysStreaked} description='Days Streaked' />}
			<Box text={formatBytes(dataUploaded)} description={isMobile ? 'Your Data' : 'Data Uploaded'} />
			{filesUploaded && <Box text={filesUploaded} description='Files Uploaded' />}
			{streaksCompleted && <Box text={streaksCompleted} description='Streaks Completed' />}
		</>
	);
};

const Sidebar = ({ data }: { data: Data }): JSX.Element => {
	const [walletAddress] = useContext(WalletContext);
	const [selected, setSelected] = useState(SelectMode.Group);

	const isMobile = useMedia('(max-width: 768px)', true);
	const isDesktop = !isMobile;
	const hasWallet = Boolean(walletAddress);
	const personalStatsSelected = selected === SelectMode.Personal;

	const totalUploadedDataWeek = getUploadedDataInBytes(data.wallets, 'weekly');

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
			{isMobile && <Box text={formatBytes(totalUploadedDataWeek)} description='Group Data' />}
			{hasWallet && isMobile && (
				<StatsMobileSecondRow>
					<PersonalStats rank={3} dataUploaded={totalUploadedDataWeek} daysStreaked={0} isMobile={isMobile} />
				</StatsMobileSecondRow>
			)}
			{personalStatsSelected && isDesktop && (
				<PersonalStats
					rank={3}
					dataUploaded={totalUploadedDataWeek}
					filesUploaded={10}
					streaksCompleted={0}
					isMobile={isMobile}
				/>
			)}
			{!personalStatsSelected && isDesktop && (
				<GroupStats uploaders={255} dataUploaded={totalUploadedDataWeek} filesUploaded={10} streakers={0} />
			)}
		</SidebarWrapper>
	);
};

export default Sidebar;
