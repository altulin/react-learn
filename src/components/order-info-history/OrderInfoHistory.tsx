import { FC, useState, useEffect, useCallback } from 'react';
import styles from '../order-info/OrderInfo.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../index';
import Preload from '../preload/Preload';
import { getDate } from '../../services/utils/date';
import { orders_user } from '../../services/utils/endpoints';
import { useSocket } from '../../services/utils/use-socket';
import {
  getCookie,
  createNewCookie,
  accessCookie,
} from '../../services/utils/cookie';

import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../../services/redux/actions/wsAction/wsActionConstants';

import { refreshToken } from '../../services/redux/actions/checkUser';

const OrderInfoHistory: FC = () => {
  const location = useLocation();

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
            typeSuccess: WS_CONNECTION_SUCCESS,
            typeError: WS_CONNECTION_ERROR,
            typeClosed: WS_CONNECTION_CLOSED,
            typeMesssage: WS_GET_MESSAGE,
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
    typeSuccess: WS_CONNECTION_SUCCESS,
    typeError: WS_CONNECTION_ERROR,
    typeClosed: WS_CONNECTION_CLOSED,
    typeMesssage: WS_GET_MESSAGE,
  });

  const { listIngredients } = useSelector((store) => ({
    listIngredients: store.data.listIngredients,
  }));

  const { messages } = useSelector((store) => ({
    messages: store.wc.messages,
  }));

  type TState = {
    success: boolean;
    status: string;
    name: string;
    number: number | null;
    ingredients: Array<string>;
    createdAt: string;
  };

  const [state, setState] = useState<TState>({
    success: false,
    status: '',
    name: '',
    number: null,
    ingredients: [],
    createdAt: '',
  });

  useEffect(() => {
    if (messages.success) {
      const { orders } = messages;

      const { status, name, number, ingredients, createdAt } =
        getIngredient(orders);
      setState({ success: true, status, name, number, ingredients, createdAt });
    }
  }, [messages]); // eslint-disable-line

  const { status, name, number, ingredients } = state;

  const getIngredient = (
    list: Array<{
      _id: string;
      status: string;
      name: string;
      number: number | null;
      ingredients: Array<string>;
      createdAt: string;
    }>,
  ) => {
    const id = location.pathname.split('/').pop();
    return list.filter((item: { _id: string }) => item._id === id)[0];
  };

  const statusRu = new Map([
    ['done', 'Выполнен'],
    ['pending', 'В работе'],
  ]);

  const getUniqueList = (arr: Array<string>) => {
    const unique = [...new Set(arr)];

    return unique.map((value) => {
      const elem = listIngredients.filter((item) => item._id === value)[0];

      try {
        return [
          value,
          arr.filter((str: string) => str === value).length,
          elem.price,
          elem.image,
        ];
      } catch (e) {
        return [
          value,
          1,
          10,
          'https://code.s3.yandex.net/react/code/sauce-01.png',
        ];
      }
    });
  };

  const getTotalPice = () => {
    return ingredients
      .map((id: string) => {
        return listIngredients.filter((i: { _id: string }) => i._id === id)[0]
          .price;
      })
      .reduce((a: number, b: any) => a + b);
  };

  return (
    <>
      {state.success ? (
        <div>
          <div
            className={`${styles.number} text text_type_digits-default mb-6 order_number`}
          >
            #{number}
          </div>
          <h2
            className={`${styles.card_title} text text_type_main-medium mt-6 mb-0`}
          >
            {name}
          </h2>
          <p
            className={`${styles.card_status} text text_type_main-default mt-1 mb-10`}
          >
            {statusRu.get(status)}
          </p>

          <div className={`${styles.consist} mb-8`}>
            <h3
              className={`${styles.consist_title} text text_type_main-medium mt-0 mb-6`}
            >
              Состав:
            </h3>
            <div className={`${styles.consist_list_wrap}`}>
              <ul className={`${styles.consist_list} mb-8`}>
                {getUniqueList(ingredients).map(
                  (item: Array<string | number | any>, index: number) => (
                    <li key={index} className={`${styles.consist_item}`}>
                      <figure className={`${styles.consist_img_wrap}`}>
                        <img
                          className={`${styles.consist_img}`}
                          src={item[3]}
                          alt='ингридиент'
                        />
                      </figure>
                      <h4
                        className={`${styles.consist_sub_title} text text_type_main-default ml-4`}
                      >
                        Флюоресцентная булка R2-D3
                      </h4>
                      <div className={`${styles.consist_info}`}>
                        <p
                          className={`${styles.consist_val} text text_type_digits-default`}
                        >
                          <span className={`${styles.consist_num}`}>
                            {item[1]}
                          </span>
                          <span className='ml-1 mr-1'>x</span>
                          <span className={`${styles.consist_price}`}>
                            {item[2]}
                          </span>
                        </p>
                        <CurrencyIcon type='primary' />
                      </div>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <div className={`${styles.card_header}`}>
            <div
              className={`${styles.date} text text_type_main-default text_color_inactive`}
            >
              <span className={`${styles.day} mr-2`}>
                {getDate(state.createdAt).day},
              </span>
              <span className={`${styles.time} mr-2`}>{`${
                getDate(state.createdAt).hours
              }:${getDate(state.createdAt).minutes}`}</span>
              <span className={`${styles.gmt}`}>
                GMT{getDate(state.createdAt).gmt}
              </span>
            </div>

            <p className={`${styles.card_price}`}>
              <span className='text text_type_digits-default mr-2'>
                {getTotalPice()}
              </span>

              <CurrencyIcon type='primary' />
            </p>
          </div>
        </div>
      ) : (
        <Preload />
      )}
    </>
  );
};

export default OrderInfoHistory;
