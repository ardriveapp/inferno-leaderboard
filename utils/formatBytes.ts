export const formatBytes = (bytes: number): string => {
	if (bytes === 0) return '0';
	const marker = 1000;
	const decimal = 3; // Change as required
	const kiloBytes = marker; // One Kilobyte is 1000 bytes
	const megaBytes = marker * marker; // One MB is 1000 KB
	const gigaBytes = marker * marker * marker; // One GB is 1000 MB
	// const teraBytes = marker * marker * marker * marker; // One TB is 1000 GB

	// return bytes if less than a KB
	if (bytes < kiloBytes) return `${bytes} Bytes`;
	// return KB if less than a MB
	if (bytes < megaBytes) return `${(bytes / kiloBytes).toFixed(decimal)} KB`;
	// return MB if less than a GB
	if (bytes < gigaBytes) return `${(bytes / megaBytes).toFixed(decimal)} MB`;
	// return GB if less than a TB
	return `${(bytes / gigaBytes).toFixed(decimal)} GB`;
};
