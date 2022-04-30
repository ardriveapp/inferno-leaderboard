import { useContext } from 'react';
import queryString from 'query-string';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// import and enable dayjs relativeTime plugin
// one of the functions of this plugin is to display a text describing the
// difference between two dates. Example: 1 hour ago
dayjs.extend(relativeTime);

import { TwitterLogo } from '@components/icons';
import { FooterWrapper, LastUpdated, Share } from '@components/footer/footer.style';

import WalletContext from '@contexts/wallet_address';
import StatsContext from '@contexts/stats';

import { formatBytes } from '@utils';

const Footer = ({ lastUpdated }: { lastUpdated: number }): JSX.Element => {
	const [walletAddress] = useContext(WalletContext);
	const [stats] = useContext(StatsContext);

	const currentDate = new Date();
	const differenceFromLastTimeUpdatedText = dayjs(currentDate).to(dayjs.unix(lastUpdated));

	const personal = {
		rank: stats.weekly.personal.rank,
		dataUploaded: formatBytes(stats.weekly.personal.dataUploaded),
		filesUploaded: stats.weekly.personal.filesUploaded,
	};

	const group = {
		dataUploaded: formatBytes(stats.weekly.group.dataUploaded),
		filesUploaded: stats.weekly.group.filesUploaded,
	};

	const personalUnrankedText = `I'm in the @ardriveapp Inferno 🔥! I uploaded ${personal.dataUploaded} over ${personal.filesUploaded} files. Stop, drop, & upload now! https://app.ardrive.io`;
	const personalText = `I'm in the @ardriveapp Inferno 🔥! My rank is ${personal.rank} with ${personal.dataUploaded} data uploaded over ${personal.filesUploaded} files. Stop, drop, & upload now! https://app.ardrive.io`;
	const groupText = `I'm in the @ardriveapp Inferno 🔥! In this reward cycle the group already uploaded ${group.dataUploaded} over ${group.filesUploaded} files.Stop, drop, & upload now! https://app.ardrive.io`;

	const finalText = (() => {
		if (walletAddress) {
			if (personal.rank !== 0) {
				return personalText;
			}

			return personalUnrankedText;
		}

		return groupText;
	})();

	const twitterShareAttributes = {
		text: finalText,
		hashtags: 'ArDriveInferno',
		related: 'ardriveapp',
		link: 'https://inferno.ardrive.io',
	};

	const twitterQueryParams = queryString.stringify(twitterShareAttributes);

	return (
		<FooterWrapper>
			<a href='https://ardrive.io/inferno' target='_blank' rel='noreferrer'>
				Rules
			</a>
			<LastUpdated>
				Last updated: <span>{differenceFromLastTimeUpdatedText}</span>
			</LastUpdated>
			<Share href={`https://twitter.com/intent/tweet?${twitterQueryParams}`} target='_blank'>
				Share
				<TwitterLogo />
			</Share>
		</FooterWrapper>
	);
};

export default Footer;
