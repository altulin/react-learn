import React from 'react';
import styles from './BurgerIngredients.module.css';
import { Tab, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { getFeed } from '../../utils/response';
import { RootState } from '../../services/reducers/rootReducer';



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
	const [current, setCurrent] = React.useState('bun')

	React.useEffect(() => {
		const element = document.querySelector(`.${current}`)
		if (element !== null) {
			element.scrollIntoView({behavior: "smooth"})
		}



	},[current])

	React.useEffect(() => {




	},[])


  return (
		<div className={`${styles.ingredients_tabs} mb-8`} >
			{
				titleList.map((item, index) =>
					<div key={index} data-tab={item}>
						<Tab value={item} active={current === item} onClick={setCurrent} >
							{translate(item)}
						</Tab>
					</div>
				)
			}
		</div>
  )
}


interface BurgerBlockProps {
	type: string,
	openModal: (e: React.MouseEvent) => void,
	myClass: string,
}

function BurgerBlock({type, openModal, myClass}: BurgerBlockProps) {
	const { productsIngredients } = useSelector((store: RootState) => ({
		productsIngredients: store.listIngredients,
	}));


	const getBurgerList = () => {
		return productsIngredients.filter((item:{type: string}) => item.type === type)
	}

	return (
		<div className={`${styles.ingredients_block} ${myClass}`} data-control data-class={`${myClass}`}>
			<h3 className={'text text_type_main-medium mb-4'}>{translate(type)}</h3>
			<ul className={`${styles.burger_list}`}>
				{getBurgerList().map((item:{_id: string, image: string, image_mobile: string, name: string, price: number})=>
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
	openModal : (e: React.MouseEvent)=>void
};


const BurgerIngredients = React.memo(function BurgerIngredients({openModal}: BurgerIngredientsProps)  {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getFeed());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);



	const { productsIngredients } = useSelector((store: RootState) => ({
		productsIngredients: store.listIngredients,
	}));

	const elem  = document.querySelector('.ingredients__inner');

	const handleScroll = ()=> {
		// const elem  = document.querySelector('.ingredients__inner');


		const switches  = Array.from(document.querySelectorAll('[data-control="true"]'));

		// const test = Math.min(...switches.map((item  => item.offsetTop))
		if (elem !==null) {

			// const test: Array<number> = switches.map(item => item !== null && (item as HTMLElement).offsetTop);
			const test = switches.map((item) => {
				if (item as HTMLElement !== null) {
					return (item as HTMLElement).offsetTop;
				}
			});

			test.forEach(elem => console.log(typeof elem))


			// console.log(Math.min(10, 20, 30))
		}



		// .indexOf(min);

		// if (switches !==null) {
			// console.log((elem_menu as HTMLElement).offsetTop);
		// }

		// console.log((elem_menu as HTMLElement).offsetTop - (elem as HTMLElement).scrollTop)

	};

	return (
		<section className={`${styles.ingredients_section} ingredients`}>
				<h2 className={`${styles.ingredients_title} text text_type_main-large mb-5`}>Соберите бургер</h2>
				<TabBlock titleList={getTitleList(productsIngredients)}/>
				<div className={`${styles.ingredients_inner} ingredients__inner`} onScroll={handleScroll}>

					{
						getTitleList(productsIngredients).map((item,index) =>
							<BurgerBlock myClass={item} openModal={openModal} key={index}  type={item}/>
						)
					}
				</div>
		</section>
	);
})

export default BurgerIngredients;
