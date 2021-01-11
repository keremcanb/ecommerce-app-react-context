import { get } from 'axios';
import { useContext, useEffect, useReducer, createContext } from 'react';
import reducer from '../reducers/products_reducer';
import { products_url } from '../../utils/constants';
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_ERROR
} from '../types';

const ProductsContext = createContext();

const initialState = {
  sidebar: false,
  loading: false,
  error: false,
  products: [],
  featured: [],
  product: {}
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Sidebar
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };
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

  return (
    <ProductsContext.Provider value={{ ...state, openSidebar, closeSidebar, fetchProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
