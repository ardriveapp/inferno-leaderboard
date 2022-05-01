import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import Box from '@components/box';

const getTargetDate = (): Date => {
	// Get current date
	const now = new Date();

	// Set current date to 04:00:00 (UTC)
	const today = new Date(now);
	today.setMilliseconds(0);
	today.setSeconds(0);
	today.setMinutes(0);
	today.setHours(4);

	// Start next Sunday date
	const nextSunday = new Date(today);

	const sundayNumber = 0;
	do {
		nextSunday.setDate(nextSunday.getDate() + 1);
	} while (nextSunday.getDay() !== sundayNumber);

	const cycleUTCTime = dayjs(nextSunday).utc(true);

	return cycleUTCTime.toDate();
};

const oneSecond = 1000;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

const englishLocale = 'en-US';
const toLocaleStringSettings = {
	minimumIntegerDigits: 2,
	useGrouping: false,
};

const getValues = (countDown: number): [string, string, string, string] => {
	const days = Math.floor(countDown / oneDay).toLocaleString('en-US');

	const hours = Math.floor((countDown % oneDay) / oneHour).toLocaleString(englishLocale, toLocaleStringSettings);

	const minutes = Math.floor((countDown % oneHour) / oneMinute).toLocaleString(englishLocale, toLocaleStringSettings);

	const seconds = Math.floor((countDown % oneMinute) / oneSecond).toLocaleString(
		englishLocale,
		toLocaleStringSettings,
	);

	return [days, hours, minutes, seconds];
};

const Countdown = (): JSX.Element => {
	const targetTime = getTargetDate().getTime();
	const getCurrentTime = () => new Date().getTime();

	const [countDown, setCountDown] = useState(targetTime - getCurrentTime());

	useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(targetTime - getCurrentTime());
		}, 1000);

		return () => clearInterval(interval);
	}, [targetTime]);

	const [days, hours, minutes, seconds] = getValues(countDown);

	const countdown = `${days} : ${hours} : ${minutes} : ${seconds}`;

	return <Box text={countdown} description='Next Reward Cycle' />;
};

export default Countdown;
