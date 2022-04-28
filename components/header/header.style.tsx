import styled, { css } from 'styled-components';

import { BoxWrapper } from '@components/box';

import { device } from '@utils';

export const HeaderWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
`;

export const LeaderboardWrapper = styled(BoxWrapper)`
	display: none;

	@media ${device.tablet} {
		display: flex;
		height: 6.25rem;
		padding: 0 4.25rem;
		flex-direction: row;
		justify-content: space-between;
	}
`;

export const ConnectWalletButton = styled.button`
	all: unset;
	cursor: pointer;
	justify-self: end;
	font-weight: 700;
	color: #121212;
	background: #fafafa;
	border-radius: 4px;
	padding: 0 1rem;
	height: 30px;
	font-size: 0.75rem;

	@media ${device.tablet} {
		font-size: 1rem;
	}

	${({ isConnected }: { isConnected?: boolean }) =>
		isConnected &&
		css`
			background: #090a0a;
			color: #fafafa;
			cursor: default;
			border: 1px solid #fafafa;
		`};
`;

export const Title = styled.h2`
	font-size: 1.5rem;
	font-weight: 800;
	margin: 0;
`;
