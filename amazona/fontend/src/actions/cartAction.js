import {CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM} from "../constants";
import axios from "axios";

const addToCart = (productId, qty) => async (dispatch) => {
    try {
        const {data} = await axios.get("/api/products/" + productId);
        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                productId: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });
    }
    catch(error) {
        dispatch({type: CART_ADD_ITEM_FAIL, payload: error.message});
    }
}

const removeFromCart = (productId) => async (dispatch) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: productId
    });
}

export {addToCart, removeFromCart};