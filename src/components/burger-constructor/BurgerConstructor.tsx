import React from 'react';
import { useDrop, useDrag } from "react-dnd";
import styles from './BurgerConstructor.module.css';
import { CurrencyIcon, ConstructorElement, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import {LIST_CURRENT_INGREDIENTS, CHANGE_LIST_CURRENT_INGREDIENTS} from '../../services/actions';
import { RootState } from '../../services/reducers/rootReducer';
import type { XYCoord } from 'dnd-core';

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
	const ref = React.useRef<HTMLLIElement>(null);

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

	const sortingList = (fromIndex: number, toIndex: number) => {
		var element = constructorList[fromIndex];
    constructorList.splice(fromIndex, 1);
    constructorList.splice(toIndex, 0, element);

		// console.log(element)

		dispatch({
			type: CHANGE_LIST_CURRENT_INGREDIENTS,
			feed: constructorList,
		})
		// console.log(constructorList)

	};

	const [{ isDragging }, drag] = useDrag({
		type: 'constructor',
		item: {_id, i},
		collect: (monitor: any) => ({
			isDragging: monitor.isDragging(),
		}),
	})

	const [, drop] = useDrop({
		accept: 'constructor',
		hover(item: {i: number} , monitor) {

			if (!ref.current) {
				return
			}

			const dragIndex = item.i;
			const hoverIndex = i;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return
			}

			// Determine rectangle on screen
			const hoverBoundingRect = ref.current?.getBoundingClientRect();



			// Get vertical middle
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			// Determine mouse position
			const clientOffset = monitor.getClientOffset();

			// Get pixels to the top
			const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

			// Dragging downwards
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return
			}

			// Dragging upwards
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return
			}

			// console.log(constructorList)
			item.i = hoverIndex;
			// console.log(hoverIndex)
			// console.log(dragIndex)
			console.log(ref.current)
			sortingList(dragIndex, hoverIndex);


		},
	});

	const opacity = isDragging ? 0 : 1;
	// const opacity = 1;
	drag(drop(ref));

	return (
		<li style={{ opacity }} className={`constructor_item ${styles.constructor_box}`}  data-_id={_id} ref={ref}>
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

	// const [, refConstructorTarget] = useDrop({
	// 	accept: 'constructor',
	// 	drop(item: {_id: string}) {
	// 		onDropHover(item._id)
	// 	},
	// });

	let { constructorList } = useSelector((store: RootState) => ({
		constructorList: store.listConstructor,
	}));


	// const onDropHover = (idElem: string) => {
	// 	console.log(idElem)
	// }


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

				<ul className={styles.constructor_list}>
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
