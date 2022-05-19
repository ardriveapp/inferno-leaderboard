import Head from 'next/head';
import type { NextPage } from 'next';
import styled from 'styled-components';
import Modal from 'react-modal';

import Header from '@components/header';
import Main from '@components/main';
import Footer from '@components/footer';

import { device } from '@utils';

import { WalletContextProvider } from '@contexts/wallet_address';
import { TimeframeContextProvider } from '@contexts/timeframe_selector';
import { StatsContextProvider } from '@contexts/stats';

import { useGqlData } from 'hooks/useGqlData';

const Background = styled.div`
	background-image: linear-gradient(
			180deg,
			rgba(10, 11, 9, 0.5) 0%,
			rgba(10, 11, 9, 0.85) 27.55%,
			rgba(10, 11, 9, 0.85) 73.74%,
			rgba(10, 11, 9, 0.5) 100%
		),
		url(/bg.png);
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

const Home: NextPage = (): JSX.Element => {
	const data = useGqlData();

	return (
		<>
			<Head>
				<title>Inferno</title>
				<meta
					name='description'
					content="We're awarding up to 50,000 ArDrive Tokens in our third Usage Mining Rewards program called Inferno."
				/>
				<meta property='og:locale' content='en_US' />
				<meta property='og:type' content='article' />
				<meta property='og:title' content='Inferno' />
				<meta
					property='og:description'
					content="We're awarding up to 50,000 ArDrive Tokens in our third Usage Mining Rewards program called Inferno."
				/>
				<meta property='og:url' content='https://ardrive.io/inferno/' />
				<meta property='og:site_name' content='ArDrive' />
				<meta property='og:image' content='https://ardrive.io/wp-content/uploads/2022/03/Inferno-Mobile.jpg' />
				<meta property='og:image:width' content='1800' />
				<meta property='og:image:height' content='1013' />
				<meta property='og:image:type' content='image/jpeg' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta name='twitter:title' content='Inferno' />
				<meta name='twitter:label1' content='Est. reading time' />
				<meta name='twitter:data1' content='2 minutes' />
				<script defer data-domain="inferno.ardrive.io" src="https://plausible.io/js/plausible.js"></script>
			</Head>
			<StatsContextProvider>
				<WalletContextProvider>
					<TimeframeContextProvider>
						{data ? (
							<Background>
								<Page>
									<Header />
									<Main data={data} />
									<Footer lastUpdated={data.lastUpdated} />
								</Page>
							</Background>
						) : null}
					</TimeframeContextProvider>
				</WalletContextProvider>
			</StatsContextProvider>
		</>
	);
};

export default Home;
