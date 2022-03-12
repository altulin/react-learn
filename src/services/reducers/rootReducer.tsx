// import { combineReducers } from 'redux';
import { GET_LIST_INGREDIENTS, GET_FEED, GET_FEED_FAILED, LIST_CURRENT_INGREDIENTS, CURRENT_INGREDIENT, CREATED_ORDER, CHANGE_LIST_CURRENT_INGREDIENTS } from "../actions";

const initialState = {
  listIngredients: [], //список всех полученных ингредиентов
  listConstructor: [], //список всех ингредиентов в текущем конструкторе бургера
  currentIngredient: {}, //объект текущего просматриваемого ингредиента
  orderNumber: '', // объект созданного заказа
  feed: false, // состояние загрузки с сервера для лоадера
  feedError: false, // ошибка прм загрузке с сервера
};

export const rootReducer =(state = initialState, action: {type: string, feed: any}) => {
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
      };
    }

    case CREATED_ORDER: {
      return {
        ...state,
        orderNumber: action.feed,
      };
    }

    case CHANGE_LIST_CURRENT_INGREDIENTS: {
      return {
        ...state,
        listConstructor: action.feed,
      };
    }

		default: {
      return state;
    }
	}
}

export type RootState = ReturnType<typeof rootReducer>
