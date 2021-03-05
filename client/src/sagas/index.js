

import { all, fork } from 'redux-saga/effects'

import * as productSagas from './productSagas';
import * as userSagas from './userSagas';

export default function* rootSaga() {
    yield all([
        ...Object.values(productSagas),
        ...Object.values(userSagas)
    ].map(fork)
    )
}