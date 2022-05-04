import { useState, useEffect } from 'react';
import FormPage from '../../components/form/FormPage';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import profile_styles from './ProfilePage.module.css';
import { Link, NavLink } from 'react-router-dom';
import path from '../../utils/paths';
import { getCookie, deleteCookie } from '../../utils/cookie';
import { urlLogout, urlToken } from '../../utils/endpoints';

interface NavBlockProps {
  handleExit: (e: any) => void;
}

const NavBlock = ({ handleExit }: NavBlockProps) => {
  const { profile, profile_orders, main } = path;

  return (
    <div className={profile_styles.nav}>
      <NavLink
        exact
        to={{ pathname: `${profile}` }}
        className={`${profile_styles.link} text text_type_main-medium`}
        activeClassName={profile_styles.activeLink}
      >
        Профиль
      </NavLink>
      <NavLink
        exact
        to={{ pathname: `${profile_orders}` }}
        className={`${profile_styles.link} text text_type_main-medium`}
        activeClassName={profile_styles.activeLink}
      >
        История заказов
      </NavLink>
      <NavLink
        exact
        to={{ pathname: `${main}` }}
        className={`${profile_styles.link} text text_type_main-medium`}
        activeClassName={profile_styles.activeLink}
        onClick={handleExit}
      >
        Выход
      </NavLink>
      <p
        className={`${profile_styles.text} text text_type_main-default text_color_inactive`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
};

const ProfilePage = () => {
  const [value, setValue] = useState({ email: '', password: '', login: '' });

  useEffect(() => {
    // setValue({
    //   email: '1',
    //   password: '2',
    //   login: '3',
    // });
    // getProfile();
    getProfileDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProfileDate = () => {
    if (!getCookie('accessToken')) {
    }
  };

  async function handleClick(e: any) {
    e.preventDefault();

    try {
      const response = await fetch(urlLogout, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: getCookie('refreshToken'),
        }),
      });
      const json = await response.json();

      if (json.success) {
        console.log(json);
        deleteCookie('refreshToken');
        deleteCookie('accessToken');
        // const { refreshToken, accessToken } = json;
        // console.log(accessToken);

        // setCookie('refreshToken', refreshToken);
        // setCookie('accessToken', accessToken, lifeTime);

        // history.replace({ pathname: `${main}` });
      }
    } catch (err) {
      console.error('Ошибка:', err);
    }
  }

  const { email, password, login } = value;

  const getNewValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <FormPage>
      <div className={`${styles.form_wrap} ${profile_styles.form_wrap}`}>
        <NavBlock handleExit={handleClick}></NavBlock>
        <form>
          <Input
            type={'text'}
            value={email}
            onChange={(e) => getNewValues(e)}
            placeholder={'Имя'}
            icon={'EditIcon'}
            name={'email'}
          />

          <Input
            type={'text'}
            value={login}
            onChange={(e) => getNewValues(e)}
            placeholder={'Логин'}
            icon={'EditIcon'}
            name={'login'}
          />

          <Input
            type={'password'}
            value={password}
            onChange={(e) => getNewValues(e)}
            placeholder={'Пароль'}
            icon={'CloseIcon'}
            name={'password'}
          />
          <div className={`${profile_styles.button_wrap} mt-6`}>
            <Link
              to='/'
              className={`${profile_styles.cancel} text text_type_main-default`}
            >
              Отмена
            </Link>
            <Button type='primary' size='large'>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </FormPage>
  );
};

export default ProfilePage;
