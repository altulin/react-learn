import styles from './FormPage.module.css';

interface FormPageProps {
  children?: React.ReactChild | React.ReactNode;
  newClass?: string;
}

const FormPage = ({ children, newClass }: FormPageProps) => {
  return (
    <main className={`${styles.main} ${styles[`${newClass}`]}`}>
      {children}
    </main>
  );
};

export default FormPage;
