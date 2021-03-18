//import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS } from '../constants/productConstants'
// action creator
import * as types from '../constants/productConstants'

export const requestAllProduct = (product, keyword, price, category, rating) => ({ type: types.ALL_PRODUCT_REQUEST, payload: {product, keyword, price, category, rating}})
export const requestAllProductSuccess = products => ({type: types.ALL_PRODUCT_SUCCESS, payload: products})
export const requestAllProductFail = error => ({type: types.ALL_PRODUCT_FAIL, payload: error})

export const requestSingleProduct = id => ({type: types.SINGLE_PRODUCT_REQUEST, payload: id})
export const requestSingleProductSuccess = product => ({type: types.SINGLE_PRODUCT_SUCCESS, payload: product}) 
export const requestSingleProductFail = error => ({type: types.SINGLE_PRODUCT_FAIL, payload: error})

export const submitReviewRequest = reviews => ({type: types.SUBMIT_REVIEW_REQUEST, payload: reviews})
export const submitReviewSuccess = success => ({type: types.SUBMIT_REVIEW_SUCCESS, payload: success})
export const submitReviewFail = error => ({type: types.SUBMIT_REVIEW_FAIL, payload: error})

export const adminAllProductsRequest = () => ({type: types.ADMIN_ALL_PRODUCTS_REQUEST});
export const adminAllProductsSuccess = (products) => ({type: types.ADMIN_ALL_PRODUCTS_SUCCESS, payload: products})
export const adminAllProductsFail = error => ({type: types.ADMIN_ALL_PRODUCTS_FAIL, payload: error})

export const deleteProductRequest = productId => ({type: types.DELETE_PRODUCT_REQUEST, payload: productId})
export const deleteProductSuccess = (message, id) => ({type: types.DELETE_PRODUCT_SUCCESS, payload: {message, id}})
export const deleteProductFail = error => ({type: types.DELETE_PRODUCT_FAIL, payload: error})

export const clearReviewStatus = () => ({type: types.CLEAR_REVIEW_STATUS})
export const clearErrors = () => ({type: types.CLEAR_ERROR})

