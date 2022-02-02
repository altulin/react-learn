import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector(".modal-root") as HTMLElement

interface ModalProps {
	children: React.ReactNode,
	onClose?: (e: React.MouseEvent) => void,
	onPressClose: ({key} : KeyboardEvent) => void,
}

function Modal({children, onClose, onPressClose}: ModalProps) {

	 React.useEffect(()=>{
    // Устанавливаем слушатель события при монтировании
    document.addEventListener("keydown", onPressClose);

    // Сбрасываем слушатель события при удалении компонента из DOM
    return () => {
      document.removeEventListener("keydown", onPressClose);
    }
  }, [])





	return ReactDOM.createPortal(
		<>
			<div className={styles.inner}>
				<button className={styles.close} onClick={onClose}></button>
				{children}
			</div>
			<div className={styles.modal_cover} onClick={onClose}></div>
		</>,
		modalRoot
	)
}

export default Modal;
