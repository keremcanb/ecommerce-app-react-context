import {
  LOAD_PRODUCTS,
  SET_LIST_VIEW,
  SET_GRID_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from '../types';

const filter_reducer = (state, action) => {
  const { type, payload } = action;
  const { sort, filtered, filters, products } = state;

  switch (type) {
    case LOAD_PRODUCTS: {
      let maxPrice = payload.map((product) => product.price);
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        products: [...payload],
        filtered: [...payload],
        filters: { ...filters, max_price: maxPrice, price: maxPrice }
      };
    }
    // Sort products
    case UPDATE_SORT:
      return { ...state, sort: payload };
    case SORT_PRODUCTS: {
      switch (sort) {
        case 'low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'asc':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'desc':
          filtered.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          return state;
      }
      return { ...state, filtered };
    }
    // Set filters
    case FILTER_PRODUCTS: {
      const { text, category, company, color, price, shipping } = filters;
      let tempProducts = [...products];
      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }
      return { ...state, filtered: tempProducts };
    }
    case UPDATE_FILTERS: {
      const { name, value } = payload;
      return { ...state, filters: { ...filters, [name]: value } };
    }
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          // min_price: 0,
          // max_price: 0,
          price: filters.max_price,
          shipping: false
        }
      };
    // Set view
    case SET_LIST_VIEW:
      return { ...state, grid: false };
    case SET_GRID_VIEW:
      return { ...state, grid: true };
    default:
      return state;
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
