import React from 'react';
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, LockIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components'
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

type StatusConstructorProps = {
	position?: boolean
}

const StatusConstructor = ({position}: StatusConstructorProps) => {
	const lock = (<span className={styles.constructor_status}>
		<LockIcon type="secondary"/>
	</span>)
	const del = (<span className={styles.constructor_status}>
		<DeleteIcon type="primary" />
	</span>)
	return position?lock:del

}



class BoxConstructor extends React.Component<BoxConstructorProps> {
	constructor(props :BoxConstructorProps) {
		super(props);
		this.state = {
			top: false,
			bottom: false
		}
	}

	top_style = styles.constructor_content_top;
	bottom_style = styles.constructor_content_bottom;

	render() {
		return (
				<>
					<ButtonConstructor position={this.props.position_top || this.props.position_bottom ?true:false}/>

					<div className={`${styles.constructor_content} ${this.props.position_top ? this.top_style : ''} ${this.props.position_bottom ? this.bottom_style : ''}`}>
						<figure className={styles.constructor_img_wrap}>
							<img className={styles.constructor_img} src={this.props.image} alt="" width={80} height={40}/>
						</figure>
						<h3 className={`${styles.constructor_title} text text_type_main-default`}>{this.props.name} {this.props.position_top ? '(верх)':''} {this.props.position_bottom ? '(низ)':''}</h3>
						<p className={styles.constructor_price_box}>
							<span className={`${styles.constructor_price} text text_type_digits-default mr-2`}>30</span>
							<CurrencyIcon type="primary" />
						</p>
						<StatusConstructor position={this.props.position_top || this.props.position_bottom ?true:false}/>
					</div>
				</>
		)
	}
}

interface BoxConstructorProps {
	image: string,
	position_top?: boolean,
	position_bottom?: boolean,
	name: string,
}

class BurgerConstructor extends React.Component {

	getList = () => {
		return  data.filter(item => item.type !== 'bun')
	}

	render() {
		return (
			<section className={styles.constructor_section}>
				<div className={`${styles.constructor_header} ${styles.constructor_box}`}>
					<BoxConstructor image={data[0].image_mobile} name={data[0].name} position_top/>
				</div>

				<ul className={styles.constructor_list}>
					{this.getList().map((item)=>

						<li key={item._id} className={`${styles.constructor_item} ${styles.constructor_box}`}>
							<BoxConstructor image={item.image_mobile} name={item.name}/>
						</li>
					)}


				</ul>

				<div className={`${styles.constructor_footer} ${styles.constructor_box}`}>
					<BoxConstructor image={data[0].image_mobile} name={data[0].name} position_bottom/>
				</div>

				<div className={styles.constructor_number}>
					<p className={`${styles.constructor_price_box} ${styles.constructor_number_box} mr-10`}>
						<span className={`${styles.constructor_price} text text_type_digits-medium`}>6100</span>
						<CurrencyIcon type="primary" />
					</p>
					<button className={`${styles.constructor_number_btn} text text_type_main-default`}>Оформить заказ</button>
				</div>

			</section>
		);
	}
}

export default BurgerConstructor;
