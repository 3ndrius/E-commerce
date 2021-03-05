import { takeEvery, put, call } from "redux-saga/effects";

import {
  requestLoginUserSuccess,
  requestLoginUser,
  requestLoginUserFail,
} from "../actions/userActions";
import { LOGIN_REQUEST } from "../constants/userConstants";
import apiCall from "../helpers/apiCall";

function* loginUser(action) {
  try {
    const body ={
        "email": action.payload.email,
        "password": action.payload.password
    }
    const config = { headers: { "Content-Type": "application/json" } };
    const res = yield call(apiCall.post, "login", body, config);
    yield put(requestLoginUserSuccess(res));
    
  } catch (error) {
    yield put(requestLoginUserFail(error));
  }
}
export function* loginUserSaga() {
    yield takeEvery("LOGIN_REQUEST", loginUser)
}