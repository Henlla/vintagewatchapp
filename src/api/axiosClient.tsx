import axios from "axios";
import queryString from "query-string";

import.meta.env.VITE_REACT_APP_CLIENT_ID

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_CLIENT_ID,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return error.response;
  }
);

export default axiosClient;
