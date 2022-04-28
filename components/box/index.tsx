import styled, { css } from 'styled-components';

import { ArrowUp, ArrowDown } from '@components/icons';

import { device } from '@utils';

export const BoxWrapper = styled.div`
	background: #121212;
	color: #fff;

	border-radius: 8px;
	box-shadow: 0px 1px 8px rgb(20 46 110 / 10%);

	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;

	font-size: 1.125rem;
	font-weight: 400;

	@media ${device.tablet} {
		font-size: 1.375rem;
	}
`;

const Text = styled.div`
	font-weight: bold;
`;

const DescriptionWrapper = styled.div`
	margin-top: 0.5rem;
	display: flex;
	align-items: center;
`;

const Description = styled.span`
	font-size: 0.75rem;

	@media ${device.tablet} {
		font-size: 1.125rem;
	}

	${({ hasArrow }: { hasArrow: boolean }) =>
		hasArrow &&
		css`
			margin-right: 10px;
		`};
`;

const Box = ({
	arrowDown,
	arrowUp,
	description,
	text,
}: {
	arrowDown?: boolean;
	arrowUp?: boolean;
	description: string;
	text: string | number;
}): JSX.Element => (
	<BoxWrapper>
		<Text>{text}</Text>
		<DescriptionWrapper>
			<Description hasArrow={Boolean(arrowDown || arrowUp)}>{description}</Description>
			{arrowUp ? <ArrowUp /> : null}
			{arrowDown ? <ArrowDown /> : null}
		</DescriptionWrapper>
	</BoxWrapper>
);

export default Box;
