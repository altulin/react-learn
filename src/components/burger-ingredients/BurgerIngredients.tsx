import React from 'react';
import styles from './BurgerIngredients.module.css';
import Modal from '../modal/Modal'
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

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


class BurgerBlock extends React.Component<{type: string}> {
	getBurgerList = () => {
		return data.filter(item => item.type === this.props.type)
	}

	render() {
		return (
			<div className={styles.ingredients_block}>
				<h3 className={`{styles.ingredients_subtitle} text text_type_main-medium mb-4`}>{translate(this.props.type)}</h3>
				<ul className={`${styles.burger_list}`}>
					{this.getBurgerList().map((item)=>
						<BurgerCard key={item._id} image={item.image} image_mobile={item.image_mobile} price={item.price} name={item.name} data_key={item._id}/>
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
	data_key: number
}


function BurgerCard({image, image_mobile, price, name, data_key}: BurgerCardProps) {

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

		e.preventDefault();

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

	const modal = (
		<Modal onClose={handleCloseModal}>
			<h2 className="text text_type_main-large">Детали ингредиента</h2>

			<figure className={`mb-4 ${styles.modal_img_wrap}`}>
				<img className={styles.modal_img}  src={state.image_large} alt="" width={480} height={240}/>
			</figure>

			<h3 className={`${styles.modal_title} text text_type_main-medium mb-8`}>{state.name}</h3>

			<ul className={styles.modal_list}>
				<li className={styles.modal_text}>
					<span className={`text text_type_main-default text_color_inactive mb-2`}>Калории,ккал</span>
					<span className={`text text_type_main-default text_color_inactive`}>{state.calories}</span>
				</li>
				<li className={styles.modal_text}>
					<span className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</span>
					<span className={`text text_type_main-default text_color_inactive`}>{state.proteins}</span>
				</li>
				<li className={styles.modal_text}>
					<span className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</span>
					<span className={`text text_type_main-default text_color_inactive`}>{state.fat}</span>
				</li>
				<li className={styles.modal_text}>
					<span className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</span>
					<span className={`text text_type_main-default text_color_inactive`}>{state.carbohydrates}</span>
				</li>
			</ul>
		</Modal>
	)

	return (
		<li className={`${styles.burger_item} ${styles.card}`}>
			<a href="/#" className={styles.card_link} onClick={handleOpenModal} data-id={data_key}>
				<figure className={styles.card_img_wrap}>
					<img className={styles.card_img}  srcSet={`${image_mobile} 600w, ${image}`} src={image} alt="" width={240} height={120}/>
				</figure>
				<p className={styles.card_price_box}>
					<span className={`${styles.card_price} text text_type_digits-default mr-2`}>{price}</span>
					<CurrencyIcon type="primary" />
				</p>
				<h3 className={`${styles.card_title} text text_type_main-default`}>{name}</h3>
			</a>
			{state.visible && modal}
		</li>
	)
}

interface BurgerIngredientsProps{
	products: Array<any> | null
};




function BurgerIngredients({products}: BurgerIngredientsProps)  {
	if (products !== null) {
		data = products
	}

	return (
		<section className={styles.ingredients_section}>
				<h2 className={`${styles.ingredients_title} text text_type_main-large mb-5`}>Соберите бургер</h2>
				<TabBlock/>
				<div className={styles.ingredients_inner}>

					{

						getTitleList().map((item,index) =>
							<BurgerBlock key={index}  type={item}/>
						)
					}
				</div>
		</section>
	);
}

export default BurgerIngredients;
