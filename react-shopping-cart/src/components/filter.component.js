import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProduct, sortProduct } from "../actions/productActions";

class Filter extends Component {
  render() {
    return this.props.filteredProducts ? (
      <div>Loading....</div>
    ) : (
      <div className="filter">
        <div className="filter-result">{this.props.count} Products</div>
        <div className="filter-sort">
          Order
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.sortProduct(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProduct(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="">All</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="XS">XS</option>
            <option value="XLL">XLL</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProduct,
    sortProduct,
  }
)(Filter);
