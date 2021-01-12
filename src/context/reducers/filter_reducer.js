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
  const { text, category, company, color, price, shipping } = filters;

  switch (type) {
    // Products
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
    // Sort
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
    // Filter
    case FILTER_PRODUCTS: {
      let tempProducts = [...products];

      if (text) {
        tempProducts = tempProducts.filter((product) => product.name.toLowerCase().startsWith(text));
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
          price: filters.max_price,
          shipping: false
        }
      };
    // View
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
