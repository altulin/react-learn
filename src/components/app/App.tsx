import React from 'react';
import './App.module.css';
import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain'
import IngredientDetails from '../ingredient-details/IngredientDetails'
import OrderDetails from '../order-details/OrderDetails'
import { OrderContext } from '../../services/orderContext';
import { useDispatch, useSelector } from 'react-redux';
import { CURRENT_INGREDIENT } from '../../services/actions';
import { RootState } from '../../services/reducers/rootReducer';
import { getFeedConstructor } from '../../utils/response';


const baseUrl = "https://norma.nomoreparties.space/api/"
// const URL = `${baseUrl}ingredients`;
const URL_ORDERS = `${baseUrl}orders`

function App() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    orderNumber: 0,
    constructorList: [],
		isLoading: false,
		hasError: false,
    modalIngredient: false,
    modalConstructor: false,
	})




  const checkResponse = (res: Response) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  const { productsIngredients } = useSelector((store: RootState) => ({
		productsIngredients: store.listIngredients,
	}));

  const handleOpenModalIngridients = (e: React.MouseEvent) => {
    const id = (e.currentTarget as HTMLElement).dataset.id;
    const element = productsIngredients.filter((item: {_id: string})=> item._id === id)[0]
    setState(
    {
      ...state,
      modalIngredient: true,
    })

    dispatch({
      type: CURRENT_INGREDIENT,
      feed: element,
    })
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

  const { listConstructor } = useSelector((store: RootState) => ({
		listConstructor: store.listConstructor,
	}));

  const handleOpenModalConstructor = () => {
    const listId = listConstructor.map((item:{_id:string}) => item._id);
    getFeedConstructor();
	}
  // const handleOpenModalConstructor = (list: {_id: string}[]) => {
  //   const dataOrder: string[] = [];
  //   list.forEach((item:{_id:string}) => {
  //     dataOrder.push(item._id)
  //   });
  //   makePost(dataOrder);
	// }



  const handleCloseModal = () => {
		setState(
			{
				...state,
				modalIngredient: false,
        modalConstructor: false,
			}
    )

    dispatch(
      {
        type: CURRENT_INGREDIENT,
        feed: {},
      }
    )
	};

  return (
    <>
      <AppHeader/>
      {/* AppMain */}
        {/* <AppMain openModalIngridients={handleOpenModalIngridients} openModalConstructor ={handleOpenModalConstructor}/> */}
        <AppMain openModalIngridients={handleOpenModalIngridients} openModalConstructor ={handleOpenModalConstructor}/>

      {/* modal */}
      {state.modalIngredient && <IngredientDetails close={handleCloseModal} />}
      <OrderContext.Provider value={state.orderNumber}>
        {state.modalConstructor && <OrderDetails close={handleCloseModal} />}
      </OrderContext.Provider>
    </>
  );
}

export default App;
