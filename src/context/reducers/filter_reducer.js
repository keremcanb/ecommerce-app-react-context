import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../types';

const filter_reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;

      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
