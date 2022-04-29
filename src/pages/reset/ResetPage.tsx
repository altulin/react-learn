import { useState } from 'react';
import FormPage from '../../components/form/FormPage';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import { Link } from 'react-router-dom';
import path from '../../utils/paths';
import { urlReset } from '../../utils/endpoints';

const ResetPage = () => {
  const { login } = path;

  const [valuePassword, setValuePassword] = useState('');
  const [valueToken, setValueToken] = useState('');

  async function handleClick(e: any) {
    e.preventDefault();

    try {
      const response = await fetch(urlReset, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: valuePassword,
          token: valueToken,
        }),
      });
      const json = await response.json();

      if (json.success) {
        console.log(json);
      }
    } catch (err) {
      console.error('Ошибка:', err);
    }
  }

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
            type={'password'}
            value={valuePassword}
            onChange={(e) => setValuePassword(e.target.value)}
            placeholder={'Введите новый пароль'}
          />

          <Input
            type={'text'}
            value={valueToken}
            onChange={(e) => setValueToken(e.target.value)}
            placeholder={'Введите код из письма'}
          />

          <div className={`${styles.button_wrap} mt-6`}>
            <Button type='primary' size='large' onClick={handleClick}>
              Сохранить
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

export default ResetPage;
