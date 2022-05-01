export const positionIndicator = (position: number): string => {
	if (position === 0) {
		return '-';
	}

	const indicator = Math.abs(position);
	const cent = indicator % 100;

	if (cent >= 10 && cent <= 20) {
		return `${position}th`;
	}

	const dec = indicator % 10;

	if (dec === 1) {
		return `${position}st`;
	}

	if (dec === 2) {
		return `${position}nd`;
	}

	if (dec === 3) {
		return `${position}rd`;
	}

	return `${position}th`;
};
