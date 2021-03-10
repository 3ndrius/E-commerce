
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

export const requestUpdateUserProfile = (user) => ({type: types.UPDATE_USER_PROFILE, payload: user});
export const requestUpdateUserProfileSuccess = (success) => ({type: types.UPDATE_USER_PROFILE_SUCCESS, payload: success})
export const requestUpdateUserProfileReset = () => ({type: types.UPDATE_USER_PROFILE_RESET})
export const requestUpdateUserProfileFail = (error) => ({type: types.UPDATE_USER_PROFILE_FAIL, payload: error})

export const requestUpdateUserPassword = (user) => ({type: types.UPDATE_USER_PASSWORD, payload: user});
export const requestUpdateUserPasswordSuccess = (success) => ({type: types.UPDATE_USER_PASSWORD_SUCCESS, payload: success})
export const requestUpdateUserPasswordReset = () => ({type: types.UPDATE_USER_PASSWORD_RESET})
export const requestUpdateUserPasswordFail = (error) => ({type: types.UPDATE_USER_PASSWORD_FAIL, payload: error})

export const requestPasswordForgot = (email) => ({type: types.PASSWORD_FORGOT, payload: email})
export const requestPasswordForgotSuccess = (message) => ({type: types.PASSWORD_FORGOT_SUCCESS, payload: message})
export const requestPasswordForgotFail = (error) => ({type: types.PASSWORD_FORGOT_FAIL, payload: error})

export const requestPasswordReset = (user) => ({type: types.PASSWORD_RESET, payload:user})
export const requestPasswordResetSuccess = (message) => ({type: types.PASSWORD_RESET_SUCCESS, payload: message})
export const requestPasswordResetFail = (error) => ({type: types.PASSWORD_RESET_FAIL, payload: error})


export const clearErrors = () => ({type: types.CLEAR_ERROR})