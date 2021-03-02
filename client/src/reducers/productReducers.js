import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

const initState = { products: [], error: null, loading: false, productsCount: 0 };

export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "ALL_PRODUCT_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ALL_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false, 
        products: action.payload.products,
        productsCount: action.payload.productCount,
      };
    case "ALL_PRODUCT_FAIL":
      return {
        loading: false,
        error: action.payload.message,
      };
    case "CLEAR_ERRORS":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
