import * as types from "../constants/cartConstants";

export const requestAddToCart = (productId, quantity) => ({
  type: types.REQUEST_ADD_TO_CART,
  payload: { productId, quantity },
});
export const addToCart = (product) => ({
  type: types.ADD_TO_CART,
  payload: product,
});

export const requestRemoveFromCart = (productId) => ({
  type: types.REQUEST_REMOVE_CART_ITEM,
  payload: productId,
});
export const removeFromCart = (productId) => ({
  type: types.REMOVE_CART_ITEM,
  payload: productId,
});

export const saveShippingInfo = (customer) => ({
  type: types.SAVE_SHIPPING_INFO,
  payload: customer,
});
export const requestSaveShippingInfo = (customer) => ({
  type: types.REQUEST_SAVE_SHIPPING_INFO,
  payload: customer,
});

