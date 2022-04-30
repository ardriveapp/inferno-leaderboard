import { useEffect } from 'react';
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

import mock from '../mocks/output.json';

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

const GQLFileIdQuery = `
{
	query {
		transactions(
			first: 1
			tags: [
				{
					name: "File-Id"
					values: "9db606be-e614-42fa-a8db-7e502f863d22"
				}
			]
		) {
			edges {
				node {
					id
					owner {
						address
					}
				}
			}
		}
	}
}
`;

const ownerAddress = '2YCmvIuKh5Z410fWOZVzbS1TlNiWua97wKVWtPlnh';

const Home: NextPage = (): JSX.Element => {
	useEffect(() => {
		fetch('https://arweave.net/graphql', {
			method: 'POST',
			headers: {
				'Accept-Encoding': 'gzip, deflate, br',
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Connection: 'keep-alive',
				DNT: '1',
				Origin: 'https://arweave.net/graphql',
			},
			body: new Blob([JSON.stringify(GQLFileIdQuery)], { type: 'application/json' }),
		})
			.then((res) => res.json())
			.then((res) => console.log(res));
	}, []);

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
			</Head>
			<StatsContextProvider>
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
			</StatsContextProvider>
		</>
	);
};

export default Home;
