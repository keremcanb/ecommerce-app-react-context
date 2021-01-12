import { get } from 'axios';
import { useContext, useEffect, useReducer, createContext } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url } from '../../utils/constants';
import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR
} from '../types';

const ProductsContext = createContext();

const initialState = {
  loading: false,
  error: false,
  sidebar: false,
  products: [],
  featured: [],
  product: {}
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch all products
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    try {
      const { data } = await get(url);
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: GET_PRODUCTS_ERROR });
    }
  };

  // Fetch single product
  const fetchProduct = async (url) => {
    dispatch({ type: GET_PRODUCT_REQUEST });
    try {
      const { data } = await get(url);
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: GET_PRODUCT_ERROR });
    }
  };

  useEffect(() => {
    fetchProducts(products_url);
  }, []);

  // Set sidebar status
  const openSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };

  const closeSidebar = () => {
    dispatch({ type: CLOSE_SIDEBAR });
  };

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar, fetchProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
