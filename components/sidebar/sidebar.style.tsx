import styled from 'styled-components';

import { device } from '@utils';

export const SidebarWrapper = styled.div`
	display: grid;
	height: 100%;
	gap: 0.625rem;
	grid-template-columns: 2fr 1fr;
	align-items: stretch;

	@media ${device.tablet} {
		gap: 1rem;
		grid-template-rows: 1fr 60px 1fr 1fr 1fr 1fr;
		grid-template-columns: auto;
	}
`;

export const StatsMobileSecondRow = styled.div`
	width: calc(150% + 0.625rem);

	display: grid;
	gap: 0.625rem;
	grid-template-columns: 1fr 1fr 1fr;
`;

type SelectorWrapperProps = {
	hasWallet: boolean;
};
export const SelectorWrapper = styled.div<SelectorWrapperProps>`
	height: 60px;
	display: grid;
	grid-template-columns: ${({ hasWallet }) => (hasWallet ? '1fr 1fr' : 'auto')};
	gap: 0.125rem;
	align-items: center;
`;

type SelectorProps = {
	left?: boolean;
	right?: boolean;
	hasWallet?: boolean;
	selected?: boolean;
};
export const Selector = styled.button<SelectorProps>`
	all: unset;

	background: ${({ selected }) => (selected ? '#2c2c2c' : '#1c1c1c')};
	color: #fff;

	cursor: ${({ hasWallet }) => (hasWallet ? 'pointer' : 'default')};

	border-radius: 8px;
	border-radius: ${({ left, right }) => {
		if (left) {
			return '8px 0 0 8px';
		}

		if (right) {
			return '0 8px 8px 0';
		}
	}};
	box-shadow: 0px 1px 8px rgb(20 46 110 / 10%);

	font-size: 1.125rem;
	font-weight: 700;
	text-align: center;

	height: 100%;
`;
