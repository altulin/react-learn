import { FC } from 'react';
import styles from './FeedPage.module.css';
import { Link, useLocation } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSocket } from '../../services/utils/use-socket';

const Card: FC = () => {
  const location = useLocation();

  return (
    <Link
      to={{
        // pathname: `/feed/${id}`,
        state: { background: location },
      }}
      className={`${styles.card} p-6`}
    >
      <div className={`${styles.card_header}`}>
        <span className={`${styles.number} text text_type_digits-default`}>
          #034533
        </span>
        <div
          className={`${styles.date} text text_type_main-default text_color_inactive`}
        >
          <span className={`${styles.day} mr-2`}>Сегодня,</span>
          <span className={`${styles.time} mr20`}>16:20</span>
          <span className={`${styles.gmt}`}>i-GMT+3</span>
        </div>
      </div>
      <h3 className={`${styles.card_title} text text_type_main-medium mt-6`}>
        Death Star Starship Main бургер
      </h3>

      <div className={`${styles.bottom} mt-6`}>
        <ul className={`${styles.card_list}`}>
          <li className={`${styles.card_item}`}>
            <figure className={`${styles.card_img_wrap}`}>
              <img
                className={`${styles.card_img}`}
                src='https://code.s3.yandex.net/react/code/meat-04.png'
                alt='ингридиент'
              />
            </figure>
          </li>
          <li className={`${styles.card_item}`}>
            <figure className={`${styles.card_img_wrap}`}>
              <img
                className={`${styles.card_img}`}
                src='https://code.s3.yandex.net/react/code/meat-02.png'
                alt='ингридиент'
              />
            </figure>
          </li>
          <li className={`${styles.card_item}`}>
            <figure className={`${styles.card_img_wrap}`}>
              <img
                className={`${styles.card_img}`}
                src='https://code.s3.yandex.net/react/code/meat-03.png'
                alt='ингридиент'
              />
            </figure>
          </li>
        </ul>

        <p className={`${styles.card_price}`}>
          <span className='text text_type_digits-default mr-2'>560</span>

          <CurrencyIcon type='primary' />
        </p>
      </div>
    </Link>
  );
};

const Info: FC = () => {
  return (
    <>
      <div className={styles.info_header}>
        <div className={styles.info_header_left}>
          <h3
            className={`${styles.info_header_title} text text_type_main-medium`}
          >
            Готовы:
          </h3>
          <ul className={styles.ready_list}>
            <li className={styles.ready_item}>
              <p
                className={`${styles.ready_text} text text_type_digits-default`}
              >
                034533
              </p>
            </li>
            <li className={styles.ready_item}>
              <p
                className={`${styles.ready_text} text text_type_digits-default`}
              >
                034533
              </p>
            </li>
            <li className={styles.ready_item}>
              <p
                className={`${styles.ready_text} text text_type_digits-default`}
              >
                034533
              </p>
            </li>
            <li className={styles.ready_item}>
              <p
                className={`${styles.ready_text} text text_type_digits-default`}
              >
                034533
              </p>
            </li>
          </ul>
        </div>

        <div className={styles.info_header_right}>
          <h3
            className={`${styles.info_header_title} text text_type_main-medium`}
          >
            В работе:
          </h3>
          <ul className={styles.inwork_list}>
            <li className={styles.inwork_item}>
              <p
                className={`${styles.inwork_text} text text_type_digits-default`}
              >
                034533
              </p>
            </li>
            <li className={styles.inwork_item}>
              <p
                className={`${styles.inwork_text} text text_type_digits-default`}
              >
                034533
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.alltime}>
        <h3 className={`${styles.alltime_title} text text_type_main-medium`}>
          Выполнено за все время:
        </h3>
        <p className={`${styles.alltime_text} text text_type_digits-large`}>
          28 752
        </p>
      </div>

      <div className={styles.today}>
        <h3 className={`${styles.today_title} text text_type_main-medium`}>
          Выполнено за сегодня:
        </h3>
        <p className={`${styles.today_text} text text_type_digits-large`}>
          28 752
        </p>
      </div>
    </>
  );
};

const FeelPage: FC = () => {
  const { connect, options } = useSocket(
    'wss://norma.nomoreparties.space/orders/all',
  );

  connect();
  console.log(options);

  return (
    <main className={`${styles.main} container pt-10`}>
      <div className={styles.title_wrap}>
        <h1 className={`${styles.list_title} text text_type_main-large mb-5`}>
          Лента заказов
        </h1>
      </div>

      <div className={styles.list_wrap}>
        <section className={`${styles.list_block} ${styles.list_block_left}`}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
        <section className={`${styles.list_block} ${styles.list_block_right}`}>
          <Info />
        </section>
      </div>
    </main>
  );
};

export default FeelPage;
