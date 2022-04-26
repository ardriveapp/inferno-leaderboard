import 'modern-normalize/modern-normalize.css';
import './global_style.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
	if (process.env.NODE_ENV === 'development') console.log(metric);
}

export default MyApp;
