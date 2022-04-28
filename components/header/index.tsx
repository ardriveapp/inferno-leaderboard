import { useEffect, useState } from 'react';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';

import arconnectLogo from '../../public/arconnect.png';

import Logo from '@components/logo';
import { BoxWrapper } from '@components/box';

import { device, formatWalletAddress } from '@utils';

const HeaderWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: center;
`;

const LeaderboardWrapper = styled(BoxWrapper)`
	display: none;

	@media ${device.tablet} {
		display: flex;
		height: 6.25rem;
		padding: 0 4.25rem;
		flex-direction: row;
		justify-content: space-between;
	}
`;

const ConnectWalletButton = styled.button`
	all: unset;
	cursor: pointer;
	justify-self: end;
	font-weight: 700;
	color: #121212;
	background: #fafafa;
	border-radius: 4px;
	padding: 0 1rem;
	height: 30px;
	font-size: 0.75rem;

	@media ${device.tablet} {
		font-size: 1rem;
	}

	${({ isConnected }: { isConnected?: boolean }) =>
		isConnected &&
		css`
			background: #090a0a;
			color: #fafafa;
			cursor: default;
			border: 1px solid #fafafa;
		`};
`;

const Title = styled.h2`
	font-size: 1.5rem;
	font-weight: 800;
	margin: 0;
`;

const CloseModalButton = styled.button`
	position: absolute;
	left: -10000px;
	top: auto;
	width: 1px;
	height: 1px;
	overflow: hidden;
`;

const ModalContent = styled.div`
	display: grid;
	grid-template-rows: 1fr 1fr;
	height: 100%;
	align-items: center;
	justify-items: center;
`;

const ModalText = styled.p`
	font-weight: 700;
	text-align: center;
	padding: 0 1rem;
`;

const ModalButtons = styled.div`
	align-self: end;
	display: grid;
	width: 100%;
	gap: 0.75rem;
	cursor: pointer;
`;

const ModalButton = styled.button`
	all: unset;
	width: 100%;
	background: #fafafa;
	border: 0.5px solid #fafafa;
	border-radius: 3px;
	font-weight: 800;
	font-size: 18px;
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

const modalStyles = {
	overlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: '#121212cc',
	},
	content: {
		position: 'absolute',
		border: 'none',
		boxShadow: '0px 0px 10px 3px rgba(44, 44, 44, 0.75)',
		background: '#090A0A',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '8px',
		outline: 'none',
		padding: '2rem 2.5rem',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '360px',
		height: '300px',
		'@media (min-width: 500px)': {
			display: 'none',
		},
	},
};

const Modal = ({
	isOpen,
	closeModal,
	setWalletAddress,
}: {
	isOpen: boolean;
	closeModal: Function;
	setWalletAddress: Function;
}): JSX.Element => {
	const [isArconnectAvailable, setIsArconnectAvailable] = useState(false);

	if (typeof window !== 'undefined') {
		window.addEventListener('arweaveWalletLoaded', async () => {
			setIsArconnectAvailable(Boolean(window.arweaveWallet));

			try {
				const walletAddress = await window.arweaveWallet.getActiveAddress();
				setWalletAddress(walletAddress);
			} catch (e) {
				console.log(e);
			}
		});
	}

	const connectToArconnect = async () => {
		await window.arweaveWallet.connect(['ACCESS_ADDRESS'], { name: 'Inferno Rewards Leaderboard' });
		const walletAddress = await window.arweaveWallet.getActiveAddress();
		setWalletAddress(walletAddress);
		closeModal();
	};

	return (
		<ReactModal
			isOpen={isOpen}
			contentLabel='Connect Wallet'
			onRequestClose={() => closeModal()}
			className='react-modal-content'
			overlayClassName='react-modal-overlay'
		>
			<CloseModalButton onClick={() => closeModal()}>Close Modal</CloseModalButton>
			<ModalContent>
				<ModalText>
					Get your personal stats by connecting with ArConnect or adding your wallet address.
				</ModalText>
				<ModalButtons>
					<ModalButton dark>Add Wallet Address</ModalButton>
					{isArconnectAvailable ? (
						<ModalButton onClick={() => connectToArconnect()}>
							<Image alt='ArConnect Logo' src={arconnectLogo} width={22} height={22} />
							<span style={{ marginLeft: '16px' }}>ArConnect</span>
						</ModalButton>
					) : null}
				</ModalButtons>
			</ModalContent>
		</ReactModal>
	);
};

const Header = (): JSX.Element => {
	const [showModal, setShowModal] = useState(false);
	const [walletAddress, setWalletAddress] = useState('');

	return (
		<>
			<HeaderWrapper>
				<Logo />
				{walletAddress ? (
					<ConnectWalletButton isConnected>{formatWalletAddress(walletAddress)}</ConnectWalletButton>
				) : (
					<ConnectWalletButton onClick={() => setShowModal(true)}>Connect Wallet</ConnectWalletButton>
				)}
			</HeaderWrapper>
			<LeaderboardWrapper as='header'>
				<Title>Leaderboard</Title>
			</LeaderboardWrapper>
			<Modal isOpen={showModal} closeModal={() => setShowModal(false)} setWalletAddress={setWalletAddress} />
		</>
	);
};

export default Header;
