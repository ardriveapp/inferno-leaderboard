import styled from 'styled-components';

import Rank from '@components/rank';
import Sidebar from '@components/sidebar';

import type { Data } from '../../types/dataType';
import { device } from '@utils';

const MainWrapper = styled.main`
	margin-top: 1.375rem;
	display: grid;
	grid-template-rows: 100px 1fr;
	gap: 1rem;

	@media ${device.tablet} {
		grid-template-columns: 70% 1fr;
		grid-template-rows: auto;
	}
`;

const RankWrapper = styled.div`
	order: 1;
	min-height: 0;
	overflow-y: scroll;
	background: #121212;

	@media ${device.tablet} {
		order: 0;
	}
`;

const RankScroll = styled.div`
	height: 100%;
	overflow-y: scroll;

	@media ${device.tablet} {
		padding: 0 1rem 0 2rem;
		margin-right: 1rem;
		scrollbar-color: #2c2c2c transparent;

		&::-webkit-scrollbar {
			width: 10px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #2c2c2c;
			border-radius: 5.5px;
			border: none;
		}
	}
`;

const SidebarWrapper = styled.div`
	min-height: 0;
`;

const Main = ({ data }: { data: Data }): JSX.Element => (
	<MainWrapper>
		<RankWrapper>
			<RankScroll>
				<Rank data={data} />
			</RankScroll>
		</RankWrapper>
		<SidebarWrapper>
			<Sidebar uploaders={10} data={10} files={10} streakers={10} />
		</SidebarWrapper>
	</MainWrapper>
);

export default Main;
