import type { NextPage } from 'next';
import styled from 'styled-components';
import Modal from 'react-modal';

import Header from '@components/header';
import Main from '@components/main';
import Footer from '@components/footer';

import { device } from '@utils';

import { WalletContextProvider } from '@contexts/wallet_address';
import { TimeframeContextProvider } from '@contexts/timeframe_selector';

import mock from '../mocks/output.json';

import GlobalCSS from './global_styles';

const Background = styled.div`
	background-image: linear-gradient(
			180deg,
			rgba(10, 11, 9, 0.5) 0%,
			rgba(10, 11, 9, 0.85) 27.55%,
			rgba(10, 11, 9, 0.85) 73.74%,
			rgba(10, 11, 9, 0.5) 100%
		),
		url(${process.env.NEXT_PUBLIC_BASE_PATH || ''}/bg.png);
	background-position: center center;
	background-repeat: no-repeat;
	background-size: cover;
`;

const Page = styled.div`
	display: grid;
	grid-template-rows: auto minmax(0, 1fr) auto;
	height: 100vh;
	max-width: 1440px;
	margin: 0 auto;
	padding: 1.5rem 1rem;

	@media ${device.tablet} {
		padding: 3.625rem 2.25rem 2rem;
		grid-template-rows: auto auto minmax(0, 1fr) auto;
	}
`;

Modal.setAppElement('#__next');

const Home: NextPage = (): JSX.Element => (
	<>
		<GlobalCSS />
		<WalletContextProvider>
			<TimeframeContextProvider>
				<Background>
					<Page>
						<Header />
						<Main data={mock} />
						<Footer lastUpdated={mock.timestamp} />
					</Page>
				</Background>
			</TimeframeContextProvider>
		</WalletContextProvider>
	</>
);

export default Home;
