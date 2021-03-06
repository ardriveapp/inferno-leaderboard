import { Dispatch, useState, createContext, SetStateAction, ReactNode } from 'react';

export type StatsProps = {
	weekly: {
		group: {
			uploaders: number;
			dataUploaded: number;
			filesUploaded: number;
			streakers: number;
		};
		personal: {
			rank: number;
			dataUploaded: number;
			filesUploaded: number;
			daysStreaked: number;
		};
	};
	lastWeek: {
		group: {
			uploaders: number;
			dataUploaded: number;
			filesUploaded: number;
			streakers: number;
		};
		personal: {
			rank: number;
			dataUploaded: number;
			filesUploaded: number;
			daysStreaked: number;
		};
	};
	total: {
		group: {
			uploaders: number;
			dataUploaded: number;
			filesUploaded: number;
			streakers: number;
		};
		personal: {
			rank: number;
			dataUploaded: number;
			filesUploaded: number;
			daysStreaked: number;
		};
	};
};

const defaultValue = {
	weekly: {
		group: {
			uploaders: 0,
			dataUploaded: 0,
			filesUploaded: 0,
			streakers: 0,
		},
		personal: {
			rank: 0,
			dataUploaded: 0,
			filesUploaded: 0,
			daysStreaked: 0,
		},
	},
	lastWeek: {
		group: {
			uploaders: 0,
			dataUploaded: 0,
			filesUploaded: 0,
			streakers: 0,
		},
		personal: {
			rank: 0,
			dataUploaded: 0,
			filesUploaded: 0,
			daysStreaked: 0,
		},
	},
	total: {
		group: {
			uploaders: 0,
			dataUploaded: 0,
			filesUploaded: 0,
			streakers: 0,
		},
		personal: {
			rank: 0,
			dataUploaded: 0,
			filesUploaded: 0,
			daysStreaked: 0,
		},
	},
};

type StatsContextType = [StatsProps, Dispatch<SetStateAction<StatsProps>>];
const contextDefaultValue: StatsContextType = [defaultValue, () => {}];
const StatsContext = createContext<StatsContextType>(contextDefaultValue);

export const StatsContextProvider = ({ children }: { children: ReactNode }) => {
	const [stats, setStats] = useState<StatsProps>(defaultValue);

	return <StatsContext.Provider value={[stats, setStats]}>{children}</StatsContext.Provider>;
};

export default StatsContext;
