// store
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
// imports
import rootSaga from "./sagas";
import { singleProductReducer, productReducer } from './reducers/productReducers'

const reducer = combineReducers({
  products: productReducer,
  product: singleProductReducer,
});

const sagaMiddleware = createSagaMiddleware();
const initState = {};
const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))

const store = createStore(
  reducer,
  initState,
  composedEnhancer
);

sagaMiddleware.run(rootSaga); //saga

export default store;
