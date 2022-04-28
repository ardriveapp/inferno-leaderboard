import styled from 'styled-components';

import { device } from '@utils';

export const SidebarWrapper = styled.div`
	display: grid;
	gap: 1rem;
	height: 100%;
	grid-template-rows: 0.815fr 1.195fr;
	align-items: stretch;
`;

export const MobileItems = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	gap: 1rem;

	@media ${device.tablet} {
		grid-template-columns: auto;
	}
`;

export const MobileItemsFirstRow = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	gap: 1rem;
`;

export const DesktopItems = styled.div`
	display: none;

	@media ${device.tablet} {
		display: grid;
		gap: 1rem;
	}
`;

type SelectorWrapperProps = {
	hasWallet: boolean;
};
export const SelectorWrapper = styled.div<SelectorWrapperProps>`
	display: none;

	@media ${device.tablet} {
		height: 60px;
		display: grid;
		grid-template-columns: ${({ hasWallet }) => (hasWallet ? '1fr 1fr' : 'auto')};
		gap: 0.125rem;
		align-items: center;
	}
`;

type SelectorProps = {
	left?: boolean;
	right?: boolean;
	selected: boolean;
};
export const Selector = styled.button<SelectorProps>`
	all: unset;

	background: ${({ selected }) => (selected ? '#2c2c2c' : '#1c1c1c')};
	color: #fff;

	cursor: ${({ left, right }) => (left && right ? 'pointer' : 'default')};

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

export const FirstRowMobile = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;

	@media ${device.tablet} {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: 1fr 1fr;
		gap: 1rem;
		align-items: stretch;
	}
`;

export const SecondRowMobile = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;

	@media ${device.tablet} {
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		gap: 1rem;
	}
`;

export const StatsDesktop = styled.div`
	display: none;

	@media ${device.tablet} {
		display: grid;
		grid-template-rows: 1fr 1fr 1fr 1fr;
		gap: 1rem;
	}
`;
