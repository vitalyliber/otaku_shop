import axios from "axios";
import { endpoint } from "./enpoint";

export const fetchProducts = (params = {}) => {
  return axios({
    url: `${endpoint}/shop_products`,
    headers: {
      "Content-type": "application/json",
    },
    params: {
      ...params,
    },
    method: "GET",
    data: null,
  }).then(({ data }) => {
    return data;
  });
};

export const fetchProduct = (params = {}) => {
  return axios({
    url: `${endpoint}/shop_products/${params.id}`,
    headers: {
      "Content-type": "application/json",
    },
    params: {
      ...params,
    },
    method: "GET",
    data: null,
  }).then(({ data }) => {
    return data;
  });
};
