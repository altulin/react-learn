import FormPage from '../../components/form/FormPage';
import path from '../../utils/paths';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const { register, forgot } = path;
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //
  };

  const valueEmail = '';
  const valuePassword = '';

  return (
    <FormPage>
      <div className={styles.form_wrap}>
        <form>
          <legend
            className={`${styles.legend} text text_type_main-medium mb-6`}
          >
            Вход
          </legend>

          <Input
            type={'email'}
            value={valueEmail}
            onChange={(e) => setValue(e)}
            placeholder={'E-mail'}
          />

          <Input
            type={'password'}
            value={valuePassword}
            onChange={(e) => setValue(e)}
            placeholder={'Пароль'}
          />

          <div className={`${styles.button_wrap} mt-6`}>
            <Button type='primary' size='large'>
              Войти
            </Button>
          </div>
        </form>
        <div
          className={`${styles.block} text text_type_main-default text_color_inactive`}
        >
          <p className={styles.text}>
            Вы — новый пользователь?
            <Link className={styles.link} to={`${register}`}>
              Зарегистрироваться
            </Link>
          </p>
          <p
            className={`${styles.text} text text_type_main-default text_color_inactive`}
          >
            Забыли пароль?
            <Link className={styles.link} to={`${forgot}`}>
              Восстановить пароль
            </Link>
          </p>
        </div>
      </div>
    </FormPage>
  );
};

export default LoginPage;
