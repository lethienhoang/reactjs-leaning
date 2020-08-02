import React from "react";
import Products from "./components/products.component";
import Filter from "./components/filter.component";
import Cart from "./components/cart.component";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyIncart = false;

    cartItems.forEach((item) => {
      if (item._id === product._id) {
        item.count++;
        alreadyIncart = true;
      }
    });

    if (!alreadyIncart) {
      cartItems.push({ ...product, count: 1 });
    }

    // this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {
    let index = this.state.cartItems.findIndex(
      (item) => item._id === product._id
    );

    this.state.cartItems.splice(index, 1);
    // this.setState({cartItems: this.state.cartItems});
    localStorage.setItem("cartItems", JSON.stringify(this.state.cartItems));
  };

  createOrder = (order) => {
    alert(order.name);
  };

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping Cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter
                ></Filter>
                <Products
                  addToCart={this.addToCart}
                ></Products>
              </div>
              <div className="sidebar">
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                ></Cart>
              </div>
            </div>
          </main>
          <footer>All right is reserved;</footer>
        </div>
      </Provider>
    );
  }
}

export default App;
