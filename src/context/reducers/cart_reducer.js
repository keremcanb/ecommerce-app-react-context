import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from '../types';

const cart_reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
