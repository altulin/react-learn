import React from 'react';
import './App.module.css';
import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain'
import IngredientDetails from '../ingredient-details/IngredientDetails'
import OrderDetails from '../order-details/OrderDetails'
import { ProductsContext } from '../../services/productsContext';
import { СonstructorContext } from '../../services/constructorContext';
import { OrderContext } from '../../services/orderContext';

const URL = "https://norma.nomoreparties.space/api/ingredients";
const URL_ORDERS = "https://norma.nomoreparties.space/api/orders"

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



	React.useEffect(() => {
    async function fetchProducts(url= '') {
      const response = await fetch(url);
      return await response.json();
    }

    fetchProducts(URL)
      .then(data => {setState({ ...state, products: data.data, isLoading: true })})
      .catch(() => setState({ ...state, isLoading: false, hasError: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])



  // стартовый лист для конструктора как пример(временно)_
  React.useEffect(() => {
    let list = []
    list.push(state.products.filter((item: {type: string}) => item.type === 'bun').splice(1))
    list.push(state.products.filter((item: {type: string}) => item.type === 'main').splice(6))
    list.push(state.products.filter((item: {type: string}) => item.type === 'sauce'))
    setState({...state, constructorList: list.flat()})
    //eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.isLoading])



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
    async function fetchOrder(url= '') {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "ingredients": data
        })

      });
      return await response.json();
    };

    fetchOrder(URL_ORDERS)
      .then(data => {setState({ ...state, orderNumber: data.order.number, modalConstructor: true,})})
      .catch(() => console.log('err'))
  }

  const handleOpenModalConstructor = () => {
    const dataOrder = state.constructorList.map((item:{_id:string})=>item._id)
    makePost(dataOrder);
	}

  const handlekeyPress = ({key} : KeyboardEvent) => {
		key === 'Escape' && handleCloseModal();
		return
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
    <>
      <AppHeader/>
      {state.constructorList.length > 0 && <h1>fghfghfgh</h1>}
      {/* AppMain */}
      <ProductsContext.Provider value={state.products}>
        {state.constructorList.length > 0 && <СonstructorContext.Provider value={state.constructorList}>
          {state.products !== null &&<AppMain openModalIngridients={handleOpenModalIngridients} openModalConstructor ={handleOpenModalConstructor}/>}
        </СonstructorContext.Provider>}
      </ProductsContext.Provider>


      {/* modal */}
      {state.modalIngredient && <IngredientDetails calories={state.calories} proteins={state.proteins} fat={state.fat} carbohydrates={state.carbohydrates} name={state.name} image_large={state.image_large} close={handleCloseModal} press_close={handlekeyPress}/>}
      <OrderContext.Provider value={state.orderNumber}>
        {state.modalConstructor && <OrderDetails close={handleCloseModal} press_close={handlekeyPress}/>}
      </OrderContext.Provider>

    </>

  );
}

export default App;
