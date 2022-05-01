import { useEffect, useState } from 'react';
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

import mock from '../mocks/daily_output.json';
import { Data } from 'types/dataType';

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

const GQLQuery = `
query {
	transactions(
		first: 1
		tags: [{
			name: "File-Id"
			values: "7fa5d4e3-0087-422a-acb3-2e481d98d08b"
		}]
	)
	{
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
`;

const arweaveUrl = 'https://arweave.net';
const GqlEndpoint = `${arweaveUrl}/graphql`;

const ownerAddress = 'ZPe6CJ9fqcXZakrV6KQmxOdncfxBOO0v7maNVV0DQGQ';

type GQLResponseType = {
	data: {
		transactions: {
			edges: [
				{
					node: {
						id: string;
						owner: {
							address: string;
						};
					};
				},
			];
		};
	};
};

const sendGQLQuery = async (): Promise<GQLResponseType> => {
	const response = await fetch(GqlEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ query: GQLQuery }),
	});
	return response.json();
};

const getMetadataTxAndOwner = (gqlResponse: GQLResponseType) => {
	const responseData = gqlResponse.data.transactions.edges[0].node;
	const metadataTxId = responseData.id;
	const owner = responseData.owner.address;

	return {
		metadataTxId,
		owner,
		isRealOwner: owner === ownerAddress,
	};
};

const getDataTxId = async (metadataTxId: string): Promise<string> => {
	const response = await fetch(`${arweaveUrl}/${metadataTxId}`);
	const metadata = await response.json();
	return metadata.dataTxId;
};

const getData = async (dataTxId: string): Promise<Data> => {
	const response = await fetch(`${arweaveUrl}/${dataTxId}`);
	return response.json();
};

const Home: NextPage = (): JSX.Element => {
	const [data, setData] = useState<Data>();

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			(async () => {
				const gqlResponse = await sendGQLQuery();
				const { metadataTxId, isRealOwner } = getMetadataTxAndOwner(gqlResponse);

				if (isRealOwner) {
					const dataTxId = await getDataTxId(metadataTxId);

					const data = await getData(dataTxId);
					setData(data);
				}
			})();
		} else {
			setData(mock);
		}
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
