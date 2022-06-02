import styles from './HistoryPage.module.css';
import { FC } from 'react';
import UserPage from '../../components/form/FormPage';
import { NavBlock } from '../profile/ProfilePage';
import { urlLogout } from '../../services/utils/endpoints';
import {
  getCookie,
  deleteCookie,
  accessCookie,
  refreshCookie,
} from '../../services/utils/cookie';
import { checkResponse } from '../../services/redux/actions/response';
import { useDispatch } from 'react-redux';
import { USER_LOGOUT } from '../../services/redux/actions';

const HistoryPage: FC = () => {
  const dispatch = useDispatch();
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
  return (
    <UserPage>
      <div className={`${styles.wrap} `}>
        <NavBlock handleExit={handleClick} />
      </div>
    </UserPage>
  );
};

export default HistoryPage;
