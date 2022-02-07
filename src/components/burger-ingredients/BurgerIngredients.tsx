import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'


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



const getTitleList = (list: {
	image: string,
	image_mobile: string,
	name: string,
	price: number,
	type: string,
	_id: string,
	}[]) => {
	return Array.from(new Set(list.map(item => item.type)))
}

interface TabBlockProps {
	titleList: string[],
}



const TabBlock = ({titleList}: TabBlockProps) => {
	const [current, setCurrent] = React.useState('one')

  return (
		<div style={{ display: 'flex' }} className={`${styles.ingredients_tabs} mb-8`}>
			{
				titleList.map((item, index) =>
					<Tab value={item} active={current === item} onClick={setCurrent} key={index}>
						{translate(item)}
					</Tab>
				)
			}
		</div>
  )
}


interface BurgerBlockProps {
	type: string,
	openModal: (e: React.MouseEvent) => void,
	products: {
		image: string,
		image_mobile: string,
		name: string,
		price: number,
		type: string,
		_id: string,
	}[],
}

function BurgerBlock({type, openModal, products}: BurgerBlockProps) {

	const getBurgerList = () => {
		return products.filter(item => item.type === type)
	}

	return (
		<div className={styles.ingredients_block}>
			<h3 className={`{styles.ingredients_subtitle} text text_type_main-medium mb-4`}>{translate(type)}</h3>
			<ul className={`${styles.burger_list}`}>
				{getBurgerList().map((item)=>
					<BurgerCard openModal={openModal} key={item._id} image={item.image} image_mobile={item.image_mobile} price={item.price} name={item.name} dataKey={item._id}/>
				)}
			</ul>
		</div>
	)
}

interface BurgerCardProps {
	image: string,
	image_mobile: string,
	price: number,
	name: string,
	dataKey: string
	openModal: (e: React.MouseEvent) => void,
}


function BurgerCard({image, image_mobile, price, name, dataKey, openModal}: BurgerCardProps) {

	return (
		<li className={`${styles.burger_item} ${styles.card}`}>
			<a href="/#" className={styles.card_link} onClick={openModal} data-id={dataKey}>
				<figure className={styles.card_img_wrap}>
					<img className={styles.card_img}  srcSet={`${image_mobile} 600w, ${image}`} src={image} alt="" width={240} height={120}/>
				</figure>
				<p className={styles.card_price_box}>
					<span className={`${styles.card_price} text text_type_digits-default mr-2`}>{price}</span>
					<CurrencyIcon type="primary" />
				</p>
				<h3 className={`${styles.card_title} text text_type_main-default`}>{name}</h3>
			</a>

		</li>
	)
}

interface BurgerIngredientsProps{
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
	}[],
	openModal : (e: React.MouseEvent)=>void
};


function BurgerIngredients({products, openModal}: BurgerIngredientsProps)  {
	return (
		<section className={styles.ingredients_section}>
				<h2 className={`${styles.ingredients_title} text text_type_main-large mb-5`}>Соберите бургер</h2>
				<TabBlock titleList={getTitleList(products)}/>
				<div className={styles.ingredients_inner}>

					{
						getTitleList(products).map((item,index) =>
							<BurgerBlock products={products} openModal={openModal} key={index}  type={item}/>
						)
					}
				</div>
		</section>
	);
}

export default BurgerIngredients;
