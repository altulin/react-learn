import { useState, useEffect } from 'react';
import FormPage from '../../components/form/FormPage';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../login/LoginPage.module.css';
import profile_styles from './ProfilePage.module.css';
import { Link, NavLink } from 'react-router-dom';
import path from '../../services/utils/paths';
import {
  getCookie,
  deleteCookie,
  createNewCookie,
} from '../../services/utils/cookie';
import {
  urlLogout,
  urlToken,
  urlProfile,
} from '../../services/utils/endpoints';
import {
  makePostRequest,
  makeGetRequest,
} from '../../services/actions/responseAuth';

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
  const [valueInput, setValueInput] = useState({
    email: '',
    password: '******',
    login: '',
  });

  useEffect(() => {
    getProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface Data {
    user: {
      email: string;
      name: string;
    };
  }

  const createNewData = (data: Data) => {
    const {
      user: { email, name },
    } = data;
    setValue({
      ...value,
      email: email,
      login: name,
    });
    setValueInput({
      ...valueInput,
      email: email,
      login: name,
    });
  };

  const getProfileData = async () => {
    if (getCookie('accessToken')) {
      makeGetRequest(urlProfile).then((res) => createNewData(res));
    } else {
      makePostRequest(urlToken, {
        token: getCookie('refreshToken'),
      }).then((res) => {
        createNewCookie(res);
      });

      // makeGetRequest(urlProfile).then((res) => createNewData(res));
    }
    // makeGetRequest(urlProfile).then((data) => {
    //   if (data.success) {
    //     createNewData(data);
    //   }
    // });
    // if (data.success) {
    // createNewData(data);
    // } else {

    // const res = await makePostRequest(urlToken, {
    //   token: getCookie('refreshToken'),
    // });
    // createNewCookie(res);
    // const dataNew = await makeGetRequest(urlProfile);
    // createNewData(dataNew);
    // }
  };

  const handleLogout = async () => {
    await makePostRequest(urlLogout, {
      token: getCookie('refreshToken'),
    });

    deleteCookie('refreshToken');
    deleteCookie('accessToken');
  };

  const handleClick = async (e: any) => {
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

  const cancelNewData = (e: any) => {
    const { email, login } = value;
    setValueInput({
      ...valueInput,
      email: email,
      login: login,
    });
  };

  const saveNewData = async (e: any) => {
    e.preventDefault();
    console.log(
      JSON.stringify({
        email: email,
        name: login,
      }),
    );

    try {
      const response = await fetch(urlProfile, {
        method: 'PATCH',

        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + getCookie('accessToken'),
        },
        body: JSON.stringify({ email: email, name: login }),
      });

      const json = await response.json();

      if (json.success) {
        return json;
      } else {
        console.log(json.message);
        return Promise.reject(`Ошибка ${json.status}`);
      }
    } catch (err) {
      console.error('Ошибка:', err);
    }
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
            <button
              className={`${profile_styles.cancel} text text_type_main-default`}
              onClick={cancelNewData}
            >
              Отмена
            </button>
            <Button type='primary' size='large' onClick={saveNewData}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </FormPage>
  );
};

export default ProfilePage;
