// store
import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
// imports
const reducer = combineReducers({});
const sagaMiddleware = createSagaMiddleware();
const initState = {};
const composedEnhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))
// import saga from "./sagas";

const store = createStore(
  reducer,
  initState,
  composedEnhancer
);

// sagaMiddleware.run(saga); //saga

export default store;
