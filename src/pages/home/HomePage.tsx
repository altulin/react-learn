import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './HomePage.module.css';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';

interface IHomePage {
  openModalIngridients?: (e: React.MouseEvent) => void;
  openModalConstructor: () => void;
}

const HomePage: FC<IHomePage> = ({
  openModalIngridients,
  openModalConstructor,
}) => {
  return (
    <main className={`${styles.main} container pt-10`}>
      <h1 className={styles.title}>Бургерная</h1>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients openModal={openModalIngridients} />
        <BurgerConstructor openModal={openModalConstructor} />
      </DndProvider>
    </main>
  );
};

export default HomePage;
