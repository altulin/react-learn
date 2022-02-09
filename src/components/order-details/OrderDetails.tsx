import React from 'react';
import styles from './OrderDetails.module.css';
import Modal from '../modal/Modal'
import { OrderContext } from '../../services/orderContext';


interface OrderDetailsProps {
	close: () => void,
}

function OrderDetails({close}: OrderDetailsProps) {
	const orderNumber = React.useContext(OrderContext);
	return (
		<Modal onClose={close} >
			<h2 className={`${styles.title} text text_type_digits-large`}>{orderNumber}</h2>
			<p className={`${styles.id} text text_type_main-medium mt-8`}>идентификатор заказа</p>
			<figure className={`ml-0 mr-0 ${styles.img_wrap}`}>
			</figure>
			<p className={`${styles.info} text text_type_main-default`}>Ваш заказ начали готовить</p>
			<p className={`${styles.whait} text text_type_main-default text_color_inactive`}>Дождитесь готовности на орбитальной станции</p>
		</Modal>
	)
}

export default OrderDetails
