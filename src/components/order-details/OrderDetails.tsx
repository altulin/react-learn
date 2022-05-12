import styles from './OrderDetails.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers/rootReducer';

function OrderDetails() {
  const { orderNumber } = useSelector((store: RootState) => ({
    orderNumber: store.data.orderNumber,
  }));

  return (
    <>
      <h2 className={`${styles.title} text text_type_digits-large`}>
        {orderNumber || 0}
      </h2>
      <p className={`${styles.id} text text_type_main-medium mt-8`}>
        идентификатор заказа
      </p>

      <figure className={`ml-0 mr-0 ${styles.img_wrap}`}></figure>
      <p className={`${styles.info} text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p
        className={`${styles.whait} text text_type_main-default text_color_inactive`}
      >
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;
