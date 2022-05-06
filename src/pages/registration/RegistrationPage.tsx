import { useState } from 'react';
import FormPage from '../../components/form/FormPage';
import { createNewCookie } from '../../services/utils/cookie';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import { Link, useHistory } from 'react-router-dom';
import path from '../../services/utils/paths';
import { urlRegister } from '../../services/utils/endpoints';
import { makePostRequest } from '../../services/actions/responseAuth';

const RegistrationPage = () => {
  const { login } = path;
  const [value, setValue] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { name, email, password } = value;
  const history = useHistory();

  const getNewValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccess = async () => {
    makePostRequest(urlRegister, value).then((data) => {
      createNewCookie(data);
      history.replace({ pathname: `${login}` });
    });
  };

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
            Регистрация
          </legend>

          <Input
            type={'text'}
            value={name}
            onChange={(e) => getNewValues(e)}
            placeholder={'Имя'}
            name={'name'}
          />

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
