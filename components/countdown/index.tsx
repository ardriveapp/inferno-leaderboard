import { useEffect, useState } from 'react';

import Box from '@components/box';

const getTargetDate = (): Date => {
	const now = new Date();
	const sundayNumber = 0;
	const timezone = 'America/New_York';
	const today = new Date(now);
	today.setMilliseconds(0);
	today.setSeconds(0);
	today.setMinutes(0);
	today.setHours(0);

	const nextSunday = new Date(today);

	do {
		nextSunday.setDate(nextSunday.getDate() + 1);
	} while (nextSunday.getDay() !== sundayNumber);

	return new Date(nextSunday.toLocaleString('en-US', { timeZone: timezone }));
};

const getValues = (countDown: number): [string, string, string, string] => {
	const days = Math.floor(countDown / (1000 * 60 * 60 * 24)).toLocaleString('en-US');

	const hours = Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});

	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)).toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});

	const seconds = Math.floor((countDown % (1000 * 60)) / 1000).toLocaleString('en-US', {
		minimumIntegerDigits: 2,
		useGrouping: false,
	});

	return [days, hours, minutes, seconds];
};

const Countdown = (): JSX.Element => {
	const targetDate = getTargetDate().getTime();

	const [countDown, setCountDown] = useState(targetDate - new Date().getTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(targetDate - new Date().getTime());
		}, 1000);

		return () => clearInterval(interval);
	}, [targetDate]);

	const [days, hours, minutes, seconds] = getValues(countDown);

	const countdown = `${days} : ${hours} : ${minutes} : ${seconds}`;

	return <Box text={countdown} description='Cycle Countdown' />;
};

export default Countdown;
