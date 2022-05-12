import React from 'react';
import styles from './ModalOverlay.module.css';

interface ModalOverlayProps {
  onClose?: (e: React.MouseEvent) => void;
  detailClass?: string;
}

function ModalOverlay({ onClose, detailClass }: ModalOverlayProps) {
  return (
    <div
      className={`${styles.modal_cover} modal_cover ${
        styles[`${detailClass}`]
      }`}
      onClick={onClose}
    ></div>
  );
}

export default ModalOverlay;
