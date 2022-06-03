import styles from './HistoryPage.module.css';
import { FC, useState, useEffect, useCallback } from 'react';
import UserPage from '../../components/form/FormPage';
import { NavBlock } from '../profile/ProfilePage';
import { urlLogout } from '../../services/utils/endpoints';
import { useSelector } from 'react-redux';
import {
  getCookie,
  deleteCookie,
  accessCookie,
  refreshCookie,
} from '../../services/utils/cookie';
import { checkResponse } from '../../services/redux/actions/response';
import { useDispatch } from 'react-redux';
import { USER_LOGOUT } from '../../services/redux/actions';
import { IStore } from '../../components/app/App';
import { orders_user } from '../../services/utils/endpoints';
import { requestWidthRefresh } from '../../services/redux/actions/checkUser';
import { urlProfile } from '../../services/utils/endpoints';
import { Dispatch } from 'redux';
import { useSocket } from '../../services/utils/use-socket';

const HistoryPage: FC = () => {
  const dispatch = useDispatch();

  const getNormMessage = useCallback((e) => {
    const normalizedMessage = JSON.parse(e.data);
    if (normalizedMessage.success === true) {
      return normalizedMessage;
    }
  }, []);

  // useSocket(orders_all, {
  //   onMessage: getNormMessage,
  // });

  // console.log(dispatch(checkUser()));

  // const getToken = () => {
  //   return function (dispatch: Dispatch) {
  //     return requestWidthRefresh(urlProfile, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: 'Bearer ' + getCookie(accessCookie),
  //       },
  //     })
  //       .then((res) => {

  //       })
  //       .catch(() => {});
  //   };
  // };?token=${accessToken}
  const accessToken = getCookie(accessCookie);

  useSocket(`${orders_user}?token=${accessToken}`, {
    onMessage: getNormMessage,
  });

  useEffect(() => {
    // console.log(getCookie(accessCookie));
    // getToken();
    // dispatch(checkUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [state, setState] = useState<any>({
    success: false,
    orders: {},
  });

  const { messages } = useSelector((store: IStore) => ({
    messages: store.wc.messages,
  }));

  // useEffect(() => {
  // if (messages.success) {
  // const { orders } = messages;

  // setState({ success: true, orders });

  // console.log(messages);
  // }
  // }, [messages]); // eslint-disable-line

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
