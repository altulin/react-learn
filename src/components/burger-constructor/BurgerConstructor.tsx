import React from 'react';
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import data  from '../../utils/data';

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

class BurgerConstructor extends React.Component {

	getList = () => {
		return  data.filter(item => item.type !== 'bun')
	}

	render() {
		return (
			<section className={`constructor_section ${styles.constructor_section}`}>
				<div className={`${styles.constructor_header} ${styles.constructor_box}`}>
					{/* <BoxConstructor image={data[0].image_mobile} name={data[0].name} position_top/> */}
					<ButtonConstructor position/>
					<ConstructorElement
						text={`${data[0].name} (верх)`}
						price={data[0].price}
						thumbnail={data[0].image_mobile}
						type="top"
						isLocked={true}
					/>
				</div>

				<ul className={styles.constructor_list}>
					{this.getList().map((item)=>

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
						text={`${data[0].name} (низ)`}
						price={data[0].price}
						thumbnail={data[0].image_mobile}
						type="bottom"
						isLocked={true}
					/>
				</div>

				<div className={styles.constructor_number}>
					<p className={`${styles.constructor_price_box} ${styles.constructor_number_box} mr-10`}>
						<span className={`${styles.constructor_price} text text_type_digits-medium`}>6100</span>
						<CurrencyIcon type="primary" />
					</p>

					<Button type="primary" size="large">
						Оформить заказ
					</Button>
				</div>
			</section>
		);
	}
}

export default BurgerConstructor;
