import styled from 'styled-components';

import { device } from '@utils';

export const RankWrapper = styled.div`
	font-size: 0.75rem;

	@media ${device.tablet} {
		font-size: 1rem;

		& th {
			&:first-child {
				padding-left: 2rem;
			}

			&:last-child {
				padding-right: 2rem;
			}
		}

		& td {
			&:first-child > span {
				padding-left: 2rem;
			}

			&:last-child > span {
				padding-right: 2rem;
			}
		}
	}

	& > table {
		width: 100%;
		border-collapse: collapse;
	}

	& th {
		text-align: left;
		padding-top: 1.75rem;
		padding-bottom: 1.75rem;
		background: #121212;
		position: sticky;
		top: 0;

		&:first-child {
			padding-left: 1rem;
		}

		&:last-child {
			padding-right: 1rem;
		}
	}

	& td {
		&:first-child > span {
			border-radius: 8px 0 0 8px;
			padding-left: 1rem;
		}

		&:last-child > span {
			border-radius: 0 8px 8px 0;
			padding-right: 1rem;
		}

		& > span {
			display: block;
			background: #2c2c2c;
			padding-top: 1rem;
			padding-bottom: 1rem;
			margin-bottom: 1rem;
		}
	}
`;
