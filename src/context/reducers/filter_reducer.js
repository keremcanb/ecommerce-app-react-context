/* eslint-disable default-case */
import {
  LOAD_PRODUCTS,
  SET_LIST_VIEW,
  SET_GRID_VIEW,
  SET_SORT,
  SORT_PRODUCTS,
  SET_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS
} from '../types';

const filter_reducer = (state, action) => {
  const { type, payload } = action;
  const { sort, filtered, filters, products } = state;
  const { text, category, company, color, price, shipping } = filters;

  switch (type) {
    // Get products
    case LOAD_PRODUCTS: {
      // Get prices array, calculate maxprice and add it to filters object
      let maxPrice = payload.map((item) => item.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        products: [...payload],
        filtered: [...payload],
        filters: { ...filters, max_price: maxPrice, price: maxPrice }
      };
    }
    // Sort
    case SET_SORT:
      return { ...state, sort: payload };
    // Set sort according to value coming from dropdown
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
      }
      return { ...state, filtered };
    }
    // Filters
    case SET_FILTERS: {
      // Get name & values coming from actions payload and return
      const { name, value } = payload;
      // Set filter properties dynamically with controlled input (get current values and update through onChange values)
      return { ...state, filters: { ...filters, [name]: value } };
    }
    case FILTER_PRODUCTS: {
      // Before starting to filter always get fresh copy of all products
      let items = [...products];
      if (text) {
        items = items.filter((i) => i.name.toLowerCase().startsWith(text));
      }
      if (category !== 'all') {
        items = items.filter((i) => i.category === category);
      }
      if (company !== 'all') {
        items = items.filter((i) => i.company === company);
      }
      if (color !== 'all') {
        items = items.filter((i) => i.colors.find((c) => c === color));
      }
      items = items.filter((i) => i.price <= price);
      if (shipping) {
        items = items.filter((i) => i.shipping === true);
      }
      // After filtering return filtered
      return { ...state, filtered: items };
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
