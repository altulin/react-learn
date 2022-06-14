import { FC, useCallback, memo, useEffect, useState } from 'react';
import styles from './FeedPage.module.css';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { orders_all } from '../../services/utils/endpoints';
import { useSocket } from '../../services/utils/use-socket';
import { useSelector } from '../../index';
import Preload from '../../components/preload/Preload';
import { getDate } from '../../services/utils/date';
import paths from '../../services/utils/paths';
import { getDataCard } from '../../services/utils/dataCard';
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../../services/redux/actions/wsActionTypes';

interface ICard {
  name: string;
  number: number;
  dataTime: string;
  id: string;
  data: Array<{
    image: string;
    price: number;
  }>;
  pathname: string;
}

export const Card: FC<ICard> = memo(
  ({ name, number, dataTime, id, data, pathname }) => {
    const valImg = 6;
    const allImg = data.length;
    const location = useLocation();

    const { day, hours, minutes, gmt } = getDate(dataTime);

    return (
      <Link
        to={{
          pathname: `${pathname}/${id}`,
          state: { background: location },
        }}
        className={`${styles.card} p-6`}
      >
        <div className={`${styles.card_header}`}>
          <span className={`${styles.number} text text_type_digits-default`}>
            #{number}
          </span>
          <div
            className={`${styles.date} text text_type_main-default text_color_inactive`}
          >
            <span className={`${styles.day} mr-2`}>{day},</span>
            <span
              className={`${styles.time} mr-2`}
            >{`${hours}:${minutes}`}</span>
            <span className={`${styles.gmt}`}>GMT{gmt}</span>
          </div>
        </div>
        <h3 className={`${styles.card_title} text text_type_main-medium mt-6`}>
          {name}
        </h3>

        <div className={`${styles.bottom} mt-6`}>
          <ul className={`${styles.card_list}`}>
            {data.slice(0, valImg).map((elem, index: number) => (
              <li
                key={index}
                className={`${styles.card_item}`}
                style={{ zIndex: valImg - index }}
              >
                <figure className={`${styles.card_img_wrap}`}>
                  <img
                    className={`${styles.card_img}`}
                    src={elem.image}
                    alt='ингридиент'
                  />
                </figure>

                {index === valImg - 1 && (
                  <span
                    className={`${styles.card_index} text text_type_main-default`}
                  >
                    +{allImg - valImg + 1}
                  </span>
                )}
              </li>
            ))}
          </ul>

          <p className={`${styles.card_price}`}>
            <span className='text text_type_digits-default mr-2'>
              {data.map((item) => item.price).reduce((a, b) => a + b)}
            </span>

            <CurrencyIcon type='primary' />
          </p>
        </div>
      </Link>
    );
  },
);

interface IInfo {
  total: number;
  totalToday: number;
  infoDone: Array<Array<number>>;
  infoPending: Array<Array<number>>;
}

const Info: FC<IInfo> = memo(({ total, totalToday, infoDone, infoPending }) => {
  return (
    <>
      <div className={styles.info_header}>
        <div className={styles.info_header_left}>
          <h3
            className={`${styles.info_header_title} text text_type_main-medium`}
          >
            Готовы:
          </h3>
          <div className={styles.ready_list_wrap}>
            {infoDone.map((item: Array<number>, index: number) => (
              <ul key={index} className={styles.ready_list}>
                {item.map((elem: number, key: number) => (
                  <li key={key} className={styles.ready_item}>
                    <p
                      className={`${styles.ready_text} text text_type_digits-default`}
                    >
                      {elem}
                    </p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className={styles.info_header_right}>
          <h3
            className={`${styles.info_header_title} text text_type_main-medium`}
          >
            В работе:
          </h3>
          <div className={styles.ready_list_wrap}>
            {infoPending.map((item: Array<number>, index: number) => (
              <ul key={index} className={styles.inwork_list}>
                {item.map((elem: number, key: number) => (
                  <li key={key} className={styles.inwork_item}>
                    <p
                      className={`${styles.inwork_text} text text_type_digits-default`}
                    >
                      {elem}
                    </p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.alltime}>
        <h3 className={`${styles.alltime_title} text text_type_main-medium`}>
          Выполнено за все время:
        </h3>
        <p className={`${styles.alltime_text} text text_type_digits-large`}>
          {total}
        </p>
      </div>

      <div className={styles.today}>
        <h3 className={`${styles.today_title} text text_type_main-medium`}>
          Выполнено за сегодня:
        </h3>
        <p className={`${styles.today_text} text text_type_digits-large`}>
          {totalToday}
        </p>
      </div>
    </>
  );
});

export const FeelPage: FC = memo(() => {
  const { feed } = paths;

  const { listIngredients } = useSelector((store) => ({
    listIngredients: store.data.listIngredients,
  }));

  const { messages } = useSelector((store) => ({
    messages: store.wc.messages,
  }));

  const [state, setState] = useState<any>({
    success: false,
    orders: {},
    total: null,
    totalToday: null,
  });

  useEffect(() => {
    if (messages.success) {
      const { orders, total, totalToday } = messages;

      setState({ success: true, orders, total, totalToday });
    }
  }, [messages]); // eslint-disable-line

  // const getDataCard = (ingredients: Array<string>) => {
  //   return ingredients.map((id: string) => {
  //     const object = listIngredients.filter(
  //       (i: { _id: string }) => i._id === id,
  //     )[0];

  //     try {
  //       return {
  //         image: object.image,
  //         price: object.price,
  //       };
  //     } catch (e) {
  //       console.log(e);
  //       return {
  //         image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
  //         price: 100500,
  //       };
  //     }
  //   });
  // };

  const getDataInfo = (status: string) => {
    const list = state.orders
      .filter((item: any) => item.status === status)
      .map((item: any) => item.number);

    return new Array(Math.ceil(list.length / 10))
      .fill([])
      .map(() => list.splice(0, 10));
  };

  const getNormMessage = useCallback((e) => {
    const normalizedMessage = JSON.parse(e.data);
    if (normalizedMessage.success === true) {
      return normalizedMessage;
    }
  }, []);

  useSocket(orders_all, {
    onMessage: getNormMessage,
    typeSuccess: WS_CONNECTION_SUCCESS,
    typeError: WS_CONNECTION_ERROR,
    typeClosed: WS_CONNECTION_CLOSED,
    typeMesssage: WS_GET_MESSAGE,
  });

  return (
    <>
      {state.success ? (
        <main className={`${styles.main} container pt-10`}>
          <div className={styles.title_wrap}>
            <h1
              className={`${styles.list_title} text text_type_main-large mb-5`}
            >
              Лента заказов
            </h1>
          </div>

          <div className={styles.list_wrap}>
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
                  pathname={feed}
                />
              ))}
            </section>
            <section
              className={`${styles.list_block} ${styles.list_block_right}`}
            >
              <Info
                total={state.total}
                totalToday={state.totalToday}
                infoDone={getDataInfo('done')}
                infoPending={getDataInfo('pending')}
              />
            </section>
          </div>
        </main>
      ) : (
        <Preload />
      )}
    </>
  );
});
