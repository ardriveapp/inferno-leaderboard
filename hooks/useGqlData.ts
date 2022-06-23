import { useEffect, useState } from 'react';
import { Data } from 'types/dataType';
import mock from '../mocks/daily_output.json';

const arweaveUrl = 'https://arweave.net';
const GqlEndpoint = `${arweaveUrl}/graphql`;
const ownerAddress = 'ZPe6CJ9fqcXZakrV6KQmxOdncfxBOO0v7maNVV0DQGQ';
const fileId = '7fa5d4e3-0087-422a-acb3-2e481d98d08b';

const GQLQuery = `
query {
	transactions(
		first: 1
		owners: ["${ownerAddress}"]
		tags: [{
			name: "File-Id"
			values: "${fileId}"
		}]
		sort: HEIGHT_DESC
	)
	{
		edges {
			node {
				id
			}
		}
	}
}
`;

type GQLResponseType = {
	data: {
		transactions: {
			edges: [
				{
					node: {
						id: string;
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

const getMetadataTxId = (gqlResponse: GQLResponseType): string => {
	const responseData = gqlResponse.data.transactions.edges[0].node;
	const metadataTxId = responseData.id;

	return metadataTxId;
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

export function useGqlData(): Data | undefined {
	const [data, setData] = useState<Data | undefined>(undefined);

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			(async () => {
				const gqlResponse = await sendGQLQuery();
				const metadataTxId = getMetadataTxId(gqlResponse);

				const dataTxId = await getDataTxId(metadataTxId);
				const data = await getData(dataTxId);

				setData(data);
			})();
		} else {
			setData(mock);
		}
	}, []);

	return data;
}
