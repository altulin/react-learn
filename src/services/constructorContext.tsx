import React from 'react';

type Products = {
	image_large: string,
	name: string,
	carbohydrates: number,
	fat: number,
	proteins: number,
	calories: number,
	_id: string,
	image: string,
	image_mobile: string,
	price: number,
	type: string,
}[]
export const constructorContext = React.createContext<Products>({} as Products);
