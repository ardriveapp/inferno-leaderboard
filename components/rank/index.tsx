import styled from 'styled-components';

import { ArrowDown, ArrowUp } from '@components/icons';

import type { Data } from '../../types/dataType';
import { device, formatBytes, formatWalletAddress, positionIndicator } from '@utils';

const RankWrapper = styled.div`
	font-size: 0.75rem;

	@media ${device.tablet} {
		font-size: 1rem;

		& th {
			&:first-child {
				padding-left: 2rem;
			}

			&:last-child {
				padding-right: 2rem;
			}
		}

		& td {
			&:first-child > span {
				padding-left: 2rem;
			}

			&:last-child > span {
				padding-right: 2rem;
			}
		}
	}

	& > table {
		width: 100%;
		border-collapse: collapse;
	}

	& th {
		text-align: left;
		padding-top: 1.75rem;
		padding-bottom: 1.75rem;
		background: #121212;
		position: sticky;
		top: 0;

		&:first-child {
			padding-left: 1rem;
		}

		&:last-child {
			padding-right: 1rem;
		}
	}

	& td {
		&:first-child > span {
			border-radius: 8px 0 0 8px;
			padding-left: 1rem;
		}

		&:last-child > span {
			border-radius: 0 8px 8px 0;
			padding-right: 1rem;
		}

		& > span {
			display: block;
			background: #2c2c2c;
			padding-top: 1rem;
			padding-bottom: 1rem;
			margin-bottom: 1rem;
		}
	}
`;

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
			const byteSize = formatBytes(walletDaily?.byteCount || 0);
			const changeInPercentage7d = displayChangeInPercentage(walletDaily?.changeInPercentage['7d'] || 0);
			const changeInPercentage24h = displayChangeInPercentage(walletDaily?.changeInPercentage['24h'] || 0);
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
