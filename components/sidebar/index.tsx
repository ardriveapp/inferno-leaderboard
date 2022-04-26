import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Box from '@components/box';

import device from '@utils/media_queries';

const Countdown = dynamic(() => import('@components/countdown'), { ssr: false });

const Wrapper = styled.div`
	display: grid;
	gap: 1rem;
	height: 100%;
`;

const MobileItems = styled.div`
	display: grid;
	grid-template-columns: 2fr 1fr;
	gap: 1rem;

	@media ${device.tablet} {
		grid-template-columns: auto;
	}
`;

const DesktopItems = styled.div`
	display: none;

	@media ${device.tablet} {
		display: grid;
		gap: 1rem;
	}
`;

const Sidebar = ({
	uploaders,
	data,
	files,
	streakers,
}: {
	uploaders?: number;
	data?: number;
	files?: number;
	streakers?: number;
}): JSX.Element => (
	<Wrapper>
		<MobileItems>
			<Countdown />
			{uploaders && <Box text={uploaders} description='Uploaders' />}
		</MobileItems>
		<DesktopItems>
			{data && <Box text={`${data} GB`} description='Data Uploaded' />}
			{files && <Box text={files} description='Files Uploaded' />}
			{streakers && <Box text={streakers} description='Streakers' arrowUp />}
		</DesktopItems>
	</Wrapper>
);

export default Sidebar;
