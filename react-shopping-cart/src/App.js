import React from "react";
import data from "./data.json";
import Products from "./components/products.component";
import Filter from "./components/filter.component";
import Cart from "./components/cart.component";
import store from "./store";
import { Provider } from "react-redux";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
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

  sortProducts = (event) => {
    const sort = event.tart.value;

    this.setState((state) => ({
      sort: event.target.value,
      products: this.state.products
        .slice()
        .sortProducts((item, item1) =>
          sort === "lowest"
            ? item.price < item1.price
              ? 1
              : -1
            : sort === "highest"
            ? item.price > item1.price
              ? 1
              : -1
            : item._id > item1._id
            ? 1
            : -1
        ),
    }));
  };

  filterProducts = (event) => {
    if (event.target.value === "") {
      this.setState({ size: event.tart.value, products: data.products });
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      });
    }
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
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                ></Filter>
                <Products
                  products={this.state.products}
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
