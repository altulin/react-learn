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
  FeelPage,
  HistoryPage,
} from '../../pages';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import OrderDetails from '../order-details/OrderDetails';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../services/redux/actions';
import { RootState } from '../../services/redux/reducers/rootReducer';
import { getFeedConstructor } from '../../services/redux/actions/response';
import Modal from '../modal/Modal';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import path from '../../services/utils/paths';
import { ProtectedRoute } from '../protected-route/ProtectedRoute';
import { getFeed } from '../../services/redux/actions/response';
import { IFeed } from '../../services/redux/reducers/rootReducer';
import { checkUser } from '../../services/redux/actions/checkUser';
import Preload from '../preload/Preload';
import OrderInfo from '../order-info/OrderInfo';

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
  wc: {
    messages: {
      success: boolean;
      orders: [
        {
          _id: string;
          ingredients: Array<string>;
          status: string;
          name: string;
          number: number;
          createdAt: string;
          updatedAt: string;
        },
      ];
      total: number;
      totalToday: number;
    };
  };
}

const App: FC = () => {
  const {
    main,
    login,
    register,
    forgot,
    reset,
    profile,
    ingredients_id,
    feed,
    feed_id,
    profile_orders,
    profile_orders_id,
  } = path;
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

  const { productsIngredients } = useSelector(
    (store: IStore) => ({
      productsIngredients: store.data.listIngredients,
    }),
    shallowEqual,
  );

  // shallowEqual

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
          <ProtectedRoute path={`${profile}`}>
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute path={`${profile_orders}`}>
            <HistoryPage />
          </ProtectedRoute>
        </ProtectedRoute>

        <Route path={`${feed}`} exact={true}>
          <FeelPage />
        </Route>

        <Route path={`${ingredients_id}`} exact={true}>
          {productsIngredients.length === 0 ? (
            <Preload />
          ) : (
            <main>
              <Modal close={closeModal} detailClass={'detail'}>
                <IngredientDetails />
              </Modal>
            </main>
          )}
        </Route>

        <Route path={`${feed_id}`} exact={true}>
          {false ? (
            <Preload />
          ) : (
            <main>
              <Modal close={closeModal} detailClass={'detail'}>
                <OrderInfo />
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
        <Route path={`${ingredients_id}`} exact={true}>
          <Modal close={closeModal}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}

      {background && (
        <Route path={`${feed_id}`} exact={true}>
          <Modal close={closeModal}>
            <OrderInfo />
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
