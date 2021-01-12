import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../types';

const cart_reducer = (state, action) => {
  const { type, payload } = action;
  const { cart } = state;
  const { id, color, amount, product } = payload;

  switch (type) {
    case ADD_TO_CART: {
      const item = cart.find((i) => i.id === id + color);
      if (item) {
        console.log();
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock
        };
        return { ...state, cart: [...cart, newItem] };
      }
      return { ...state, sort: payload };
    }

    default:
      return state;
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
