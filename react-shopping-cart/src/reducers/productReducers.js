import { FETCH_PRODUCTS } from "../../types.js";

const productReducer = (state = {}, action) => {
    switch(action.type) {
        case FETCH_PRODUCTS :
            return { items: action.payload}
        default:
            return state;
    }
}

export default productReducer;