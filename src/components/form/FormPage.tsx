import styles from './FormPage.module.css';

interface FormPageProps {
  children?: React.ReactChild | React.ReactNode;
}

const FormPage = ({ children }: FormPageProps) => {
  return <main className={styles.main}>{children}</main>;
};

export default FormPage;
