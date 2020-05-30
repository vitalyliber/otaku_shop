import axios from "axios";
import { endpoint } from "./enpoint";

export const fetchCategories = (params = {}) => {
  return axios({
    url: `${endpoint}/shop_categories`,
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

export const fetchCategory = (params = {}) => {
  return axios({
    url: `${endpoint}/shop_categories/${params.id}`,
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
