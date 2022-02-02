import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay'

const modalRoot = document.querySelector(".modal-root") as HTMLElement

interface ModalProps {
	children: React.ReactNode,
	onClose?: (e: React.MouseEvent) => void,
	onPressClose: ({key} : KeyboardEvent) => void,
}

function Modal({children, onClose, onPressClose}: ModalProps) {

	 React.useEffect(()=>{
    document.addEventListener("keydown", onPressClose);

    return () => {
      document.removeEventListener("keydown", onPressClose);
    }
		// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

	return ReactDOM.createPortal(
		<>
			<div className={styles.inner}>
				<button className={styles.close} onClick={onClose}></button>
				{children}
			</div>
			<ModalOverlay onClose={onClose}/ >
		</>,
		modalRoot
	)
}

export default Modal;
