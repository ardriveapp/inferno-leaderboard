import { useContext } from 'react';

import { ArrowDown, ArrowUp } from '@components/icons';
import { RankWrapper } from '@components/rank/rank.style';

import type { Data } from '../../types/dataType';
import { formatBytes, formatWalletAddress, positionIndicator } from '@utils';

import TimeframeContext from '@contexts/timeframe_selector';

const displayChangeInPercentage = (change: number): JSX.Element | string => {
	if (change === 0) return '-';

	const Arrow = () => {
		if (change > 0) {
			return <ArrowUp />;
		}
		if (change < 0) {
			return <ArrowDown />;
		}

		return null;
	};

	return (
		<>
			{Math.abs(change)}% <Arrow />
		</>
	);
};

const Rank = ({ data }: { data: Data }): JSX.Element => {
	const [timeframe] = useContext(TimeframeContext);
	const rankWallets = data.ranks[timeframe].groupEffortRewards;
	const wallets = data.wallets;

	const createRows = () =>
		rankWallets.map((wallet) => {
			const position = wallet.rankPosition;
			const walletAddress = wallet.address;
			const walletInfo = wallets[walletAddress];
			const walletStats = walletInfo[timeframe];
			const walletDaily = walletInfo?.daily;
			const walletLastWeek = walletInfo?.lastWeek;
			const byteSize = formatBytes(walletStats?.byteCount || 0);
			const changeInPercentage7d = displayChangeInPercentage(walletDaily?.changeInPercentage || 0);
			const changeInPercentage24h = displayChangeInPercentage(walletLastWeek?.changeInPercentage || 0);

			return (
				<tr key={position}>
					<td>
						<span>
							<a
								href={`https://viewblock.io/arweave/address/${walletAddress}`}
								target='_blank'
								rel='noreferrer'
							>
								{formatWalletAddress(walletAddress)}
							</a>
						</span>
					</td>
					<td>
						<span>{positionIndicator(position)}</span>
					</td>
					<td>
						<span>{byteSize === '0' ? '-' : byteSize}</span>
					</td>
					<td>
						<span>{changeInPercentage7d}</span>
					</td>
					<td>
						<span>{changeInPercentage24h}</span>
					</td>
				</tr>
			);
		});

	return (
		<RankWrapper>
			<table cellSpacing='0' cellPadding='0'>
				<thead>
					<tr>
						<th>Address</th>
						<th>Rank</th>
						<th>Uploaded</th>
						<th>24H%</th>
						<th>7D%</th>
					</tr>
				</thead>
				<tbody>{createRows()}</tbody>
			</table>
		</RankWrapper>
	);
};

export default Rank;
