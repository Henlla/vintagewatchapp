import axiosClient from "./axiosClient"

class AuthAPI {
    login = (params) => {
        const url = "signin"
        return axiosClient.post(url, { params });
    };
}
const authApi = new AuthAPI();
export default authApi;