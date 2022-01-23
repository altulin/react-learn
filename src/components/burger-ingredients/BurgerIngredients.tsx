import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import data  from '../../utils/data';

const translate = (type: string) => {
	let action;
	switch (type) {
				case "bun": {
						action = "Булки";
						break;
					}
				case "main": {
						action = "Начинка";
						break;
					}
				case "sauce": {
					action = "Соусы";
					break;
				}
		}
		return action;
}

const getTitleList = () => {
	return Array.from(new Set(data.map(item => item.type)))
}

const TabBlock = () => {
	const [current, setCurrent] = React.useState('one')

  return (
    <div style={{ display: 'flex' }} className={`${styles.tabs} ${styles.ingredients_tabs} mb-10`}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
				{translate(getTitleList()[0])}
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
			{translate(getTitleList()[1])}
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
			{translate(getTitleList()[2])}
      </Tab>
    </div>
  )
}


class BurgerBlock extends React.Component<{type: string}> {
	getBurgerList = () => {
		return data.filter(item => item.type === this.props.type)
	}

	render() {
		return (
			<div className={styles.ingredients_block}>
				<h3 className={`{styles.ingredients_subtitle} text text_type_main-medium mb-4`}>{translate(this.props.type)}</h3>
				<ul className={`${styles.burger_list}`}>
					{this.getBurgerList().map((item, index)=>
						<BurgerCard key={index} image={item.image} image_mobile={item.image_mobile} price={item.price} name={item.name}/>
					)}
				</ul>
			</div>
		)
	}
}


interface BurgerCardProps {
	image: string,
	image_mobile: string,
	price: number,
	name: string,
}


class BurgerCard extends React.Component<BurgerCardProps> {

	render() {
		return (
			<li className={`${styles.burger_item} ${styles.card}`}>
				<a href="/#" className={styles.card_link}>
					<figure className={styles.card_img_wrap}>
						<img  srcSet={`${this.props.image_mobile} 600w, ${this.props.image}`} src={this.props.image} alt="" width={240} height={120}/>
					</figure>
					<p className={styles.card_price_box}>
						<span className={`{styles.card_price} text text_type_digits-default`}>{this.props.price}</span>
						<CurrencyIcon type="primary" />
					</p>
					<h3 className={`{styles.card_title} text text_type_main-default`}>{this.props.name}</h3>
				</a>
			</li>
		)
	}
}


class BurgerIngredients extends React.Component {
	render() {
		return (
			<section className={styles.ingredients_section}>
				<h2 className={`${styles.ingredients_title} text text_type_main-large mb-5`}>Соберите бургер</h2>
				<TabBlock/>
				{
					getTitleList().map((item,index) =>
						<BurgerBlock key={index}  type={item}/>
					)
				}
			</section>
		);
	}
}

export default BurgerIngredients;
