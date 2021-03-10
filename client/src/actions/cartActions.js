import * as types from '../constants/cartConstants'

export const requestAddToCart = (productId, quantity) => ({type: types.REQUEST_ADD_TO_CART, payload:{productId, quantity}})
export const addToCart = (product) => ({type: types.ADD_TO_CART, payload:product})