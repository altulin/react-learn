import React from 'react';
import styles from './AppMain.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'

const url = "https://norma.nomoreparties.space/api/ingredients";




function AppMain()  {

		const [state, setState] = React.useState({
			productData: null,

		})

		React.useEffect(() => {
			const getProductData = async () => {
				const res = await fetch(url);
				const data = await res.json();
				setState({ productData: data });
			}
			getProductData();
			console.log(state)
		}, [])




	return (
		<main className={`${styles.main} container pt-10`}>
			<h1 className={styles.title}>Бургерная</h1>
			<BurgerIngredients/>
			<BurgerConstructor/>
		</main>
	);
}

export default AppMain;
