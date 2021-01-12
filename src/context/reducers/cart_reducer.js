import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../types';

const cart_reducer = (state, action) => {
  const { type, payload } = action;
  const { cart } = state;
  const {
    id,
    color,
    amount,
    product: { name, images, price, stock }
  } = payload;

  switch (type) {
    case ADD_TO_CART: {
      const item = cart.find((i) => i.id === id + color);
      if (item) {
        //
      } else {
        const newItem = {
          id: id + color,
          name,
          color,
          amount,
          image: product.images[0].url,
          price,
          max: stock
        };
        return { ...state, cart: [...cart, newItem] };
      }
    }

    // eslint-disable-next-line no-fallthrough
    default:
      return state;
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
