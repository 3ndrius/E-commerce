import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL
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

export const  singleProductReducer = ( state ={}, action) => {
  switch (action.type) {
    case 'SINGLE_PRODUCT_REQUEST':
        return{
          ...state,
          product: {},
          loading: true
        }   
      case 'SINGLE_PRODUCT_SUCCESS':
        console.log(action);
        return {
          ...state,
          product: action.payload.product,
          loading: false
        }
        case 'SINGLE_PRODUCT_FAIL':
          return {
            ...state,
            error: action.payload.error
          }
    default:
      return state;
  }

}












