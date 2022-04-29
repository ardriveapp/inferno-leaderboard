import { Dispatch, useState, createContext, SetStateAction, ReactNode } from 'react';

export type TimeframeSelectorOptions = 'weekly' | 'lastWeek' | 'total';
type TimeframeSelctorContextType = [TimeframeSelectorOptions, Dispatch<SetStateAction<TimeframeSelectorOptions>>];
const contextDefaultValue: TimeframeSelctorContextType = ['weekly', () => {}];
const TimeframeContext = createContext<TimeframeSelctorContextType>(contextDefaultValue);

export const TimeframeContextProvider = ({ children }: { children: ReactNode }) => {
	const [timeframe, setTimeframe] = useState<TimeframeSelectorOptions>('weekly');

	return <TimeframeContext.Provider value={[timeframe, setTimeframe]}>{children}</TimeframeContext.Provider>;
};

export default TimeframeContext;
