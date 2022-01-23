import React from 'react';
import styles from './AppMain.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'




class AppMain extends React.Component {



	render() {
		return (
			<main className={`${styles.main} container pt-10`}>
				<h1 className={styles.title}>Бургроная</h1>
				<BurgerIngredients/>
			</main>
		);
	}
}

export default AppMain;
