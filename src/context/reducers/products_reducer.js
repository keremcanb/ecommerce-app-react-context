import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../types';

const products_reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    // Sidebar
    case SIDEBAR_OPEN:
      return { ...state, sidebar: true };
    case SIDEBAR_CLOSE:
      return { ...state, sidebar: false };
    // Fetch all products
    case GET_PRODUCTS_BEGIN:
      return { ...state, loading: true };
    case GET_PRODUCTS_SUCCESS: {
      const featured = payload.filter(({ featured }) => featured === true);
      return { ...state, loading: false, products: payload, featured };
    }
    case GET_PRODUCTS_ERROR:
      return { ...state, loading: false, error: true };
    // Fetch single product
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, loading: true, error: false };
    case GET_SINGLE_PRODUCT_SUCCESS: {
      return { ...state, loading: false, product: payload };
    }
    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, loading: false, error: true };

    default:
      return state;

      throw new Error(`No Matching "${type}" - action type`);
  }
};

export default products_reducer;
