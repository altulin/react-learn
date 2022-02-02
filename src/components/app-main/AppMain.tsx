import React from 'react';
import styles from './AppMain.module.css';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients'
import BurgerConstructor from '../burger-constructor/BurgerConstructor'

const URL = "https://norma.nomoreparties.space/api/ingredients";




function AppMain()  {

	const [state, setState] = React.useState({
		productData: null,
		isLoading: false,
		hasError: false,
	})

	React.useEffect(() => {
		fetch(URL)
			.then(res => res.json())
			.then(data => setState({ ...state, productData: data.data, isLoading: true }))
			.catch(e => setState({ ...state, isLoading: false, hasError: true }))
			// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<main className={`${styles.main} container pt-10`}>
			<h1 className={styles.title}>Бургерная</h1>
			{state.productData !== null && <BurgerIngredients products={state.productData} />}
			{state.productData !== null && <BurgerConstructor products={state.productData}/>}
		</main>
	);
}

export default AppMain;
