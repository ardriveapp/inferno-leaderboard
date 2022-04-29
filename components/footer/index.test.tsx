import { render, screen } from '@testing-library/react';
import Footer from '@components/footer';

describe('Footer', () => {
	it('renders last updated', () => {
		const thirtyMinutesAgo = new Date().getTime() - 1_800_000;
		const { container } = render(<Footer lastUpdated={thirtyMinutesAgo} />);

		const text = screen.getByText('30 minutes ago');

		expect(text).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
