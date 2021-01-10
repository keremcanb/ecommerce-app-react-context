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
      return { ...state, isSidebarOpen: true };
    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };
    // Fetch all products
    case GET_PRODUCTS_BEGIN:
      return { ...state, products_loading: true };
    case GET_PRODUCTS_SUCCESS: {
      // Filter featured products
      const featured_products = payload.filter(({ featured }) => featured === true);
      return { ...state, products_loading: false, products: payload, featured_products };
    }
    case GET_PRODUCTS_ERROR:
      return { ...state, products_loading: false, products_error: true };
    // Fetch single product
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, single_product_loading: true, single_product_error: false };
    case GET_SINGLE_PRODUCT_SUCCESS: {
      return { ...state, single_product_loading: false, single_product: payload };
    }
    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, single_product_loading: false, single_product_error: true };

    default:
      return state;

      throw new Error(`No Matching "${type}" - action type`);
  }
};

export default products_reducer;
