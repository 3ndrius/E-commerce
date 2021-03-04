//import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS } from '../constants/productConstants'
// action creator
import * as types from '../constants/productConstants'

export const requestAllProduct = (product, keyword, price, category) => ({ type: types.ALL_PRODUCT_REQUEST, payload: {product, keyword, price, category}})
export const requestAllProductSuccess = products => ({type: types.ALL_PRODUCT_SUCCESS, payload: products})
export const requestAllProductFail = error => ({type: types.ALL_PRODUCT_FAIL, payload: error})

export const requestSingleProduct = id => ({type: types.SINGLE_PRODUCT_REQUEST, payload: id})
export const requestSingleProductSuccess = product => ({type: types.SINGLE_PRODUCT_SUCCESS, payload: product}) 
export const requestSingleProductFail = error => ({type: types.SINGLE_PRODUCT_FAIL, payload: error})


