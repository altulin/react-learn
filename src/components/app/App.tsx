import React from 'react';
import './App.module.css';
import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import OrderDetails from '../order-details/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../services/actions';
import { RootState } from '../../services/reducers/rootReducer';
import { getFeedConstructor } from '../../services/actions/response';

function App() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    orderNumber: 0,
    constructorList: [],
    isLoading: false,
    hasError: false,
    modalIngredient: false,
    modalConstructor: false,
  });

  const currentIngredient = (feed: {}) => {
    dispatch({
      type: CURRENT_INGREDIENT,
      feed,
    });
  };

  const { productsIngredients } = useSelector((store: RootState) => ({
    productsIngredients: store.listIngredients,
  }));

  const handleOpenModalIngridients = (e: React.MouseEvent) => {
    const id = (e.currentTarget as HTMLElement).dataset.id;
    const element = productsIngredients.filter(
      (item: { _id: string }) => item._id === id,
    )[0];
    setState({
      ...state,
      modalIngredient: true,
    });

    currentIngredient(element);
  };

  const { listConstructor } = useSelector((store: RootState) => ({
    listConstructor: store.listConstructor,
  }));

  const handleOpenModalConstructor = () => {
    const listId = listConstructor.map((item: { _id: string }) => item._id);
    dispatch(getFeedConstructor(listId));
    setState({
      ...state,
      modalConstructor: true,
    });
  };

  const handleCloseModal = () => {
    setState({
      ...state,
      modalIngredient: false,
      modalConstructor: false,
    });

    currentIngredient({});
  };

  return (
    <>
      <AppHeader />
      {/* AppMain */}

      <AppMain
        openModalIngridients={handleOpenModalIngridients}
        openModalConstructor={handleOpenModalConstructor}
      />

      {/* modal */}
      {state.modalIngredient && <IngredientDetails close={handleCloseModal} />}

      {state.modalConstructor && <OrderDetails close={handleCloseModal} />}
    </>
  );
}

export default App;
