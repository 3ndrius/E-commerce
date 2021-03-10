import { ADD_TO_CART } from "../constants/cartConstants";

const initialState = { cartItems: [1] };

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

    default:
      return state;
  }
};
