import { Dispatch, useState, createContext, SetStateAction, ReactNode } from 'react';

export type TimeframeSelectorOptions = 'weekly' | 'lastWeek' | 'total';
type TimeframeSelectorContextType = [TimeframeSelectorOptions, Dispatch<SetStateAction<TimeframeSelectorOptions>>];
const contextDefaultValue: TimeframeSelectorContextType = ['weekly', () => {}];
const TimeframeContext = createContext<TimeframeSelectorContextType>(contextDefaultValue);

export const TimeframeContextProvider = ({ children }: { children: ReactNode }) => {
	const [timeframe, setTimeframe] = useState<TimeframeSelectorOptions>('weekly');

	return <TimeframeContext.Provider value={[timeframe, setTimeframe]}>{children}</TimeframeContext.Provider>;
};

export default TimeframeContext;
