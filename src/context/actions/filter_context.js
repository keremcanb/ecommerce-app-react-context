import { useEffect, useContext, useReducer, createContext } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRID_VIEW,
  SET_LIST_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../types';
import { useProductsContext } from './products_context';

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: false,
  sort: 'name-a',
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort]);

  // Set view
  const setGridView = () => {
    dispatch({ type: SET_GRID_VIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LIST_VIEW });
  };
  // Sort
  const updateSort = (e) => {
    const { value } = e.target;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, updateSort }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
