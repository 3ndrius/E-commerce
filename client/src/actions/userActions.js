
import * as types from '../constants/userConstants'

export const requestLoginUser = (user) => ({type:types.LOGIN_REQUEST, payload: user})
export const requestLoginUserSuccess = (user) => ({type:types.LOGIN_SUCCESS, payload: user})
export const requestLoginUserFail = (error) => ({type: types.LOGIN_FAIL, payload: error})

export const requestRegisterUser = (user) => ({type: types.REGISTER_REQUEST, payload: user})
export const requestRegisterUserSuccess = (user) => ({type: types.REGISTER_SUCCESS, payload: user})
export const requestRegisterUserFail = (error) => ({type: types.REGISTER_FAIL, payload: error})

export const requestLoadUser = () => ({type: types.LOAD_USER_REQUEST})
export const requestLoadUserSuccess = (user) => ({type: types.LOAD_USER_SUCCESS, payload: user})
export const requestLoadUserFail = (error) => ({type: types.LOAD_USER_FAIL, payload: error})

export const requestLogoutUser = () => ({type: types.LOGOUT_REQUEST})
export const requestLogoutUserSuccess = () => ({type: types.LOGOUT_SUCCESS})
export const requestLogoutUserFail = (error) => ({type: types.LOGOUT_FAIL, payload: error})