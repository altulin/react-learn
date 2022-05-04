import { useState } from 'react';
import FormPage from '../../components/form/FormPage';
import path from '../../utils/paths';
import { urlLogin } from '../../utils/endpoints';
import { setCookie, lifeTime } from '../../utils/cookie';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './LoginPage.module.css';
import { Link, useHistory } from 'react-router-dom';
import { getData } from '../../utils/getData';

const LoginPage = () => {
  const { register, forgot, main } = path;
  const history = useHistory();

  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const { email, password } = value;

  const getNewValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSuccess() {
    const data = await getData(urlLogin, value);
    const { refreshToken, accessToken } = data;

    setCookie('refreshToken', refreshToken);
    setCookie('accessToken', accessToken, lifeTime);
    history.replace({ pathname: `${main}` });
  }

  async function handleClick(e: any) {
    e.preventDefault();
    handleSuccess();
  }

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
            value={email}
            onChange={(e) => getNewValues(e)}
            placeholder={'E-mail'}
            name={'email'}
          />

          <Input
            type={'password'}
            value={password}
            onChange={(e) => getNewValues(e)}
            placeholder={'Пароль'}
            name={'password'}
          />

          <div className={`${styles.button_wrap} mt-6`}>
            <Button type='primary' size='large' onClick={handleClick}>
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
