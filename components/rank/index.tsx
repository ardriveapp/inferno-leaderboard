import { ArrowDown, ArrowUp } from '@components/icons';
import { RankWrapper } from '@components/rank/rank.style';

import type { Data } from '../../types/dataType';
import { formatBytes, formatWalletAddress, positionIndicator } from '@utils';

const displayChangeInPercentage = (change: number): JSX.Element => {
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
	const rankWallets = Object.keys(data.ranks.daily.groupEffortRewards);
	const wallets = data.wallets;

	const createRows = () =>
		rankWallets.map((address, index) => {
			const position = index + 1;
			const wallet = wallets[address];
			const walletDaily = wallet?.daily;
			const walletWeekly = wallet?.weekly;
			const byteSize = formatBytes(walletDaily?.byteCount || 0);
			const changeInPercentage7d = displayChangeInPercentage(walletDaily?.changeInPercentage || 0);
			const changeInPercentage24h = displayChangeInPercentage(walletWeekly?.changeInPercentage || 0);

			return (
				<tr key={position}>
					<td>
						<span>{formatWalletAddress(address)}</span>
					</td>
					<td>
						<span>{positionIndicator(position)}</span>
					</td>
					<td>
						<span>{byteSize}</span>
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
