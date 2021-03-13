import { takeEvery, put, call } from "redux-saga/effects";
import apiCall from "../helpers/apiCall";
import { orderCreateSuccess, orderCreateFail } from "../actions/orderActions";
import { CREATE_ORDER_REQUEST } from "../constants/orderConstants";

function* createOrder(action) {
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    const res = yield call(apiCall.post, "orders",action.payload, config);
    yield put(orderCreateSuccess(res));
  } catch (error) {
    yield put(orderCreateFail(error.response.data.message));
  }
}

export function* createOrderSaga() {
  yield takeEvery("CREATE_ORDER_REQUEST", createOrder);
}
