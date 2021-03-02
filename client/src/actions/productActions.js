//import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS } from '../constants/productConstants'
// action creator
import * as types from '../constants/productConstants'

export const requestAllProduct = () => ({ type: types.ALL_PRODUCT_REQUEST})
export const requestAllProductSuccess = products => ({type: types.ALL_PRODUCT_SUCCESS, payload: products})
export const requestAllProductFail = error => ({type: types.ALL_PRODUCT_FAIL, payload: error})



