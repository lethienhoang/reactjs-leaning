import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/zoom";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
    };
  }

  openModal = (product) => {
    this.setState({ product });
  };

  closeModal = () => {
    this.setState({ product: null });
  };

  render() {
    return (
      <div>
        <Fade button cascade={true}>
          <ul className="products">
            {this.props.products.map((item) => (
              <li key={item._id}>
                <div className="product">
                  <a
                    href={"#" + item._id}
                    onClick={() => this.openModal(product)}
                  >
                    <img src={item.image} alt={item.title}></img>
                    <p>{item.title}</p>
                  </a>
                  <div className="product-price">
                    <div>{formatCurrency(item.price)}</div>
                    <button
                      onClick={() => this.props.addToCart(item)}
                      className="button primary"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Fade>
        {this.state.product && (
          <Modal>
            <Zoom isOpen={true}>
              <button className="modal-close" onClick={() => this.closeModal}>
                x
              </button>
              <div className="modal-detail">
                <image src={product.image} alt={product.title}></image>
                <div className="product-detail-description">
                  <p>
                    <strong>{product.title}</strong>
                  </p>
                  <p>{product.description}</p>
                  <p>
                    Avaiable Sizes
                    {product.avaiableSizes.map((x) => (
                      <span>
                        {""} <button className="button">{x}</button>
                      </span>
                    ))}
                  </p>
                  <div className="product-price">
                    <div>{formatCurrency(product.price)}</div>
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}

export default Products;
