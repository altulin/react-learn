import React from 'react';
import styles from './IngredientDetails.module.css';
import Modal from '../modal/Modal'

interface IngredientDetailsProps {
	close: () => void,
	name: string,
	calories: number,
	proteins: number,
	fat: number
	image_large: string
	carbohydrates: number
}


function IngredientDetails(props:IngredientDetailsProps) {
	return (
		<Modal onClose={props.close}>
	 		<h2 className="text text_type_main-large">Детали ингредиента</h2>

	 		<figure className={`mb-4 ${styles.modal_img_wrap}`}>
				<img className={styles.modal_img}  src={props.image_large} alt="" width={480} height={240}/>
	 		</figure>

	 		<h3 className={`${styles.modal_title} text text_type_main-medium mb-8`}>{props.name}</h3>

	 		<ul className={styles.modal_list}>
	 			<li className={styles.modal_text}>
	 				<span className={`text text_type_main-default text_color_inactive mb-2`}>Калории,ккал</span>
	 				<span className={`text text_type_main-default text_color_inactive`}>{props.calories}</span>
	 			</li>
	 			<li className={styles.modal_text}>
	 				<span className={`text text_type_main-default text_color_inactive mb-2`}>Белки, г</span>
	 				<span className={`text text_type_main-default text_color_inactive`}>{props.proteins}</span>
	 			</li>
	 			<li className={styles.modal_text}>
	 				<span className={`text text_type_main-default text_color_inactive mb-2`}>Жиры, г</span>
	 				<span className={`text text_type_main-default text_color_inactive`}>{props.fat}</span>
	 			</li>
	 			<li className={styles.modal_text}>
	 				<span className={`text text_type_main-default text_color_inactive mb-2`}>Углеводы, г</span>
	 				<span className={`text text_type_main-default text_color_inactive`}>{props.carbohydrates}</span>
	 			</li>
	 		</ul>
	 	</Modal>
	)
}

export default IngredientDetails
