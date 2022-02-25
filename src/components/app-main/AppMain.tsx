import React from 'react';
import styles from './AppMain.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'

interface AppMainProps {
	openModalIngridients: (e: React.MouseEvent)=> void,
	openModalConstructor: (val : {_id: string}[])=> void,
}

function AppMain({openModalIngridients, openModalConstructor}: AppMainProps)  {

	return (
		<main className={`${styles.main} container pt-10`}>
			<h1 className={styles.title}>Бургерная</h1>
			<BurgerIngredients openModal={openModalIngridients}/>
			<BurgerConstructor openModal={openModalConstructor}/>
		</main>
	);
}

export default AppMain;
