import { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import ReactModal from 'react-modal';

import { TimeframeNames } from '@components/header';
import { BoxWrapper } from '@components/box';
import { ArrowDown, Checkmark } from '@components/icons';
import { CloseModalButton } from '@components/header/wallet_modal.style';

import type { TimeframeSelectorOptions } from '@contexts/timeframe_selector';
import TimeframeContext from '@contexts/timeframe_selector';

const TimeframeSelectorMobileWrapper = styled(BoxWrapper)`
	flex-direction: row;
	justify-content: space-between;
	padding-left: 1rem;
	padding-right: 1rem;
`;

const TimeframeButtonWrapper = styled.div`
	display: grid;
	height: 100%;
`;

type TimeframeButtonProps = {
	selected?: boolean;
};
const TimeframeButton = styled.button<TimeframeButtonProps>`
	all: unset;
	font-size: 1.125rem;
	font-weight: 400;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: ${({ selected }) => (selected ? '#1D1D1D' : 'transparent')};
	padding: 2rem 2.5rem;

	${({ selected }) =>
		!selected &&
		css`
			& > svg {
				display: none;
			}
		`}
`;

const TimeframeText = styled.p`
	font-size: 0.75rem;
	& > span {
		font-weight: 700;
	}
`;

const TimeframeSelectorMobileModal = ({ isOpen, closeModal }: { isOpen: boolean; closeModal: Function }) => {
	const [timeframe, setTimeframe] = useContext(TimeframeContext);
	const selectTimeframe = (timeframe: TimeframeSelectorOptions) => {
		setTimeframe(timeframe);
		closeModal();
	};

	return (
		<ReactModal
			isOpen={isOpen}
			contentLabel='Select timeframe'
			onRequestClose={() => closeModal()}
			className='react-modal-content'
			overlayClassName='react-modal-overlay'
		>
			<CloseModalButton onClick={() => closeModal()}>Close Modal</CloseModalButton>
			<TimeframeButtonWrapper>
				<TimeframeButton selected={timeframe === 'weekly'} onClick={() => selectTimeframe('weekly')}>
					{TimeframeNames['weekly']}
					<Checkmark />
				</TimeframeButton>
				<TimeframeButton selected={timeframe === 'lastWeek'} onClick={() => selectTimeframe('lastWeek')}>
					{TimeframeNames['lastWeek']}
					<Checkmark />
				</TimeframeButton>
				<TimeframeButton selected={timeframe === 'total'} onClick={() => selectTimeframe('total')}>
					{TimeframeNames['total']}
					<Checkmark />
				</TimeframeButton>
			</TimeframeButtonWrapper>
		</ReactModal>
	);
};

const TimeframeSelectorMobile = (): JSX.Element => {
	const [showModal, setShowModal] = useState(false);
	const [timeframe] = useContext(TimeframeContext);

	return (
		<>
			<TimeframeSelectorMobileWrapper onClick={() => setShowModal(true)}>
				<TimeframeText>
					Viewing results for <span>{TimeframeNames[timeframe]}</span>
				</TimeframeText>
				<ArrowDown color='#FAFAFA' />
			</TimeframeSelectorMobileWrapper>
			<TimeframeSelectorMobileModal isOpen={showModal} closeModal={() => setShowModal(false)} />
		</>
	);
};

export default TimeframeSelectorMobile;
