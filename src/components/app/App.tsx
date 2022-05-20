import React, { FC, useEffect } from 'react';
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
import { IFeed } from '../../services/reducers/rootReducer';
import { checkUser } from '../../services/actions/checkUser';

export type TLocation = {
  state: {
    background: {
      pathname: string;
      search: string;
      state: object;
      hash: string;
    };
  };
};

export interface IStore {
  data: {
    listIngredients: Array<IFeed>;
    listConstructor: Array<IFeed>;
    orderNumber: number;
  };
}

const App: FC = () => {
  const { main, login, register, forgot, reset, profile } = path;
  const dispatch = useDispatch();
  const location: TLocation = useLocation();
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

  useEffect(() => {
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

  // const { store } = useSelector((store: IStore) => ({
  //   store: store,
  // }));

  // console.log(store);

  const { productsIngredients } = useSelector((store: IStore) => ({
    productsIngredients: store.data.listIngredients,
  }));

  const { listConstructor } = useSelector((store: IStore) => ({
    listConstructor: store.data.listConstructor,
  }));

  const user = useSelector((state: RootState) => state.user);
  const { data } = user;

  const handleOpenModalConstructor = () => {
    if (data) {
      const listId: Array<string> = listConstructor.map(
        (item: { _id: string }) => item._id,
      );

      if (listId.length !== 0) {
        dispatch(getFeedConstructor(listId));
        setState({
          ...state,
          modalConstructor: true,
        });
      }
    } else {
      history.replace({ pathname: `${login}` });
    }
  };

  const handleCloseModal = () => {
    setState({
      ...state,
      modalIngredient: false,
      modalConstructor: false,
    });

    currentIngredient({});
  };

  const { price } = useSelector((store: IStore) => ({
    price: store.data.orderNumber,
  }));

  return (
    <>
      <AppHeader />
      {/* AppMain */}
      <Switch location={background || location}>
        <Route path={`${main}`} exact={true}>
          <HomePage openModalConstructor={handleOpenModalConstructor} />
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

      {/* modal */}

      {background && productsIngredients.length !== 0 && (
        <Route path={'/ingredients/:id'} exact={true}>
          <Modal close={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}

      {/* modal */}

      {state.modalConstructor && price && (
        <Modal close={handleCloseModal}>
          <OrderDetails price={price} />
        </Modal>
      )}
    </>
  );
};

export default App;
