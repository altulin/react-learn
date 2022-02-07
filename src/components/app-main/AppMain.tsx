import React from 'react';
import styles from './AppMain.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'

interface AppMainProps {
	openModalIngridients: (e: React.MouseEvent)=> void,
	openModalConstructor: ()=> void,
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
}

function AppMain({openModalIngridients, openModalConstructor, products}: AppMainProps)  {

	return (
		<main className={`${styles.main} container pt-10`}>
			<h1 className={styles.title}>Бургерная</h1>
			{products.length !== 0 &&	<BurgerIngredients openModal={openModalIngridients} products={products}/>}
			{products.length !== 0 &&<BurgerConstructor openModal={openModalConstructor}/>}
		</main>
	);
}

export default AppMain;
