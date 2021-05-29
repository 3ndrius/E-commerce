import { takeEvery, put, call } from "redux-saga/effects";
import apiCall from "../helpers/apiCall";
import {
  orderCreateSuccess,
  orderCreateFail,
  showOrderSuccess,
  showOrderFail,
  singleOrderSuccess,
  singleOrderFail,
} from "../actions/orderActions";

import {
  CREATE_ORDER_REQUEST,
  SHOW_ORDER_REQUEST,
  SINGLE_ORDER_REQUEST,
} from "../constants/orderConstants";

function* createOrder(action) {
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = yield call(apiCall.post, "orders", action.payload, config);
    yield put(orderCreateSuccess(res));
  } catch (error) {
    yield put(orderCreateFail(error.response.data.message));
  }
}

export function* createOrderSaga() {
  yield takeEvery(CREATE_ORDER_REQUEST, createOrder);
}

function* showOrder() {
  try {
    const res = yield call(apiCall.get, "orders");
    yield put(showOrderSuccess(res));
  } catch (error) {
    yield put(showOrderFail(error.response.data.message));
  }
}

export function* showOrderSaga() {
  yield takeEvery(SHOW_ORDER_REQUEST, showOrder);
}

function* singleOrder(action) {
  try {
    const res = yield call(apiCall.get, `order/${action.payload}`);
    yield put(singleOrderSuccess(res));
  } catch (error) {
    yield put(singleOrderFail(error.response.data.message));
  }
}

export function* singleOrderSaga() {
  yield takeEvery(SINGLE_ORDER_REQUEST, singleOrder);
}
