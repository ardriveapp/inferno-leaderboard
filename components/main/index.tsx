import styled from 'styled-components';

import Rank from '@components/rank';
import Sidebar from '@components/sidebar';

import device from '@utils/media_queries';
import type { Data } from '@utils/dataType';

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

	@media ${device.tablet} {
		order: 0;
	}
`;

const SidebarWrapper = styled.div`
	min-height: 0;
`;

const Main = ({ data }: { data: Data }): JSX.Element => (
	<MainWrapper>
		<RankWrapper>
			<Rank data={data} />
		</RankWrapper>
		<SidebarWrapper>
			<Sidebar uploaders={10} data={10} files={10} streakers={10} />
		</SidebarWrapper>
	</MainWrapper>
);

export default Main;
