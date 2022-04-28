import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import and enable dayjs relativeTime plugin
// one of the functions of this plugin is to display a text describing the
// difference between two dates. Example: 1 hour ago
dayjs.extend(relativeTime);

import { TwitterLogo } from '@components/icons';
import { FooterWrapper, LastUpdated, Share } from '@components/footer/footer.style';

const Footer = ({ lastUpdated }: { lastUpdated: number }): JSX.Element => {
	const currentDate = new Date();
	const differenceFromLastTimeUpdatedText = dayjs(currentDate).to(dayjs(lastUpdated));

	return (
		<FooterWrapper>
			<a href='#'>Rules</a>
			<LastUpdated>
				Last updated: <span>{differenceFromLastTimeUpdatedText}</span>
			</LastUpdated>
			<Share>
				<a href='#'>Share</a>
				<TwitterLogo />
			</Share>
		</FooterWrapper>
	);
};

export default Footer;
