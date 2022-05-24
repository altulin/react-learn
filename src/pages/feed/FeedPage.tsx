import { FC } from 'react';
import styles from './FeedPage.module.css';
import { Link, useLocation } from 'react-router-dom';

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
    </Link>
  );
};

const FeelPage: FC = () => {
  console.log(123);
  return (
    <main className={`${styles.main} container pt-10`}>
      <div className={styles.title_wrap}>
        <h1 className={`${styles.list_title} text text_type_main-large mb-5`}>
          Лента заказов
        </h1>
      </div>

      <div className={styles.list_wrap}>
        <section className={styles.list_block}>
          <Card />
        </section>
        <section className={`${styles.list_block}`}></section>
      </div>
    </main>
  );
};

export default FeelPage;
