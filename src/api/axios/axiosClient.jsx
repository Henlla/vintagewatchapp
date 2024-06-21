import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    withCredentials: true,
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
        if (error.response) {
            return Promise.resolve(error.response.data)
        } else if (error.request) {
            return Promise.reject({ message: "Network Error. Check connection" })
        } else {
            return Promise.reject({ message: "Unexpected error" })
        }
    }
);

export default axiosClient;
