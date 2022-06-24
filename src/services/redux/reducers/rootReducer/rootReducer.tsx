import { userReducer } from '../user/user';
import { wsReducer } from '../wsAllReducer/wsAllReducer';
import { combineReducers } from 'redux';

import {
  GET_LIST_INGREDIENTS,
  GET_FEED,
  GET_FEED_FAILED,
  LIST_CURRENT_INGREDIENTS,
  CURRENT_INGREDIENT,
  CREATED_ORDER,
} from '../../actions/mainActions/mainActionsConstants';

import { TResponseActions } from '../../actions/mainActions/mainActionTypes';

export const initialState = {
  listIngredients: [], //список всех полученных ингредиентов
  listConstructor: [], //список всех ингредиентов в текущем конструкторе бургера
  // currentIngredient: {}, //объект текущего просматриваемого ингредиента
  orderNumber: null, // объект созданного заказа
  feed: false, // состояние загрузки с сервера для лоадера
  feedError: false, // ошибка прм загрузке с сервера
  // user: {},
};

export interface IFeed {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: 1255;
  proteins: 80;
  type: string;
  _id: string;
}

export const dataReducer = (state = initialState, action: TResponseActions) => {
  switch (action.type) {
    case GET_LIST_INGREDIENTS: {
      return {
        ...state,
        feed: false,
        listIngredients: action.feed,
      };
    }

    case GET_FEED: {
      return {
        ...state,
        feed: true,
      };
    }

    case GET_FEED_FAILED: {
      return {
        ...state,
        feed: false,
        feedError: true,
      };
    }

    case LIST_CURRENT_INGREDIENTS: {
      return {
        ...state,
        listConstructor: action.feed,
      };
    }

    case CURRENT_INGREDIENT: {
      return {
        ...state,
        currentIngredient: action.feed,
        orderNumber: null,
      };
    }

    case CREATED_ORDER: {
      return {
        ...state,
        orderNumber: action.feed,
      };
    }

    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({
  data: dataReducer,
  user: userReducer,
  wc: wsReducer,
});
