import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERROR,
  SHOW_ORDER_REQUEST,
  SHOW_ORDER_FAIL,
  SHOW_ORDER_SUCCESS,
  SINGLE_ORDER_FAIL,
  SINGLE_ORDER_REQUEST,
  SINGLE_ORDER_SUCCESS,
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "CREATE_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload.data.order,
      };
    case "CREATE_ORDER_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        order: null,
        error: null,
      };
    default:
      return state;
  }
};

export const myOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "SHOW_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "SHOW_ORDER_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.payload.data.orders,
        count: action.payload.data.count,
      };
    case "SHOW_ORDER_FAIL":
      return {
        ...state,
        loading: false,
        orders: null,
        error: action.payload,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "SINGLE_ORDER_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "SINGLE_ORDER_SUCCESS":
      return {
        ...state,
        order: action.payload.data.order,
        loading: false,
      };

    case "SINGLE_ORDER_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
