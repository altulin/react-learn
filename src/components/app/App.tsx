import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../../services/reducers/rootReducer';
import './App.module.css';
import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain'
import IngredientDetails from '../ingredient-details/IngredientDetails'
import OrderDetails from '../order-details/OrderDetails'
import { ProductsContext } from '../../services/productsContext';
import { OrderContext } from '../../services/orderContext';
// import getFeed from '../../utils/getListIgredients';


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const baseUrl = "https://norma.nomoreparties.space/api/"
const URL = `${baseUrl}ingredients`;
const URL_ORDERS = `${baseUrl}orders`
const store = createStore(rootReducer, enhancer);

function App() {
  const [state, setState] = React.useState({
    orderNumber: 0,
		products:  null || [],
    constructorList: [],
		isLoading: false,
		hasError: false,
    modalIngredient: false,
    modalConstructor: false,
    calories: 0,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    name: '',
    image_large: ''
	})




  const checkResponse = (res: Response) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }





	React.useEffect(() => {
    fetch(URL)
      .then(checkResponse)
      .then(data => {setState({ ...state, products: data.data, isLoading: true })})
      .catch(() => setState({ ...state, isLoading: false, hasError: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

  const handleOpenModalIngridients = (e: React.MouseEvent) => {

    if (state.products !== null) {
      const id = (e.currentTarget as HTMLElement).dataset.id;
      const element = state.products.filter((item: {_id: string})=> item._id === id)[0]
      setState(
			{
        ...state,
				modalIngredient: true,
				calories: element['calories'],
				proteins: element['proteins'],
				fat: element['fat'],
				carbohydrates: element['carbohydrates'],
				name: element['name'],
				image_large: element['image_large'],
			})
	  }
  };

  const makePost = (data:string[]=[]) => {
    fetch(URL_ORDERS, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "ingredients": data
      })
    })
    .then(checkResponse)
    .then(data => {setState({ ...state, orderNumber: data.order.number, modalConstructor: true,})})
    .catch((e) => console.log(e))
  }

  const handleOpenModalConstructor = (list: {_id: string}[]) => {
    const dataOrder: string[] = [];
    list.forEach((item:{_id:string}) => {
      dataOrder.push(item._id)
    });
    makePost(dataOrder);
	}

  const handleCloseModal = () => {
		setState(
			{
				...state,
				modalIngredient: false,
        modalConstructor: false,
			})
	}

  return (

      <Provider store={store}>
        <AppHeader/>
        {/* AppMain */}
        <ProductsContext.Provider value={state.products}>
          {state.products !== null &&<AppMain openModalIngridients={handleOpenModalIngridients} openModalConstructor ={handleOpenModalConstructor}/>}
        </ProductsContext.Provider>


        {/* modal */}
        {state.modalIngredient && <IngredientDetails calories={state.calories} proteins={state.proteins} fat={state.fat} carbohydrates={state.carbohydrates} name={state.name} image_large={state.image_large} close={handleCloseModal} />}
        <OrderContext.Provider value={state.orderNumber}>
          {state.modalConstructor && <OrderDetails close={handleCloseModal} />}
        </OrderContext.Provider>
      </Provider>



  );
}

export default App;
