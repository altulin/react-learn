import React from 'react';
import FormPage from '../../components/form/FormPage';
import { useHistory } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import { Link } from 'react-router-dom';
import path from '../../utils/paths';
const URL = 'https://norma.nomoreparties.space/api/password-reset';

const ForgotPage = () => {
  const { login, reset } = path;
  const history = useHistory();
  const [value, setValue] = React.useState('');

  const handleClick = (e: any) => {
    e.preventDefault();
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: value,
      }),
    })
      .then((data) => {
        // console.log(data);
        history.replace({ pathname: `${reset}` });
      })
      .catch((e) => console.log(e));
  };

  return (
    <FormPage>
      <div className={styles.form_wrap}>
        <form>
          <legend
            className={`${styles.legend} text text_type_main-medium mb-6`}
          >
            Восстановление пароля
          </legend>

          <Input
            type={'email'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={'Укажите e-mail'}
          />

          <div className={`${styles.button_wrap} mt-6`}>
            <Button type='primary' size='large' onClick={handleClick}>
              Восстановить
            </Button>
          </div>
        </form>
        <div
          className={`${styles.block} text text_type_main-default text_color_inactive`}
        >
          <p className={styles.text}>
            Вспомнили пароль?
            <Link className={styles.link} to={`${login}`}>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </FormPage>
  );
};

export default ForgotPage;
