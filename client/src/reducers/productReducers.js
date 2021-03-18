import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERROR,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SUBMIT_REVIEW_REQUEST,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_FAIL,
  CLEAR_REVIEW_STATUS,
  ADMIN_ALL_PRODUCTS_REQUEST,
  ADMIN_ALL_PRODUCTS_FAIL,
  ADMIN_ALL_PRODUCTS_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
} from "../constants/productConstants";

const initState = {
  products: [],
  error: null,
  loading: false,
  productsCount: 0,
};

export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case "ALL_PRODUCT_REQUEST":
    case "ADMIN_ALL_PRODUCTS_REQUEST":
    case "DELETE_PRODUCT_REQUEST":
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
        resPerPage: action.payload.resPerPage,
        filteredProductsCount: action.payload.filteredProductsCount,
      };
    case "ADMIN_ALL_PRODUCTS_SUCCESS":
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        loading: false,
        message:action.payload.message.message,
        products: state.products.filter(product => product._id !== action.payload.id) 
      }
    case "ALL_PRODUCT_FAIL":
    case "ADMIN_ALL_PRODUCTS_FAIL":
    case "DELETE_PRODUCT_FAIL":
      return {
        ...state,
        products:null,
        loading: false,
        error: action.payload.message,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        message: null,
        error: null,
      };
    default:
      return state;
  }
};

export const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case "SINGLE_PRODUCT_REQUEST":
      return {
        ...state,
        product: {},
        loading: true,
      };
    case "SINGLE_PRODUCT_SUCCESS":
      return {
        ...state,
        product: action.payload.product,
        loading: false,
      };
    case "SINGLE_PRODUCT_FAIL":
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export const submitReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case "SUBMIT_REVIEW_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "SUBMIT_REVIEW_SUCCESS":
      return {
        ...state,
        loading: false,
        review: action.payload.success,
      };
    case "CLEAR_REVIEW_STATUS":
      return {
        ...state,
        review: null,
        err: null,
      };
    case "SUBMIT_REVIEW_FAIL":
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    default:
      return state;
  }
};
