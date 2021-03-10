
import { put, call, takeEvery } from 'redux-saga/effects'
import { REQUEST_ADD_TO_CART } from '../constants/cartConstants'
import store from '../store';
import { addToCart } from '../actions/cartActions'
import apiCall from '../helpers/apiCall'

function* addItemToCart(action) {
    try {
        const {data} = yield call(apiCall.get,`products/${action.payload.productId}`)
        const payload = {
            productId: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity: action.payload.quantity
        }
        yield put(addToCart(payload))
        localStorage.setItem('cartItems', JSON.stringify(store.getState().cart.cartItems))
    } catch (error) {
        console.log(error);
    }
}
export function* addItemCartSaga() {
    yield takeEvery("REQUEST_ADD_TO_CART", addItemToCart)
}