import axiosClient from "../axios/axiosClient";

interface APIResponse {
    isSuccess: boolean;
    message: string;
    data: any;
}

class AuthAPI {
    login = (params) => {
        var url = "auth/signin";
        return axiosClient.post(url, params) as Promise<APIResponse>;
    }

    register = (params) => {
        var url = "auth/signup"
        return axiosClient.post(url, params) as Promise<APIResponse>;
    }

    logout = () => {
        var url = "auth/logout"
        return axiosClient.post(url) as Promise<APIResponse>
    }
}

const authAPI = new AuthAPI();
export default authAPI;