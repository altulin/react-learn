import React, { FC } from 'react';
import styles from './ModalOverlay.module.css';

interface IModalOverlay {
  onClose?: (e: React.MouseEvent) => void;
  detailClass?: string;
}

const ModalOverlay: FC<IModalOverlay> = ({ onClose, detailClass }) => {
  return (
    <div
      className={`${styles.modal_cover} modal_cover ${
        styles[`${detailClass}`]
      }`}
      onClick={onClose}
    ></div>
  );
};

export default ModalOverlay;
