import { SetStateAction, Dispatch, useContext } from 'react';
import styled from 'styled-components';

import { TimeframeNames } from '@components/header';

import type { TimeframeSelectorOptions } from '@contexts/timeframe_selector';
import TimeframeContext from '@contexts/timeframe_selector';

const TimeframeButtonWrapper = styled.div`
	display: flex;
	gap: 2rem;
`;

type TimeframeButtonProps = {
	selected?: boolean;
};
const TimeframeButton = styled.button<TimeframeButtonProps>`
	all: unset;
	font-size: 1.125rem;
	font-weight: 400;
	cursor: pointer;
	&::before {
		content: '';
		display: inline-flex;
		width: 1rem;
		height: 1rem;
		border: 1px solid #fafafa;
		border-radius: 50%;
		margin-right: 0.375rem;
		background: ${({ selected }) => (selected ? '#FE0230' : 'transparent')};
	}
`;

const TimeframeSelectorDesktop = (): JSX.Element => {
	const [timeframe, setTimeframe] = useContext(TimeframeContext);

	return (
		<TimeframeButtonWrapper>
			<TimeframeButton selected={timeframe === 'weekly'} onClick={() => setTimeframe('weekly')}>
				{TimeframeNames['weekly']}
			</TimeframeButton>
			<TimeframeButton selected={timeframe === 'lastWeek'} onClick={() => setTimeframe('lastWeek')}>
				{TimeframeNames['lastWeek']}
			</TimeframeButton>
			<TimeframeButton selected={timeframe === 'total'} onClick={() => setTimeframe('total')}>
				{TimeframeNames['total']}
			</TimeframeButton>
		</TimeframeButtonWrapper>
	);
};

export default TimeframeSelectorDesktop;
