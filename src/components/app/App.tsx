import React from 'react';
import './App.module.css';
import AppHeader from '../app-header/AppHeader';
import AppMain from '../app-main/AppMain'
import IngredientDetails from '../ingredient-details/IngredientDetails'
import OrderDetails from '../order-details/OrderDetails'

const URL = "https://norma.nomoreparties.space/api/ingredients";




function App() {

  const [state, setState] = React.useState({
		products:  null || [],
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
		fetch(URL)
			.then(res => res.json())
			.then(data => setState({ ...state, products: data.data, isLoading: true }))
			.catch(e => setState({ ...state, isLoading: false, hasError: true }))
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

  const handleOpenModalConstructor = () => {
		setState(
      {
        ...state,
        modalConstructor: true,
      }
    )
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

      {/* AppMain */}
      {state.products !== null &&<AppMain products={state.products} openModalIngridients={handleOpenModalIngridients} openModalConstructor ={handleOpenModalConstructor}/>}

      {/* modal */}
      {state.modalIngredient && <IngredientDetails calories={state.calories} proteins={state.proteins} fat={state.fat} carbohydrates={state.carbohydrates} name={state.name} image_large={state.image_large} close={handleCloseModal} press_close={handlekeyPress}/>}
      {state.modalConstructor && <OrderDetails close={handleCloseModal} press_close={handlekeyPress}/>}
    </>

  );
}

export default App;
