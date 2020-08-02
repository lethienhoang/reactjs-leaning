import {
  FETCH_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  ORDER_PRODUCTS_BY_PRICE,
} from "../types";
import axios from "axios";

export const fetchProduct = () => async (dispatch) => {
  const res = await axios.get("http://localhost:5000/api/products");
  console.log(res.data);

  dispatch({
    type: FETCH_PRODUCTS,
    payload: JSON.stringify(res.data),
  });
};

export const filterProduct = (products, size) => async (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products.filter((x) => x.vailableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProduct = (filteredProducts, sort) => async (dispatch) => {
  const sortedProducts = filteredProducts.slice();

  if (sort === "") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowestprice"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }

  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
