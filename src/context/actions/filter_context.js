/* eslint-disable default-case */
import { useEffect, useContext, useReducer, createContext } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRID_VIEW,
  SET_LIST_VIEW,
  SET_SORT,
  SORT_PRODUCTS,
  SET_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from '../types';
import { useProductsContext } from './products_context';

const FilterContext = createContext();

const initialState = {
  products: [],
  filtered: [],
  grid: false,
  sort: 'asc',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false
  }
};

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sort, filters } = state;

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, sort, filters]);

  // Sort (Get dropdown option value and pass to reducer)
  const setSort = (e) => {
    const { value } = e.target;
    dispatch({ type: SET_SORT, payload: value });
  };

  // Filter (Get name & value from filter input and buttons)
  const setFilters = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    // Get values according to names
    switch (name) {
      // Because button has no value, getting with textContent property.
      case 'category':
        value = e.target.textContent;
        break;
      // Using dataset to get values from data-color.
      case 'color':
        value = e.target.dataset.color;
        break;
      // Convert string to number
      case 'price':
        value = Number(value);
        break;
      // Getting value from checked attribute
      case 'shipping':
        value = e.target.checked;
    }
    dispatch({ type: SET_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  // View
  const setGridView = () => {
    dispatch({ type: SET_GRID_VIEW });
  };

  const setListView = () => {
    dispatch({ type: SET_LIST_VIEW });
  };

  return (
    <FilterContext.Provider value={{ ...state, setGridView, setListView, setSort, setFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
