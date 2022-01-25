import React from 'react';
import styles from './AppMain.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'




class AppMain extends React.Component {



	render() {
		return (
			<main className={`${styles.main} container pt-10`}>
				<h1 className={styles.title}>Бургерная</h1>
				<BurgerIngredients/>
				<BurgerConstructor/>
			</main>
		);
	}
}

export default AppMain;
