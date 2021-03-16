import {
  ADD_TO_CART,
  REQUEST_REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART_DATA
} from "../constants/cartConstants";

const initialState = { cartItems: [], shippingInfo:{} };

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const itemExist = state.cartItems.find(
        (i) => i.productId === item.productId
      );
      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.productId === itemExist.productId ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case "REQUEST_REMOVE_CART_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };
      case "SAVE_SHIPPING_INFO":
        return {
          ...state,
          shippingInfo: action.payload
        }
      case "CLEAR_CART_DATA":
        return {
          ...state,
          cartItems: null,
          shippingInfo: null
        }
    default:
      return state;
  }
};
