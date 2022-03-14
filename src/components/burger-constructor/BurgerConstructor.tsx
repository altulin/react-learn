import React from 'react';
import { useDrop, useDrag } from "react-dnd";
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import {LIST_CURRENT_INGREDIENTS, CHANGE_LIST_CURRENT_INGREDIENTS} from '../../services/actions';
import { RootState } from '../../services/reducers/rootReducer';
const BUN = 'bun';

type ButtonConstructorProps = {
	position?: boolean,
}

const ButtonConstructor = ({position}:ButtonConstructorProps) => {
	const hidden = styles.constructor_button_hidden
	return (
		<button className={`${styles.constructor_button} ${position? hidden : ""}`} type='button'>
			<span>меню</span>
			<DragIcon type="primary"/>
		</button>
	)
}

type ConstructorItemProps = {
	_id: string,
	name: string,
	price: number,
	image_mobile: string,
	i: number,
}


const ConstructorItem = ({_id, name, price, image_mobile, i}: ConstructorItemProps) => {
	const dispatch = useDispatch();

	let { constructorList } = useSelector((store: RootState) => ({
		constructorList: store.listConstructor,
	}));


	const handleRemove = (i: number) => {
		constructorList.splice(i,1);
		dispatch({
			type: LIST_CURRENT_INGREDIENTS,
			feed: constructorList,
		})
	}

	const [, dragRefConstructor] = useDrag({
		type: 'constructor',
		item: {_id},
	});

	return (
		<li className={`constructor_item ${styles.constructor_box}`} data-_id={_id} ref={dragRefConstructor}>
			<ButtonConstructor/>
			<ConstructorElement
				text={name}
				price={price}
				thumbnail={image_mobile}
				isLocked={false}
				handleClose={()=>{handleRemove(i)}}
			/>
		</li>
	)
}

interface BurgerConstructorProps{
	openModal: () => void,
};

function BurgerConstructor({openModal}: BurgerConstructorProps) {

	const dispatch = useDispatch();

	const getTitleList = (list: {type: string}[]) => {
		return Array.from(new Set(list.map(item => item.type)))
	}


	const { productsIngredients } = useSelector((store: RootState) => ({
		productsIngredients: store.listIngredients,
	}));



	const [, refTarget] = useDrop({
		accept: getTitleList(productsIngredients),
		drop(item: {id: string}) {
			onDropHandler(item.id)
		},
	});

	const [, refConstructorTarget] = useDrop({
		accept: 'constructor',
		drop(item: {_id: string}) {
			onDropHover(item._id)
		},
	});

	let { constructorList } = useSelector((store: RootState) => ({
		constructorList: store.listConstructor,
	}));


	const onDropHover = (idElem: string) => {
		console.log(idElem)
	}


	const onDropHandler = (id: string ) => {
		const newItem = productsIngredients.filter((item: {_id: string}) => item._id === id)[0];

		if (newItem.type === BUN) {
			constructorList = constructorList.filter((item: {type: string}) => item.type !== BUN);
			constructorList.push(newItem);
		} else {
			constructorList.splice(-1, 0, newItem);
		}

		dispatch({
			type: CHANGE_LIST_CURRENT_INGREDIENTS,
			feed: constructorList,
		})
	}




	// стартовый лист для конструктора
  React.useEffect(() => {
    const list = []

    list.push(productsIngredients.filter((item: {type: string}) => item.type === 'main').splice(6));
    list.push(productsIngredients.filter((item: {type: string}) => item.type === 'sauce'));
		list.push(productsIngredients.filter((item: {type: string}) => item.type === BUN).splice(1));

		dispatch({
			type: LIST_CURRENT_INGREDIENTS,
			feed: list.flat(),
		})


    //eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productsIngredients])




	const getList = () => {
		return  constructorList.filter((item: {type: string}) => item.type !== BUN)
	}

	const getListBun = () => {
		return  constructorList.filter((item: {type: string}) => item.type === BUN)
	}

	const totalPrice = ()=> {
		let total = 0;
		constructorList.map((item: {type: string, price: number}) => {
			return item.type === BUN ?  total += item.price * 2 :  total += item.price
		})
		return total
	}

		return (
			<section className={`constructor_section ${styles.constructor_section}`} ref={refTarget}>
				<div className={`${styles.constructor_header} ${styles.constructor_box}`} >
					<ButtonConstructor position/>
					{constructorList.length > 0 && <ConstructorElement
						text={`${getListBun()[0].name} (верх)`}
						price={getListBun()[0].price}
						thumbnail={getListBun()[0].image_mobile}
						type="top"
						isLocked={true}
					/>}
				</div>

				<ul className={styles.constructor_list} ref={refConstructorTarget}>
					{getList().map( (item: {price: number, _id: string, name: string, image_mobile: string}, i:number) =>

						<ConstructorItem key={i} price={item.price} name={item.name} _id={item._id} i={i} image_mobile={item.image_mobile} />

					)}
				</ul>

				<div className={`${styles.constructor_footer} ${styles.constructor_box}`}>
					<ButtonConstructor position/>
					{constructorList.length > 0 &&<ConstructorElement
						text={`${getListBun()[0].name} (низ)`}
						price={getListBun()[0].price}
						thumbnail={getListBun()[0].image_mobile}
						type="bottom"
						isLocked={true}
					/>}
				</div>

				<div className={styles.constructor_number}>
					<p className={`${styles.constructor_price_box} ${styles.constructor_number_box} mr-10`}>
						<span className={`${styles.constructor_price} text text_type_digits-medium`}>{totalPrice()}</span>
						<CurrencyIcon type="primary" />
					</p>

					<Button type="primary" size="large" onClick={()=>openModal()}>
						Оформить заказ
					</Button>
				</div>
			</section>
		);
	}


export default BurgerConstructor;
