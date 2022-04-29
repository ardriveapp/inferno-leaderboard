import styled, { css } from 'styled-components';

export const CloseModalButton = styled.button`
	position: absolute;
	left: -10000px;
	top: auto;
	width: 1px;
	height: 1px;
	overflow: hidden;
`;

export const ModalContent = styled.div`
	display: grid;
	grid-template-rows: 1fr 1fr;
	height: 100%;
	align-items: center;
	justify-items: center;
`;

export const ModalText = styled.p`
	font-weight: 700;
	text-align: center;
	padding: 0 1rem;
`;

export const ModalButtons = styled.div`
	align-self: end;
	display: grid;
	width: 100%;
	gap: 0.75rem;
	cursor: pointer;
`;

export const ModalButton = styled.button`
	all: unset;
	width: 100%;
	background: #fafafa;
	border: 0.5px solid #fafafa;
	border-radius: 3px;
	font-weight: 800;
	font-size: 1.125rem;
	color: #121212;
	text-align: center;
	padding-top: 0.75rem;
	padding-bottom: 0.75rem;
	display: flex;
	align-items: center;
	justify-content: center;

	${({ dark }: { dark?: boolean }) =>
		dark &&
		css`
			background: #090a0a;
			color: #fafafa;
		`};
`;

export const ImportWalletForm = styled.form`
	width: 100%;

	& > p {
		text-align: center;
	}
`;

export const ImportWalletInput = styled.input`
	font-weight: 400;
	padding-left: 1rem;
	padding-right: 1rem;
	width: 100%;
	background: #090a0a;
	color: #fafafa;
	border: 0.5px solid #fafafa;
	border-radius: 3px;
	font-size: 1.125rem;
	padding: 0.75rem 1rem;
	margin-bottom: 0.75rem;
`;

export const ImportWalletErrorMessage = styled.p`
	margin: 0 0 0.75rem;
`;
