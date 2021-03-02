import { takeEvery, call, put, delay } from 'redux-saga/effects'
import apiCall from '../helpers/apiCall'
import { requestAllProductSuccess, requestAllProductFail, requestAllProduct } from '../actions/productActions'
import { ALL_PRODUCT_REQUEST } from '../constants/productConstants'

function* getProducts() {
    try {
        const { data } = yield call(apiCall.get, 'products')
        yield delay(1000)
        yield put(requestAllProductSuccess(data))
        
    } catch (error) {
        yield put(requestAllProductFail(error))
    }
}

export function* getProductsSaga() {
    yield takeEvery("ALL_PRODUCT_REQUEST", getProducts )
}