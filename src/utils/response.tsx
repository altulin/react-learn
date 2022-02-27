import { GET_LIST_INGREDIENTS, GET_FEED, GET_FEED_FAILED } from "../services/actions";
import { Dispatch } from 'redux';

const URL = 'https://norma.nomoreparties.space/api/ingredients';

const checkResponse = (res: Response) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
}

export const getFeed = () => {
	return function(dispatch: Dispatch) {
		dispatch({
      type: GET_FEED,
    });

		fetch(URL)
			.then(checkResponse)
			.then(data => {
				dispatch({
					type: GET_LIST_INGREDIENTS,
					feed: data.data,
				})
			})

			.catch(() => {
				dispatch({
					type: GET_FEED_FAILED
				})
			})
		}
};
