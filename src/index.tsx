import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import {
  Provider,
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from 'react-redux';

import {
  createStore,
  compose,
  applyMiddleware,
  ActionCreator,
  Action,
} from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { rootReducer } from './services/redux/reducers/rootReducer/rootReducer';
import { BrowserRouter as Router } from 'react-router-dom';
import { TResponseActions } from './services/redux/actions/mainActions/mainActionTypes';
import { TWsActions } from './services/redux/actions/wsAction/wsActionTypes';
import { IStore } from './components/app/App';

const composeEnhancers =
  (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TResponseActions | TWsActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// export type AppDispatch = Dispatch<TApplicationActions>;
// export type AppDispatch = Dispatch<TApplicationActions>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState | IStore> =
  selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>();

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
