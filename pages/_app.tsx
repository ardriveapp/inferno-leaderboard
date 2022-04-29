import 'modern-normalize/modern-normalize.css';
import type { AppProps, NextWebVitalsMetric } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}

export function reportWebVitals(metric: NextWebVitalsMetric): void {
	if (process.env.NODE_ENV === 'development') {
		console.info(metric.name, 'metrics: ', metric);
	}
}

export default MyApp;
