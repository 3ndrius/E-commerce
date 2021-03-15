
import * as types from '../constants/orderConstants';

export const orderCreateRequest = (order) => ({ type: types.CREATE_ORDER_REQUEST, payload: order})
export const orderCreateSuccess = (order) => ({ type: types.CREATE_ORDER_SUCCESS, payload: order})
export const orderCreateFail = (error) => ({ type: types.CREATE_ORDER_FAIL, payload: error})

export const showOrderRequest = () => ({type: types.SHOW_ORDER_REQUEST})
export const showOrderSuccess = (order) => ({type: types.SHOW_ORDER_SUCCESS, payload:order})
export const showOrderFail = (error) => ({type: types.SHOW_ORDER_FAIL, payload: error})

export const singleOrderRequest = (id) => ({ type: types.SINGLE_ORDER_REQUEST, payload:id})
export const singleOrderSuccess = (order) => ({ type: types.SINGLE_ORDER_SUCCESS, payload:order})
export const singleOrderFail = (error) => ({ type: types.SINGLE_ORDER_FAIL, payload:error})

export const clearErrors = () => ({ type: types.CLEAR_ERROR})
