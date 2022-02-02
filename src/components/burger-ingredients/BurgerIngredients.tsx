import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientDetails from '../ingredient-details/IngredientDetails'

let data: Array<any> = [];


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
    <div style={{ display: 'flex' }} className={`${styles.ingredients_tabs} mb-8`}>
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


interface BurgerBlockProps {
	type: string,
	open_modal: (e: React.MouseEvent) => void,
}

function BurgerBlock({type, open_modal}: BurgerBlockProps) {

	const getBurgerList = () => {
		return data.filter(item => item.type === type)
	}

	return (
		<div className={styles.ingredients_block}>
			<h3 className={`{styles.ingredients_subtitle} text text_type_main-medium mb-4`}>{translate(type)}</h3>
			<ul className={`${styles.burger_list}`}>
				{getBurgerList().map((item)=>
					<BurgerCard open_modal={open_modal} key={item._id} image={item.image} image_mobile={item.image_mobile} price={item.price} name={item.name} data_key={item._id}/>
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
	data_key: number
	open_modal: (e: React.MouseEvent) => void,
}


function BurgerCard({image, image_mobile, price, name, data_key, open_modal}: BurgerCardProps) {

	return (
		<li className={`${styles.burger_item} ${styles.card}`}>
			<a href="/#" className={styles.card_link} onClick={open_modal} data-id={data_key}>
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
	products: Array<any> | null
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
		const element = data.filter((item)=> item._id === id)[0]

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

	const GetData = () => {
		if (products !== null) {
			data = products
		}
	};

	const handlekeyPress = ({key} : KeyboardEvent) => {
		key === 'Escape' && handleCloseModal();
		return
	}

	GetData();

	return (
		<section className={styles.ingredients_section}>
				<h2 className={`${styles.ingredients_title} text text_type_main-large mb-5`}>Соберите бургер</h2>
				<TabBlock/>
				<div className={styles.ingredients_inner}>

					{
						getTitleList().map((item,index) =>
							<BurgerBlock open_modal={handleOpenModal} key={index}  type={item}/>
						)
					}
				</div>
				{state.visible && <IngredientDetails calories={state.calories} proteins={state.proteins} fat={state.fat} carbohydrates={state.carbohydrates} name={state.name} image_large={state.image_large} close={handleCloseModal} press_close={handlekeyPress}/>}
		</section>
	);
}

export default BurgerIngredients;
