import { render, screen } from '@testing-library/react';
import Footer from '@components/footer';

describe('Box', () => {
	it('renders last updated', () => {
		const minutesAgo = new Date().getTime() - 1800000;
		const { container } = render(<Footer lastUpdated={minutesAgo} />);

		const text = screen.getByText('30 minutes ago');

		expect(text).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
