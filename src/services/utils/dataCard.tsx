export const getDataCard = (
  ingredients: Array<string>,
  listIngredients: Array<{
    _id: string;
    image: string;
    image_mobile: string;
    name: string;
    price: number;
  }>,
) => {
  return ingredients.map((id: string) => {
    const object = listIngredients.filter(
      (i: { _id: string }) => i._id === id,
    )[0];

    try {
      return {
        image: object.image,
        price: object.price,
      };
    } catch (e) {
      console.log(e);
      return {
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        price: 100500,
      };
    }
  });
};
