import React from 'react';
import styles from './ModalOverlay.module.css';

interface ModalOverlayProps {
  onClose?: (e: React.MouseEvent) => void;
}

function ModalOverlay({ onClose }: ModalOverlayProps) {
  return <div className={styles.modal_cover} onClick={onClose}></div>;
}

export default ModalOverlay;
