import styles from './FormPage.module.css';
import { FC } from 'react';

interface FormPageProps {
  children?: React.ReactChild | React.ReactNode;
  newClass?: string;
}

const FormPage: FC<FormPageProps> = ({ children, newClass }) => {
  return (
    <main className={`${styles.main} ${styles[`${newClass}`]}`}>
      {children}
    </main>
  );
};

export default FormPage;
