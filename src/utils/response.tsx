import { GET_LIST_INGREDIENTS, GET_FEED, GET_FEED_FAILED } from "../services/actions";
import { Dispatch } from 'redux';

const baseUrl = "https://norma.nomoreparties.space/api/"
const URL = `${baseUrl}ingredients`;
const URL_ORDERS = `${baseUrl}orders`;

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
				console.log(4444)
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

export const getFeedConstructor = () => {


		return function(dispatch: Dispatch) {
			dispatch({
				type: GET_FEED,
			});

			fetch(URL)
				.then(checkResponse)
				.then(data => {
					console.log(4444)
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


};
}
