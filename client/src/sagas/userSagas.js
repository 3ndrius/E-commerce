import { takeEvery, put, call } from "redux-saga/effects";

import {
  requestLoginUserSuccess,
  requestLoginUserFail,
  requestRegisterUserFail,
  requestRegisterUserSuccess,
  requestLoadUserFail,
  requetLoadUserSuccess,
} from "../actions/userActions";
import {
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOAD_USER_REQUEST,
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
    yield put(requestLoginUserFail(error));
  }
}
export function* loginUserSaga() {
  yield takeEvery("LOGIN_REQUEST", loginUser);
}

function* registerUser(action) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  try {
    const res = yield call(apiCall.post, "register", action.payload, config);
    yield put(requestRegisterUserSuccess(res));
  } catch (error) {
    yield put(requestRegisterUserFail(error));
  }
}

export function* registerUserSaga() {
  yield takeEvery("REGISTER_REQUEST", registerUser);
}

function* loadUser() {
  try {
    const res = yield call(apiCall.get, "me");
    yield put(requestLoginUserSuccess(res));
  } catch (error) {
    yield put(requestLoadUserFail(error));
  }
}

export function* loadUserSaga() {
  yield takeEvery("LOAD_USER_REQUEST", loadUser);
}
