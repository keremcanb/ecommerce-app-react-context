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

  switch (type) {
    case LOAD_PRODUCTS:
      return { ...state, all_products: [...payload], filtered_products: [...payload] };
    // Set view
    case SET_LIST_VIEW:
      return { ...state, grid_view: false };
    case SET_GRID_VIEW:
      return { ...state, grid_view: true };
    // Sort products
    case UPDATE_SORT:
      return { ...state, sort: payload };
    case SORT_PRODUCTS: {
      const { sort, filtered_products } = state;
      const tempProducts = [...filtered_products];
      if (sort === 'price-lowest') {
        tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === 'price-highest') {
        tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name-a') {
        tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === 'name-z') {
        tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: tempProducts };
    }

    default:
      return state;

      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
