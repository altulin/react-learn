import React from 'react';
import styles from './IngredientDetails.module.css';
import Modal from '../modal/Modal'
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers/rootReducer';


interface IngredientDetailsProps {
	close: () => void,
}


function IngredientDetails(props:IngredientDetailsProps) {

	const { currentIngredient } = useSelector((store: RootState) => ({
		currentIngredient: store.currentIngredient,
	}));

	return (
		<Modal onClose={props.close}>
	 		<h2 className="text text_type_main-large">Детали ингредиента</h2>

	 		<figure className={`mb-4 ${styles.modal_img_wrap}`}>
				<img className={styles.modal_img}  src={currentIngredient.image_large} alt="" width={480} height={240}/>
	 		</figure>

	 		<h3 className={`${styles.modal_title} text text_type_main-medium mb-8`}>{currentIngredient.name}</h3>

	 		<ul className={styles.modal_list}>
	 			<li className={styles.modal_text}>
	 				<span className={`text text_type_main-default text_color_inactive mb-2`}>Калории,ккал</span>
	 				<span className={`text text_type_main-default text_color_inactive`}>{currentIngredient.calories}</span>
	 			</li>
	 			<li className={styles.modal_text}>
	 				<span className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</span>
	 				<span className={`text text_type_main-default text_color_inactive`}>{currentIngredient.proteins}</span>
	 			</li>
	 			<li className={styles.modal_text}>
	 				<span className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</span>
	 				<span className={`text text_type_main-default text_color_inactive`}>{currentIngredient.fat}</span>
	 			</li>
	 			<li className={styles.modal_text}>
	 				<span className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</span>
	 				<span className={`text text_type_main-default text_color_inactive`}>{currentIngredient.carbohydrates}</span>
	 			</li>
	 		</ul>
	 	</Modal>
	)
}

export default IngredientDetails
