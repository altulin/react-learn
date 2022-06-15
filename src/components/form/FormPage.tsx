import styles from './FormPage.module.css';
import { FC, ReactNode } from 'react';

interface IUserPage {
  children?: ReactNode;
  newClass?: string;
  historyPage?: boolean;
}

const UserPage: FC<IUserPage> = ({ children, newClass, historyPage }) => {
  return (
    <main
      className={`${styles.main} ${styles[`${newClass}`]} ${
        historyPage && 'historyPage'
      }`}
    >
      {children}
    </main>
  );
};

export default UserPage;
