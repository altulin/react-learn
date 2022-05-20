import { useState, FC } from 'react';
import FormPage from '../../components/form/FormPage';
import path from '../../services/utils/paths';
import { loginUser } from '../../services/actions/checkUser';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './LoginPage.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const LoginPage: FC = () => {
  const { register, forgot } = path;
  const dispatch = useDispatch();

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

  // interface IhandleClick {}

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser(value));
  };

  return (
    <FormPage>
      <div className={styles.form_wrap}>
        <form onSubmit={handleClick}>
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
