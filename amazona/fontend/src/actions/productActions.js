import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL} from "../constants";
import axios from "axios";

const listProduct = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("http://localhost:5000/api/products");
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const detailsProduct = (productId) => async (dispatch) => {
    try {
        console.log(productId);
        dispatch({type: PRODUCT_DETAIL_REQUEST, payload: productId});
        const {data} = await axios.get("http://localhost:5000/api/products/"+productId);
        dispatch({type: PRODUCT_DETAIL_SUCCESS, payload: data});
    }
    catch(error) {
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error.message});
    }
}

export {listProduct, detailsProduct};