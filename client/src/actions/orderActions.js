
import * as types from '../constants/orderConstants';

export const orderCreateRequest = (order) => ({ type: types.CREATE_ORDER_REQUEST, payload: order})
export const orderCreateSuccess = (order) => ({ type: types.CREATE_ORDER_SUCCESS, payload: order})
export const orderCreateFail = (error) => ({ type: types.CREATE_ORDER_FAIL, payload: error})

export const clearErrors = () => ({ type: types.CLEAR_ERROR})
