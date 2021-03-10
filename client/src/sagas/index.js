

import { all, fork } from 'redux-saga/effects'

import * as productSagas from './productSagas';
import * as userSagas from './userSagas';
import * as cartSagas from './cartSagas';

export default function* rootSaga() {
    yield all([
        ...Object.values(productSagas),
        ...Object.values(userSagas),
        ...Object.values(cartSagas)
    ].map(fork)
    )
}