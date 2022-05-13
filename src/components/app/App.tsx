import React from 'react';
import AppHeader from '../app-header/AppHeader';
import {
  HomePage,
  LoginPage,
  RegistrationPage,
  ForgotPage,
  ResetPage,
  ProfilePage,
  NotFound404,
} from '../../pages';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import OrderDetails from '../order-details/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../services/actions';
import { RootState } from '../../services/reducers/rootReducer';
import { getFeedConstructor } from '../../services/actions/response';
import Modal from '../modal/Modal';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import path from '../../services/utils/paths';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { getFeed } from '../../services/actions/response';
import styles from './App.module.css';
import { checkUser } from '../../services/actions/checkUser';

const App = () => {
  const { main, login, register, forgot, reset, profile } = path;
  const dispatch = useDispatch();
  type LocationProps = {
    state: {
      background: any;
    };
  };
  const location = useLocation() as LocationProps;
  const background = location.state && location.state.background;
  const history = useHistory();
  const [state, setState] = React.useState({
    orderNumber: 0,
    constructorList: [],
    isLoading: false,
    hasError: false,
    modalIngredient: false,
    modalConstructor: false,
  });

  React.useEffect(() => {
    dispatch(getFeed());
    dispatch(checkUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentIngredient = (feed: {}) => {
    dispatch({
      type: CURRENT_INGREDIENT,
      feed,
    });
  };

  const closeModal = () => {
    history.goBack();
  };

  const { productsIngredients } = useSelector((store: RootState) => ({
    productsIngredients: store.data.listIngredients,
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
    listConstructor: store.data.listConstructor,
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

      <Switch location={background || location}>
        <Route path={`${main}`} exact={true}>
          <HomePage
            openModalIngridients={handleOpenModalIngridients}
            openModalConstructor={handleOpenModalConstructor}
          />
        </Route>

        <ProtectedRoute auth={true} path={`${login}`}>
          <LoginPage />
        </ProtectedRoute>

        <ProtectedRoute auth={true} path={`${register}`}>
          <RegistrationPage />
        </ProtectedRoute>

        <ProtectedRoute auth={true} path={`${forgot}`}>
          <ForgotPage />
        </ProtectedRoute>

        <ProtectedRoute auth={true} path={`${reset}`}>
          <ResetPage />
        </ProtectedRoute>

        <ProtectedRoute path={`${profile}`}>
          <ProfilePage />
        </ProtectedRoute>

        <Route path={'/ingredients/:id'} exact={true}>
          {productsIngredients.length === 0 ? (
            <h1 className={`${styles.preload_text} text text_type_main-large`}>
              Загружаю ...
            </h1>
          ) : (
            <main>
              <Modal close={closeModal} detailClass={'detail'}>
                <IngredientDetails />
              </Modal>
            </main>
          )}
        </Route>

        <Route>
          <NotFound404 />
        </Route>
      </Switch>

      {background && (
        <Route path={'/ingredients/:id'} exact={true}>
          <Modal close={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}

      {/* modal */}
      {/* {state.modalIngredient && (
        <Modal close={handleCloseModal}>
          <IngredientDetails />
        </Modal>
      )} */}

      {state.modalConstructor && (
        <Modal close={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default App;
