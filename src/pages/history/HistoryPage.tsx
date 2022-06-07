import styles from './HistoryPage.module.css';
import { FC, useState, useEffect, useCallback } from 'react';
import UserPage from '../../components/form/FormPage';
import { NavBlock } from '../profile/ProfilePage';
import { urlLogout } from '../../services/utils/endpoints';
import { useSelector } from 'react-redux';
import {
  getCookie,
  deleteCookie,
  createNewCookie,
  accessCookie,
  refreshCookie,
} from '../../services/utils/cookie';
import { checkResponse } from '../../services/redux/actions/response';
import { useDispatch } from 'react-redux';
import { USER_LOGOUT } from '../../services/redux/actions';
import { IStore } from '../../components/app/App';
import { orders_user } from '../../services/utils/endpoints';
import { refreshToken } from '../../services/redux/actions/checkUser';
import { useSocket } from '../../services/utils/use-socket';
import paths from '../../services/utils/paths';
import { Card } from '../feed/FeedPage';
import { getDataCard } from '../../services/utils/dataCard';
import Preload from '../../components/preload/Preload';

const HistoryPage: FC = () => {
  const dispatch = useDispatch();
  const { profile_orders } = paths;

  const { listIngredients } = useSelector((store: IStore) => ({
    listIngredients: store.data.listIngredients,
  }));

  const getNormMessage = useCallback((e) => {
    const normalizedMessage = JSON.parse(e.data);
    if (normalizedMessage.success === true) {
      return normalizedMessage;
    } else if (normalizedMessage.message === 'Invalid or missing token') {
      refreshToken()
        .then((refresh) => {
          console.log(123);
          createNewCookie(refresh);

          // eslint-disable-next-line
          useSocket(`${orders_user}?token=${refresh.accessToken}`, {
            onMessage: getNormMessage,
          });

          return normalizedMessage.message;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const accessToken = getCookie(accessCookie);

  useSocket(`${orders_user}?token=${accessToken}`, {
    onMessage: getNormMessage,
  });

  const [state, setState] = useState<any>({
    success: false,
    orders: {},
  });

  const { messages } = useSelector((store: IStore) => ({
    messages: store.wc.messages,
  }));

  useEffect(() => {
    if (messages.success) {
      const { orders } = messages;

      setState({ success: true, orders });
    }
  }, [messages]); // eslint-disable-line

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
    <>
      {state.success ? (
        <UserPage historyPage={true}>
          <div className={`${styles.wrap} `}>
            <NavBlock handleExit={handleClick} />

            <section
              className={`${styles.list_block} ${styles.list_block_left}`}
            >
              {state.orders.map((item: any) => (
                <Card
                  key={item._id}
                  name={item.name}
                  number={item.number}
                  dataTime={item.createdAt}
                  id={item._id}
                  data={getDataCard(item.ingredients, listIngredients)}
                  pathname={profile_orders}
                />
              ))}
            </section>
          </div>
        </UserPage>
      ) : (
        <Preload />
      )}
    </>
  );
};

export default HistoryPage;
