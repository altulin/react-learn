import styles from './FormPage.module.css';
import { FC, ReactNode } from 'react';

interface IUserPage {
  children?: ReactNode;
  newClass?: string;
}

const UserPage: FC<IUserPage> = ({ children, newClass }) => {
  return (
    <main className={`${styles.main} ${styles[`${newClass}`]}`}>
      {children}
    </main>
  );
};

export default UserPage;
