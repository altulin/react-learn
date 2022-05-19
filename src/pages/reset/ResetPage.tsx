import { useState, FC } from 'react';
import FormPage from '../../components/form/FormPage';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import { Link, useHistory } from 'react-router-dom';
import path from '../../services/utils/paths';
import { urlReset } from '../../services/utils/endpoints';
import { checkResponse } from '../../services/actions/response';

const ResetPage: FC = () => {
  const { login } = path;
  const history = useHistory();

  const [value, setValue] = useState({
    token: '',
    password: '',
  });

  const { token, password } = value;

  const getNewValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSuccess() {
    await fetch(urlReset, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          history.replace({ pathname: `${login}` });
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
            type={'password'}
            value={password}
            onChange={(e) => getNewValues(e)}
            placeholder={'Введите новый пароль'}
            name={'password'}
          />

          <Input
            type={'text'}
            value={token}
            onChange={(e) => getNewValues(e)}
            placeholder={'Введите код из письма'}
            name={'token'}
          />

          <div className={`${styles.button_wrap} mt-6`}>
            <Button type='primary' size='large'>
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
