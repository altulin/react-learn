import { useState } from 'react';
import FormPage from '../../components/form/FormPage';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import profile_styles from './ProfilePage.module.css';
import { Link, NavLink } from 'react-router-dom';
import path from '../../utils/paths';

const NavBlock = () => {
  const { profile } = path;

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
        to={{ pathname: '/profile/orders' }}
        className={`${profile_styles.link} text text_type_main-medium`}
        activeClassName={profile_styles.activeLink}
      >
        История заказов
      </NavLink>
      <NavLink
        exact
        to={{ pathname: '/profile/orders/:id' }}
        className={`${profile_styles.link} text text_type_main-medium`}
        activeClassName={profile_styles.activeLink}
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
  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valueLogin, setValueLogin] = useState('');

  return (
    <FormPage>
      <div className={`${styles.form_wrap} ${profile_styles.form_wrap}`}>
        <NavBlock></NavBlock>
        <form>
          <Input
            type={'text'}
            value={valueEmail}
            onChange={(e) => setValueEmail(e.target.value)}
            placeholder={'Имя'}
            icon={'EditIcon'}
          />

          <Input
            type={'text'}
            value={valueLogin}
            onChange={(e) => setValueLogin(e.target.value)}
            placeholder={'Логин'}
            icon={'EditIcon'}
          />

          <Input
            type={'password'}
            value={valuePassword}
            onChange={(e) => setValuePassword(e.target.value)}
            placeholder={'Пароль'}
            icon={'CloseIcon'}
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
