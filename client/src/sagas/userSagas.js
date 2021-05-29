import { takeEvery, put, call } from "redux-saga/effects";

import {
  requestLoginUserSuccess,
  requestLoginUserFail,
  requestRegisterUserFail,
  requestRegisterUserSuccess,
  requestLoadUserFail,
  requestLoadUserSuccess,
  requestLogoutUserFail,
  requestLogoutUserSuccess,
  requestUpdateUserProfileSuccess,
  requestUpdateUserProfileFail,
  requestUpdateUserPasswordSuccess,
  requestUpdateUserPasswordFail,
  requestPasswordForgotSuccess,
  requestPasswordForgotFail,
  requestPasswordResetSuccess,
  requestPasswordResetFail,
} from "../actions/userActions";
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOAD_USER_REQUEST,
  LOGOUT_REQUEST,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PASSWORD,
  PASSWORD_FORGOT,
  PASSWORD_RESET,
} from "../constants/userConstants";

import apiCall from "../helpers/apiCall";

function* loginUser(action) {
  const body = {
    email: action.payload.email,
    password: action.payload.password,
  };
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = yield call(apiCall.post, "login", body, config);
    yield put(requestLoginUserSuccess(res));
  } catch (error) {
    yield put(requestLoginUserFail(error.response.data.message));
  }
}
export function* loginUserSaga() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

function* registerUser(action) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  try {
    const res = yield call(apiCall.post, "register", action.payload, config);
    yield put(requestRegisterUserSuccess(res));
  } catch (error) {
    yield put(requestRegisterUserFail(error?.response?.data?.message));
  }
}

export function* registerUserSaga() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

function* loadUser() {
  try {
    const res = yield call(apiCall.get, "me");
    yield put(requestLoadUserSuccess(res));
  } catch (error) {
    yield put(requestLoadUserFail(error?.response?.data?.message));
  }
}

export function* loadUserSaga() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

function* logoutUser() {
  try {
    yield call(apiCall.get, "logout");
    yield put(requestLogoutUserSuccess());
  } catch (error) {
    yield put(requestLogoutUserFail(error.response.data.message));
  }
}
export function* logoutUserSaga() {
  yield takeEvery(LOGOUT_REQUEST, logoutUser);
}

function* updateUser(action) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  try {
    const res = yield call(apiCall.put, "me/update", action.payload, config);
    yield put(requestUpdateUserProfileSuccess(res));
  } catch (error) {
    yield put(requestUpdateUserProfileFail(error.response.data.message));
  }
}
export function* updateUserSaga() {
  yield takeEvery(UPDATE_USER_PROFILE, updateUser);
}

function* updatePassword(action) {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = {
    oldPassword: action.payload.oldPassword,
    password: action.payload.password,
  };
  try {
    const res = yield call(apiCall.put, "password/update", body, config);
    yield put(requestUpdateUserPasswordSuccess(res));
  } catch (error) {
    yield put(requestUpdateUserPasswordFail(error.response.data.message));
  }
}
export function* updatePasswordSaga() {
  yield takeEvery(UPDATE_USER_PASSWORD, updatePassword);
}

function* passwordForgot(action) {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = {
    email: action.payload,
  };
  try {
    const res = yield call(apiCall.post, "password/forgot", body, config);
    yield put(requestPasswordForgotSuccess(res));
  } catch (error) {
    yield put(requestPasswordForgotFail(error.response.data.message));
  }
}
export function* passwordForgotSaga() {
  yield takeEvery(PASSWORD_FORGOT, passwordForgot);
}

function* passwordReset(action) {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = {
    password: action.payload.password,
    confirmPassword: action.payload.confirmPassword,
  };
  try {
    const res = yield call(
      apiCall.put,
      `password/reset/${action.payload.token}`,
      body,
      config
    );
    yield put(requestPasswordResetSuccess(res));
  } catch (error) {
    yield put(requestPasswordResetFail(error.response.data.message));
  }
}
export function* passwordResetSaga() {
  yield takeEvery(PASSWORD_RESET, passwordReset);
}
