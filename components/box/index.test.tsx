import { render, screen } from '@testing-library/react';
import Box from '@components/box';

describe('Box', () => {
	it('renders a text and description without arrow', () => {
		const { container } = render(<Box text='Testing' description='box' />);

		const text = screen.getByText('Testing');
		const description = screen.getByText('box');
		const arrowUp = screen.queryByTitle('Up');
		const arrowDown = screen.queryByTitle('Down');

		expect(text).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(arrowUp).not.toBeInTheDocument();
		expect(arrowDown).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('renders a text and description with arrow up', () => {
		const { container } = render(<Box text='Testing' description='box' arrowUp />);

		const text = screen.getByText('Testing');
		const description = screen.getByText('box');
		const arrowUp = screen.queryByTitle('Up');
		const arrowDown = screen.queryByTitle('Down');

		expect(text).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(arrowUp).toBeInTheDocument();
		expect(arrowDown).not.toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});

	it('renders a text and description with arrow down', () => {
		const { container } = render(<Box text='Testing' description='box' arrowDown />);

		const text = screen.getByText('Testing');
		const description = screen.getByText('box');
		const arrowUp = screen.queryByTitle('Up');
		const arrowDown = screen.queryByTitle('Down');

		expect(text).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(arrowUp).not.toBeInTheDocument();
		expect(arrowDown).toBeInTheDocument();

		expect(container).toMatchSnapshot();
	});
});
