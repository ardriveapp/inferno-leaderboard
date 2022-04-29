/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
	assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
};
