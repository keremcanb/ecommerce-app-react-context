import { useEffect, useContext, useReducer, createContext } from 'react';
import reducer from '../reducers/cart_reducer';
import { ADD_TO_CART, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT, CLEAR_CART, COUNT_CART_TOTALS } from '../types';

const CartContext = createContext();

const initialState = {};

export const CartProvider = ({ children }) => {
  return <CartContext.Provider value="cart context">{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
