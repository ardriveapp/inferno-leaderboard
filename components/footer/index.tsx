import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import { TwitterLogo } from '@components/icons';

import device from '@utils/media_queries';

const FooterWrapper = styled.footer`
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

const LastUpdated = styled.div`
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

const Share = styled.div`
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

const Footer = ({ lastUpdated }: { lastUpdated: number }): JSX.Element => {
	const fromLastUpdated = dayjs(new Date()).to(dayjs(lastUpdated));

	return (
		<FooterWrapper>
			<a href='#'>Rules</a>
			<LastUpdated>
				Last updated: <span>{fromLastUpdated}</span>
			</LastUpdated>
			<Share>
				<a href='#'>Share</a>
				<TwitterLogo />
			</Share>
		</FooterWrapper>
	);
};

export default Footer;
