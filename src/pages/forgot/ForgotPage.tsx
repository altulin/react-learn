import React, { useState, FC } from 'react';
import FormPage from '../../components/form/FormPage';
import { useHistory } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import { Link } from 'react-router-dom';
import path from '../../services/utils/paths';
import { urlForgot } from '../../services/utils/endpoints';
import { checkResponse } from '../../services/redux/actions/response';

const ForgotPage: FC = () => {
  const { login, reset } = path;
  const history = useHistory();

  const [value, setValue] = useState({
    email: '',
  });

  const getNewValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const { email } = value;

  async function handleSuccess() {
    await fetch(urlForgot, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          history.replace({ pathname: `${reset}` });
        }
      });
  }

  async function handleClick(e: React.SyntheticEvent) {
    e.preventDefault();
    handleSuccess();
  }

  return (
    <FormPage>
      <div className={styles.form_wrap}>
        <form onSubmit={handleClick}>
          <legend
            className={`${styles.legend} text text_type_main-medium mb-6`}
          >
            Восстановление пароля
          </legend>

          <Input
            type={'email'}
            value={email}
            onChange={(e) => getNewValues(e)}
            placeholder={'Укажите e-mail'}
            name={'email'}
          />

          <div className={`${styles.button_wrap} mt-6`}>
            <Button type='primary' size='large'>
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
