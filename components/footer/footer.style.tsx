import styled from 'styled-components';

import { device } from '@utils';

export const FooterWrapper = styled.footer`
	font-weight: 800;
	font-size: 0.875rem;
	margin-top: 2rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;

	& a {
		color: #fff;
		text-decoration: none;
	}

	@media ${device.tablet} {
		grid-template-columns: 1fr 2fr 1fr;
		font-size: 1.125rem;
	}
`;

export const LastUpdated = styled.div`
	display: none;

	@media ${device.tablet} {
		display: block;
		justify-self: center;
		font-size: 1.25rem;
		font-weight: 400;

		& > span {
			font-weight: 700;
			text-decoration: underline;
		}
	}
`;

export const Share = styled.div`
	display: flex;
	align-content: center;
	align-items: center;
	justify-self: end;

	& > a {
		margin-right: 0.5rem;
	}

	& > svg {
		width: 13px;
	}

	@media ${device.tablet} {
		& > a {
			margin-right: 0.75rem;
		}

		& > svg {
			width: 27px;
		}
	}
`;
