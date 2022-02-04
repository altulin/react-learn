import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/IngredientDetails'


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
					<BurgerCard open_modal={openModal} key={item._id} image={item.image} image_mobile={item.image_mobile} price={item.price} name={item.name} dataKey={item._id}/>
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
	open_modal: (e: React.MouseEvent) => void,
}


function BurgerCard({image, image_mobile, price, name, dataKey, open_modal}: BurgerCardProps) {

	return (
		<li className={`${styles.burger_item} ${styles.card}`}>
			<a href="/#" className={styles.card_link} onClick={open_modal} data-id={dataKey}>
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
	}[]
};


function BurgerIngredients({products}: BurgerIngredientsProps)  {

	const [state, setState] = React.useState(
		{
			visible: false,
			calories: 0,
			proteins: 0,
			fat: 0,
			carbohydrates: 0,
			name: '',
			image_large: ''
		})

	const handleOpenModal = (e: React.MouseEvent) => {
		let id = (e.currentTarget as HTMLElement).dataset.id;
		const element = products.filter((item)=> item._id === id)[0]

		setState(
			{
				visible: true,
				calories: element.calories,
				proteins: element.proteins,
				fat: element.fat,
				carbohydrates: element.carbohydrates,
				name: element.name,
				image_large: element.image_large,
			})
	}

	const handleCloseModal = () => {
		setState(
			{
				...state,
				visible: false
			})
	}

	const handlekeyPress = ({key} : KeyboardEvent) => {
		key === 'Escape' && handleCloseModal();
		return
	}



	return (
		<section className={styles.ingredients_section}>
				<h2 className={`${styles.ingredients_title} text text_type_main-large mb-5`}>Соберите бургер</h2>
				<TabBlock titleList={getTitleList(products)}/>
				<div className={styles.ingredients_inner}>

					{
						getTitleList(products).map((item,index) =>
							<BurgerBlock products={products} openModal={handleOpenModal} key={index}  type={item}/>
						)
					}
				</div>
				{state.visible && <IngredientDetails calories={state.calories} proteins={state.proteins} fat={state.fat} carbohydrates={state.carbohydrates} name={state.name} image_large={state.image_large} close={handleCloseModal} press_close={handlekeyPress}/>}
		</section>
	);
}

export default BurgerIngredients;
