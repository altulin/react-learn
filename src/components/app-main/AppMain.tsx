import React from 'react';
import styles from './AppMain.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'
import { ProductsContext } from '../../services/productsContext';

interface AppMainProps {
	openModalIngridients: (e: React.MouseEvent)=> void,
	openModalConstructor: (val : {_id: string}[])=> void,
}

function AppMain({openModalIngridients, openModalConstructor}: AppMainProps)  {
	const products = React.useContext(ProductsContext);

	return (
		<main className={`${styles.main} container pt-10`}>
			<h1 className={styles.title}>Бургерная</h1>
			{products.length !== 0 &&	<BurgerIngredients openModal={openModalIngridients}/>}
			{products.length !== 0 && <BurgerConstructor openModal={openModalConstructor}/>}
		</main>
	);
}

export default AppMain;
