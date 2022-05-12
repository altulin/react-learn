import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';
import ModalOverlay from '../modal-overlay/ModalOverlay';

const modalRoot = document.querySelector('.modal-root') as HTMLElement;

interface ModalProps {
  children: React.ReactNode;
  close: () => void;
  detailClass?: string;
}

function Modal({ children, close, detailClass }: ModalProps) {
  React.useEffect(() => {
    const handlekeyPress = ({ key }: KeyboardEvent) => {
      if (key === 'Escape') {
        close();
      }
      return;
    };

    document.addEventListener('keydown', handlekeyPress);

    return () => {
      document.removeEventListener('keydown', handlekeyPress);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <>
      <div className={`${styles.inner} ${styles[`${detailClass}`]}`}>
        <button className={styles.close} onClick={close}></button>
        {children}
      </div>
      <ModalOverlay onClose={close} detailClass={detailClass} />
    </>,
    modalRoot,
  );
}

export default Modal;
