import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from './AppMain.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'

interface AppMainProps {
	openModalIngridients: (e: React.MouseEvent)=> void,
	openModalConstructor: () => void,
}

function AppMain({openModalIngridients, openModalConstructor}: AppMainProps)  {

	return (
		<main className={`${styles.main} container pt-10`}>
			<h1 className={styles.title}>Бургерная</h1>
			<DndProvider backend={HTML5Backend}>
				<BurgerIngredients openModal={openModalIngridients}/>
				<BurgerConstructor openModal={openModalConstructor}/>
			</DndProvider>
		</main>
	)
};

export default AppMain;
