import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants";

const cartReducer = (state={cartItems: []}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.productId === item.productId);
            
            if (product) {
                return { cartItems: state.cartItems.map(x => x.productId === product.productId ? product : x)};
            }

            return { cartItems: [...state.cartItems, item]};
        case CART_REMOVE_ITEM:
            const productId = action.payload;

            return {cartItems: state.cartItems.filter(x => x.productId !== productId)}
        default:
            return state;
    }
}

export {cartReducer};