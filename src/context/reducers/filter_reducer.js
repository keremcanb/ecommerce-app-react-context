import {
  LOAD_PRODUCTS,
  SET_LIST_VIEW,
  SET_GRID_VIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../types';

const filter_reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PRODUCTS:
      return { ...state, all_products: [...payload], filtered_products: [...payload] };

    case SET_LIST_VIEW:
      return { ...state, grid_view: false };

    case SET_GRID_VIEW:
      return { ...state, grid_view: true };

    default:
      return state;

      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
