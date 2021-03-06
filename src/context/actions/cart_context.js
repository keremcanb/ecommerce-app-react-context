import { useEffect, useContext, useReducer, createContext } from 'react';
import reducer from '../reducers/cart_reducer';
import { ADD_TO_CART, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, CLEAR_CART, COUNT_CART_TOTALS } from '../types';

const CartContext = createContext();

const initialState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };

  return <CartContext.Provider value={{ ...state, addToCart }}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
