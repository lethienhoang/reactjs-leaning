import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import productReducer from "./reducers/productReducers";
import thunk from "redux-thunk";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    products: productReducer,
  }),

  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
