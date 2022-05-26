import React, { useState, FC } from 'react';
import FormPage from '../../components/form/FormPage';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import profile_styles from './ProfilePage.module.css';
import { NavLink } from 'react-router-dom';
import path from '../../services/utils/paths';
import {
  getCookie,
  deleteCookie,
  accessCookie,
  refreshCookie,
} from '../../services/utils/cookie';
import { Dispatch } from 'redux';
import { urlLogout, urlProfile } from '../../services/utils/endpoints';
import { checkResponse } from '../../services/actions/response';
import { requestWidthRefresh } from '../../services/actions/checkUser';
import { useDispatch } from 'react-redux';
import { RootState } from '../../services/reducers/rootReducer';
import { useSelector } from 'react-redux';
import {
  USER_LOGOUT,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
} from '../../services/actions';

interface INavBlock {
  handleExit: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

const NavBlock: FC<INavBlock> = ({ handleExit }) => {
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

const ProfilePage: FC = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);

  const [value] = useState({
    email: data['email'] as string,
    password: '',
    login: data['name'] as string,
  });

  const [valueInput, setValueInput] = useState({
    email: data['email'] as string,
    password: '',
    login: data['name'] as string,
  });

  const handleLogout = async () => {
    await fetch(urlLogout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: getCookie(refreshCookie) }),
    })
      .then((res) => checkResponse(res))
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_LOGOUT,
          });
          deleteCookie(refreshCookie);
          deleteCookie(accessCookie);
        }
      });
  };

  const handleClick = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    handleLogout();
  };

  const { email, password, login } = valueInput;

  const getNewValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput({
      ...valueInput,
      [e.target.name]: e.target.value,
    });
  };

  const cancelNewData = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    const { email, login } = value;
    setValueInput({
      ...valueInput,
      email: email,
      login: login,
      password: '',
    });
  };

  const saveNewData = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(patchNewData());
  };

  const patchNewData = () => {
    return function (dispatch: Dispatch) {
      dispatch({
        type: UPDATE_USER_REQUEST,
      });

      return requestWidthRefresh(urlProfile, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie(accessCookie),
        },
        body: JSON.stringify({ email: email, name: login, password: password }),
      })
        .then((res) => {
          if (res) {
            dispatch({
              type: UPDATE_USER_SUCCESS,
              feed: { email: res.user.email, name: res.user.name },
            });
          }
        })
        .catch(() => {
          dispatch({
            type: UPDATE_USER_FAILED,
          });
        });
    };
  };

  return (
    <FormPage>
      <div className={`${styles.form_wrap} ${profile_styles.form_wrap}`}>
        <NavBlock handleExit={handleClick}></NavBlock>
        <form onSubmit={saveNewData}>
          <Input
            type={'text'}
            value={login}
            onChange={(e) => getNewValues(e)}
            placeholder={'Имя'}
            icon={'EditIcon'}
            name={'login'}
          />
          <Input
            type={'text'}
            value={email}
            onChange={(e) => getNewValues(e)}
            placeholder={'Логин'}
            icon={'EditIcon'}
            name={'email'}
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
            <button
              className={`${profile_styles.cancel} text text_type_main-default`}
              onClick={cancelNewData}
            >
              Отмена
            </button>
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
