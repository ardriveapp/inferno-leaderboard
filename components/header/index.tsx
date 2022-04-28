import styled from 'styled-components';

import { BoxWrapper } from '@components/box';

import { device } from '@utils';

const HeaderWrapper = styled(BoxWrapper)`
	display: none;

	@media ${device.tablet} {
		display: flex;
		height: 6.25rem;
		padding: 0 4.25rem;
		flex-direction: row;
		justify-content: space-between;
	}
`;

const Title = styled.h2`
	font-size: 1.5rem;
	font-weight: 800;
	margin: 0;
`;

const Header = (): JSX.Element => (
	<HeaderWrapper as='header'>
		<Title>Leaderboard</Title>
	</HeaderWrapper>
);

export default Header;
