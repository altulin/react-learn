import React from 'react';
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { СonstructorContext } from '../../services/constructorContext';

type ButtonConstructorProps = {
	position?: boolean,
}

const ButtonConstructor = ({position}:ButtonConstructorProps) => {
	const hidden = styles.constructor_button_hidden
	return (
		<button className={`${styles.constructor_button} ${position? hidden : ""}`} type='button'>
			<span>меню</span>
			<DragIcon type="primary" />
		</button>
	)
}

interface BurgerConstructorProps{
	openModal: () => void,
};

function BurgerConstructor({openModal}: BurgerConstructorProps) {

	const productsConstructor = React.useContext(СonstructorContext);

	const getList = () => {
		return  productsConstructor.filter(item => item.type !== 'bun')
	}

	const getListBun = () => {
		return  productsConstructor.filter(item => item.type === 'bun')
	}

	const totalPrice = ()=> {
		let total = 0;
		productsConstructor.map(item => {
			return item.type === 'bun' ?  total += item.price * 2 :  total += item.price
		})
		return total
	}

		return (
			<section className={`constructor_section ${styles.constructor_section}`}>
				<div className={`${styles.constructor_header} ${styles.constructor_box}`}>
					<ButtonConstructor position/>
					<ConstructorElement
						text={`${getListBun()[0].name} (верх)`}
						price={getListBun()[0].price}
						thumbnail={getListBun()[0].image_mobile}
						type="top"
						isLocked={true}
					/>
				</div>

				<ul className={styles.constructor_list}>
					{getList().map((item)=>

						<li key={item._id} className={`constructor_item ${styles.constructor_box}`}>
							<ButtonConstructor/>
							<ConstructorElement
								text={item.name}
								price={item.price}
								thumbnail={item.image_mobile}
								isLocked={false}
							/>
						</li>
					)}
				</ul>

				<div className={`${styles.constructor_footer} ${styles.constructor_box}`}>
					<ButtonConstructor position/>
					<ConstructorElement
						text={`${getListBun()[0].name} (низ)`}
						price={getListBun()[0].price}
						thumbnail={getListBun()[0].image_mobile}
						type="bottom"
						isLocked={true}
					/>
				</div>

				<div className={styles.constructor_number}>
					<p className={`${styles.constructor_price_box} ${styles.constructor_number_box} mr-10`}>
						<span className={`${styles.constructor_price} text text_type_digits-medium`}>{totalPrice()}</span>
						<CurrencyIcon type="primary" />
					</p>

					<Button type="primary" size="large" onClick={openModal}>
						Оформить заказ
					</Button>
				</div>
			</section>
		);
	}


export default BurgerConstructor;
