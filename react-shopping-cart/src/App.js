import React from "react";
import data from "./data.json";
import Products from "./components/products.component";
import Filter from "./components/filter.component";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

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
                sort={this.size.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products products={this.state.products}></Products>
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All right is reserved;</footer>
      </div>
    );
  }
}

export default App;
