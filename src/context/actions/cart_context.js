import { useEffect, useContext, useReducer, createContext } from 'react';
import reducer from '../reducers/cart_reducer';
import { ADD_TO_CART, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, CLEAR_CART, COUNT_CART_TOTALS } from '../types';

const initialState = {};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  return <CartContext.Provider value="cart context">{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  return useContext(CartContext);
};
