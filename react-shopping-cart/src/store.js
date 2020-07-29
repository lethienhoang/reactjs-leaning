import { createStore, applyMiddleware, compose, combineReducers } from "react-redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productReducers";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    products: productReducer,
  }),

  initialState,
  composeEnhancer(applyMiddleware)
);

export default store;
