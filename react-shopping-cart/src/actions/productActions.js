import { FETCH_PRODUCTS } from "../../types.js";

export const fetchActions = () => async (dispatch) => {
    const res = await fetch("/api/products");
    const data = res.json();

    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
}