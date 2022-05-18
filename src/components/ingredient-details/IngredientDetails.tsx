import styles from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers/rootReducer';
import { useLocation } from 'react-router-dom';
import { FC } from 'react';
import { IStore } from '../app/App';

const IngredientDetails: FC = () => {
  const { listIngredients } = useSelector((store: IStore) => ({
    listIngredients: store.data.listIngredients,
  }));
  const location = useLocation();

  const getIngredient = () => {
    const id = location.pathname.split('/')[2];
    if (listIngredients.length) {
      return listIngredients.filter(
        (item: { _id: string }) => item._id === id,
      )[0];
    }
  };

  const { image_large, name, calories, fat, carbohydrates, proteins } =
    getIngredient();

  return (
    <>
      <h2 className='text text_type_main-large'>Детали ингредиента</h2>

      <figure className={`mb-4 ${styles.modal_img_wrap}`}>
        <img
          className={styles.modal_img}
          src={image_large}
          alt=''
          width={480}
          height={240}
        />
      </figure>

      <h3 className={`${styles.modal_title} text text_type_main-medium mb-8`}>
        {name}
      </h3>

      <ul className={styles.modal_list}>
        <li className={styles.modal_text}>
          <span
            className={`text text_type_main-default text_color_inactive mb-2`}
          >
            Калории,ккал
          </span>
          <span className={`text text_type_main-default text_color_inactive`}>
            {calories}
          </span>
        </li>
        <li className={styles.modal_text}>
          <span
            className={`text text_type_main-default text_color_inactive mb-2`}
          >
            Белки, г
          </span>
          <span className={`text text_type_main-default text_color_inactive`}>
            {proteins}
          </span>
        </li>
        <li className={styles.modal_text}>
          <span
            className={`text text_type_main-default text_color_inactive mb-2`}
          >
            Жиры, г
          </span>
          <span className={`text text_type_main-default text_color_inactive`}>
            {fat}
          </span>
        </li>
        <li className={styles.modal_text}>
          <span
            className={`text text_type_main-default text_color_inactive mb-2`}
          >
            Углеводы, г
          </span>
          <span className={`text text_type_main-default text_color_inactive`}>
            {carbohydrates}
          </span>
        </li>
      </ul>
    </>
  );
};

export default IngredientDetails;
