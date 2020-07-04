import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart, removeFromCart} from "../actions/cartAction";

const CartScreen = (props) => {
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split("=")[1]) : 1;
    const dispatch = useDispatch();

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = () => {
        props.history.push("/signin?redirect=shipping");
    }
    
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, []);

    return (<div className="cart">
        <div className="cart-list">
            <ul className="cart-list-contrainer">
                <li>
                    <h3>Shopping Cart</h3>
                    <div>
                        Price:
                    </div>
                </li>
                {
                    cartItems.length === 0 ?
                    <div>
                        Cart is empty
                    </div>
                    :
                    cartItems.map((item) => 
                        <div>
                            <img src={item.image} alt="image"></img>
                            <div className="cart-name">
                                <div>
                                    {item.name}
                                </div>
                                <div>
                                    Qty:
                                    <select value={item.qty} onChange={(e) => dispatch(addToCart(item.productId, e.target.value))}>
                                        <option value="1">1</option>
                                        <option value="2">1</option>
                                        <option value="3">1</option>
                                    </select>
                                    <button type="button" className="button-remove-cart" onClick={() => removeFromCartHandler(item.productId)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div>
                                {item.price}
                            </div>
                        </div>
                    )
                }
            </ul>
        </div>
        <div className="cart-action">
                <h3>
                    Subtotal ({cartItems.reduce((a,c) => a + c.qty, 0)} items)
                    :
                    $ {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
                    
                </h3>
                <button className="button primary" disabled={cartItems.length === 0}>
                    Proceed to checkout
                </button>
        </div>
    </div>)
}

export default CartScreen;