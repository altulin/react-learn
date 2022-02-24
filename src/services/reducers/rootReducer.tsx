// import { combineReducers } from 'redux';
import { GET_LIST_INGREDIENTS, GET_FEED, GET_FEED_FAILED } from "../actions";




const initialState = {
  listIngredients: [],
  feed: false,
  feedError: false,
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

		default: {
      return state;
    }
	}
}

export type RootState = ReturnType<typeof rootReducer>
