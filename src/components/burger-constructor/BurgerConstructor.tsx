import React from 'react';
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'

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
	products: {
		image_large: string,
		name: string,
		carbohydrates: number,
		fat: number,
		proteins: number,
		calories: number,
		_id: string,
		image: string,
		image_mobile: string,
		price: number,
		type: string,
	}[]
};

function BurgerConstructor({products, openModal}: BurgerConstructorProps) {

	const getList = () => {
		return  products.filter(item => item.type !== 'bun')
	}

		return (
			<section className={`constructor_section ${styles.constructor_section}`}>
				<div className={`${styles.constructor_header} ${styles.constructor_box}`}>
					<ButtonConstructor position/>
					<ConstructorElement
						text={`${products[0].name} (верх)`}
						price={products[0].price}
						thumbnail={products[0].image_mobile}
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
						text={`${products[0].name} (низ)`}
						price={products[0].price}
						thumbnail={products[0].image_mobile}
						type="bottom"
						isLocked={true}
					/>
				</div>

				<div className={styles.constructor_number}>
					<p className={`${styles.constructor_price_box} ${styles.constructor_number_box} mr-10`}>
						<span className={`${styles.constructor_price} text text_type_digits-medium`}>6100</span>
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
