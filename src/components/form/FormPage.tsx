import styles from './FormPage.module.css';
import { FC, ReactNode } from 'react';

interface IFormPage {
  children?: ReactNode;
  newClass?: string;
}

const FormPage: FC<IFormPage> = ({ children, newClass }) => {
  return (
    <main className={`${styles.main} ${styles[`${newClass}`]}`}>
      {children}
    </main>
  );
};

export default FormPage;
