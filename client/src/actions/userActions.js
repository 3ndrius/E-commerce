
import * as types from '../constants/userConstants'

export const requestLoginUser = (user) => ({type:types.LOGIN_REQUEST, payload: user})
export const requestLoginUserSuccess = (user) => ({type:types.LOGIN_SUCCESS, payload: user})
export const requestLoginUserFail = (error) => ({type: types.LOGIN_FAIL, payload: error})

export const requestRegisterUser = (user) => ({type: types.REGISTER_REQUEST, payload: user})
export const requestRegisterUserSuccess = (user) => ({type: types.REGISTER_SUCCESS, payload: user})
export const requestRegisterUserFail = (error) => ({type: types.REGISTER_FAIL, payload: error})