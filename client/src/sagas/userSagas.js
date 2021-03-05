import { takeEvery, put, call } from "redux-saga/effects";

import {
  requestLoginUserSuccess,
  requestLoginUserFail,
  requestRegisterUserFail,
  requestRegisterUserSuccess,
} from "../actions/userActions";
import { LOGIN_REQUEST, REGISTER_REQUEST } from "../constants/userConstants";
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
  const body = {
    "name": action.payload.name,
    "email": action.payload.email,
    "password": action.payload.password
  };
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  try {
    const res = yield call(apiCall.post, "register", body, config);
    yield put(requestRegisterUserSuccess(res));
  } catch (error) {
    yield put(requestRegisterUserFail(error));
  }
}

export function* registerUserSaga() {
    takeEvery("REGISTER_REQUEST", registerUser)
}
