import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import ReactModal from 'react-modal';

import { validateWalletAddress } from '@utils';

import {
	CloseModalButton,
	ImportWalletErrorMessage,
	ImportWalletForm,
	ImportWalletInput,
	ModalButton,
	ModalButtons,
	ModalContent,
	ModalText,
} from './wallet_modal.style';

const WalletModal = ({
	isOpen,
	closeModal,
	setWalletAddress,
}: {
	isOpen: boolean;
	closeModal: () => void;
	setWalletAddress: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
	const [isArconnectAvailable, setIsArconnectAvailable] = useState(false);
	const [showWalletInput, setShowWalletInput] = useState(false);
	const [importedPublicWalletAddress, setImportedPublicWalletAddress] = useState('');
	const [importedPublicWalletAddressError, setImportedPublicWalletAddressError] = useState('');

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

	const onImportWalletSubmit = (e: FormEvent<HTMLFormElement>) => {
		const data = new FormData(e.target as HTMLFormElement);
		const walletData: unknown | undefined = data.get('wallet');
		const walletAddress = walletData ? String(walletData) : '';
		setImportedPublicWalletAddress(walletAddress);

		const isValid = validateWalletAddress(walletAddress);

		if (isValid) {
			setWalletAddress(walletAddress);
			closeModal();
		} else {
			setImportedPublicWalletAddressError('Arweave wallet is not valid.');
		}
	};

	const SelectWallet = () => (
		<>
			<ModalText>Get your personal stats by connecting with ArConnect or adding your wallet address.</ModalText>
			<ModalButtons>
				<ModalButton dark onClick={() => setShowWalletInput(true)}>
					Add Wallet Address
				</ModalButton>
				{isArconnectAvailable ? (
					<ModalButton onClick={() => connectToArconnect()}>
						<img alt='ArConnect Logo' src='/arconnect.png' width={22} height={22} />
						<span style={{ marginLeft: '16px' }}>ArConnect</span>
					</ModalButton>
				) : null}
			</ModalButtons>
		</>
	);

	const WalletInput = () => (
		<>
			<ModalText>Please enter your Arweave wallet address.</ModalText>
			<ImportWalletForm
				onSubmit={(e) => {
					e.preventDefault();
					onImportWalletSubmit(e);
				}}
			>
				<ImportWalletInput
					name='wallet'
					type='text'
					required
					minLength={43}
					maxLength={43}
					defaultValue={importedPublicWalletAddress}
				/>
				{importedPublicWalletAddressError ? (
					<ImportWalletErrorMessage>{importedPublicWalletAddressError}</ImportWalletErrorMessage>
				) : null}
				<ModalButton type='submit'>Import</ModalButton>
			</ImportWalletForm>
		</>
	);

	return (
		<ReactModal
			isOpen={isOpen}
			contentLabel='Connect Wallet'
			onRequestClose={() => closeModal()}
			className='react-modal-content'
			overlayClassName='react-modal-overlay'
		>
			<CloseModalButton onClick={() => closeModal()}>Close Modal</CloseModalButton>
			<ModalContent>{showWalletInput ? <WalletInput /> : <SelectWallet />}</ModalContent>
		</ReactModal>
	);
};

export default WalletModal;
