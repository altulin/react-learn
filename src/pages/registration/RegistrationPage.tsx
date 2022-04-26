import FormPage from '../../components/form/FormPage';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import { Link } from 'react-router-dom';
import path from '../../utils/paths';

const RegistrationPage = () => {
  const { login } = path;
  const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e);
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
            Регистрация
          </legend>

          <Input
            type={'text'}
            value={valueEmail}
            onChange={(e) => setValue(e)}
            placeholder={'Имя'}
          />

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
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <div
          className={`${styles.block} text text_type_main-default text_color_inactive`}
        >
          <p className={styles.text}>
            Уже зарегистрированы?
            <Link className={styles.link} to={`${login}`}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </FormPage>
  );
};

export default RegistrationPage;
