import { takeEvery, takeLatest, call, put, delay } from "redux-saga/effects";
import apiCall from "../helpers/apiCall";
import {
  requestAllProductSuccess,
  requestAllProductFail,
  requestAllProduct,
  requestSingleProductSuccess,
  requestSingleProductFail,
  submitReviewSuccess,
  submitReviewFail
} from "../actions/productActions";
import { ALL_PRODUCT_REQUEST, SINGLE_PRODUCT_REQUEST, SUBMIT_REVIEW_REQUEST } from "../constants/productConstants";

function* getProducts(action) {
  try {
    yield delay(1000)
    let link = `products/?keyword=${action.payload.keyword}&page=${action.payload.product}&price[gte]=${action.payload.price[0]}&price[lte]=${action.payload.price[1]}&ratings[gte]=${action.payload.rating}`;
    if(action.payload.category) {
    link = `products/?keyword=${action.payload.keyword}&page=${action.payload.product}&price[gte]=${action.payload.price[0]}&price[lte]=${action.payload.price[1]}&category=${action.payload.category}&ratings[gte]=${action.payload.rating}`
    }
    const { data } = yield call(apiCall.get, link);
    yield put(requestAllProductSuccess(data));
  } catch (error) {
    yield put(requestAllProductFail(error));
  }
}

export function* getProductsSaga() {
  yield takeLatest("ALL_PRODUCT_REQUEST", getProducts);
}

 // single product 
function* getProduct(action) {
  try {
    const { data } = yield call(apiCall.get, `products/${action.payload}`);
    yield put(requestSingleProductSuccess(data));
  } catch (error) {
    yield put(requestSingleProductFail(error));
  }
}

export function* getProductSaga() {
    yield takeEvery("SINGLE_PRODUCT_REQUEST", getProduct)
}

function* submitReview(action) {
  const config = { headers: { "Content-Type": "application/json" }}

  try {
    const { data } = yield call(apiCall.put, `reviews`, action.payload, config);
    yield put(submitReviewSuccess(data));

  } catch (error) {
    yield put(submitReviewFail(error.response.data.message));
  }
}

export function* submitReviewSaga() {
    yield takeEvery("SUBMIT_REVIEW_REQUEST", submitReview)
}

